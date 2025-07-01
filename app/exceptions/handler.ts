import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { ErrorHandler } from '#utils/error_handler'
import { ApiResponseBuilder } from '#utils/api_response_builder'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    // Gestisce le nostre eccezioni custom
    if (error instanceof Error && (error as any).code) {
      const statusCode = ErrorHandler.getStatusFromError(error)
      const errorResponse = ApiResponseBuilder.error(
        ErrorHandler.getMessageFromError(error),
        ErrorHandler.getErrorsFromError(error),
        ErrorHandler.getErrorCodeFromError(error)
      )

      return ctx.response.status(statusCode).json(errorResponse)
    }

    // Fallback al handler di default per altri errori
    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
