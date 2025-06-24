import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { ApiResponse } from '#contracts/api_response_contract'

export default class StandardizeResponseMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      await next()

      const originalBody = ctx.response.hasLazyBody ? await ctx.response.getBody() : undefined

      if (!originalBody || this.isAlreadyStandardized(originalBody)) return

      const response: ApiResponse = {
        success: true,
        message:
          ctx.response.getStatus() === 201
            ? 'Creato con successo'
            : 'Operazione completata con successo',
        data: originalBody,
        meta: undefined,
      }

      ctx.response.safeStatus(ctx.response.getStatus() || 200).json(response)
    } catch (error) {
      const statusCode = this.getStatus(error)
      const response: ApiResponse = {
        success: false,
        message: this.getMessage(error),
        data: null,
        errors: this.getErrors(error),
        error_code: this.getErrorCode(error),
        meta: undefined,
      }

      ctx.response.safeStatus(statusCode).json(response)
    }
  }

  private isAlreadyStandardized(body: any): boolean {
    return typeof body === 'object' && body.success !== undefined
  }

  private getStatus(error: any): number {
    if (error.status) return error.status
    if (error.code === 'E_VALIDATION_ERROR') return 422
    if (error.code === 'E_ROW_NOT_FOUND') return 404
    if (error.code === 'E_UNAUTHORIZED_ACCESS') return 401
    return 500
  }

  private getMessage(error: any): string {
    if (error.messages && error.messages[0]?.message) {
      return error.messages[0].message
    }

    if (error.message) return error.message

    return 'Si è verificato un errore imprevisto'
  }

  private getErrors(error: any): Record<string, string[]> | undefined {
    if (error.messages && error.messages.errors) {
      const formatted: Record<string, string[]> = {}
      for (const err of error.messages.errors) {
        if (!formatted[err.field]) formatted[err.field] = []
        formatted[err.field].push(err.message)
      }
      return formatted
    }
    return undefined
  }

  private getErrorCode(error: any): string {
    if (error.code) return error.code
    switch (this.getStatus(error)) {
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
}
