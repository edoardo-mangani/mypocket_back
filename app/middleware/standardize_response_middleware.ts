import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '#contracts/api_response_contract'

export default class StandardizeResponseMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      // Procedi con la richiesta
      await next()

      // Se arriviamo qui, la richiesta è andata a buon fine
      // Intercettiamo il body della response se esiste
      const originalBody = ctx.response.hasLazyBody ? await ctx.response.getBody() : undefined

      // Se non c'è body o è già in formato standard, non fare nulla
      if (!originalBody || this.isAlreadyStandardized(originalBody)) {
        return
      }

      // Standardizza la response di successo
      const standardResponse: ApiSuccessResponse = {
        data: originalBody,
        error: false,
        error_code: null,
        error_message: null,
        exception: null,
      }

      ctx.response.safeStatus(ctx.response.getStatus() || 200).json(standardResponse)
    } catch (error) {
      // Gestisci gli errori in modo standardizzato
      const statusCode = this.getErrorStatusCode(error)
      const errorCode = this.getErrorCode(error, statusCode)
      const errorMessage = this.getErrorMessage(error)
      const exception = error.name || 'UnknownError'

      const errorResponse: ApiErrorResponse = {
        data: null,
        error: true,
        error_code: errorCode,
        error_message: errorMessage,
        exception: exception,
      }

      ctx.response.safeStatus(statusCode).json(errorResponse)
    }
  }

  private isAlreadyStandardized(body: any): boolean {
    return (
      typeof body === 'object' &&
      body !== null &&
      'data' in body &&
      'error' in body &&
      'error_code' in body &&
      'error_message' in body &&
      'exception' in body
    )
  }

  private getErrorStatusCode(error: any): number {
    if (error.status) return error.status
    if (error.code === 'E_VALIDATION_ERROR') return 422
    if (error.code === 'E_INVALID_AUTH_UID') return 401
    if (error.code === 'E_INVALID_AUTH_PASSWORD') return 401
    if (error.code === 'E_UNAUTHORIZED_ACCESS') return 401
    if (error.code === 'E_ROW_NOT_FOUND') return 404
    return 500
  }

  private getErrorCode(error: any, statusCode: number): string {
    if (error.code) return error.code

    switch (statusCode) {
      case 400:
        return 'BAD_REQUEST'
      case 401:
        return 'UNAUTHORIZED'
      case 403:
        return 'FORBIDDEN'
      case 404:
        return 'NOT_FOUND'
      case 422:
        return 'VALIDATION_ERROR'
      case 500:
        return 'INTERNAL_SERVER_ERROR'
      default:
        return 'UNKNOWN_ERROR'
    }
  }

  private getErrorMessage(error: any): string {
    if (error.messages && Array.isArray(error.messages)) {
      return error.messages.map((msg: any) => msg.message || msg).join(', ')
    }
    if (error.message) return error.message
    return 'Si è verificato un errore'
  }
}
