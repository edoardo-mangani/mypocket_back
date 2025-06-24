import { ApiResponse } from '#contracts/api_response_contract'

export class ApiResponseBuilder {
  static success(data: any, statusCode: number = 200): ApiResponse {
    return {
      success: true,
      message: statusCode === 201 ? 'Creato con successo' : 'Operazione completata con successo',
      data,
      meta: undefined,
    }
  }

  static error(
    message: string,
    errors?: Record<string, string[]>,
    errorCode?: string
  ): ApiResponse {
    return {
      success: false,
      message,
      data: null,
      errors,
      error_code: errorCode,
      meta: undefined,
    }
  }

  static isAlreadyStandardized(body: any): boolean {
    return typeof body === 'object' && body.success !== undefined
  }
}
