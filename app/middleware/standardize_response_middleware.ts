import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { ApiResponseBuilder } from '#utils/api_response_builder'
import { ErrorHandler } from '#utils/error_handler'

export default class StandardizeResponseMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      await next()
      this.handleSuccessResponse(ctx)
    } catch (error) {
      this.handleErrorResponse(ctx, error)
    }
  }

  private handleSuccessResponse(ctx: HttpContext): void {
    const originalBody = ctx.response.hasLazyBody ? ctx.response.getBody() : undefined
    const statusCode = ctx.response.getStatus()

    // Ignora se non c'è body o è già standardizzato
    if (!originalBody || ApiResponseBuilder.isAlreadyStandardized(originalBody)) {
      return
    }

    // Gestisce gli errori che non hanno lanciato eccezioni
    if (statusCode >= 400) {
      const errorResponse = ApiResponseBuilder.error(
        ErrorHandler.getMessageFromStatus(statusCode),
        ErrorHandler.extractErrorsFromBody(originalBody),
        ErrorHandler.getErrorCodeFromStatus(statusCode)
      )

      ctx.response.safeStatus(statusCode).json(errorResponse)
      return
    }

    // Gestisce le risposte di successo
    const successResponse = ApiResponseBuilder.success(originalBody, statusCode)
    ctx.response.safeStatus(statusCode || 200).json(successResponse)
  }

  private handleErrorResponse(ctx: HttpContext, error: any): void {
    const statusCode = ErrorHandler.getStatusFromError(error)

    const errorResponse = ApiResponseBuilder.error(
      ErrorHandler.getMessageFromError(error),
      ErrorHandler.getErrorsFromError(error),
      ErrorHandler.getErrorCodeFromError(error)
    )

    ctx.response.safeStatus(statusCode).json(errorResponse)
  }
}
