export class ErrorHandler {
  private static readonly ERROR_MESSAGES = {
    400: 'Richiesta non valida',
    401: 'Non autorizzato',
    403: 'Accesso negato',
    404: 'Risorsa non trovata',
    422: 'Errore di validazione',
    500: 'Errore interno del server',
  } as const

  private static readonly ERROR_CODES = {
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    422: 'VALIDATION_ERROR',
    500: 'INTERNAL_SERVER_ERROR',
  } as const

  static getStatusFromError(error: any): number {
    if (error.status) return error.status
    if (error.code === 'E_VALIDATION_ERROR') return 422
    if (error.code === 'E_ROW_NOT_FOUND') return 404
    if (error.code === 'E_UNAUTHORIZED_ACCESS') return 401
    return 500
  }

  static getMessageFromError(error: any): string {
    if (error.messages && error.messages[0]?.message) {
      return error.messages[0].message
    }

    if (error.message) return error.message

    return 'Si è verificato un errore imprevisto'
  }

  static getMessageFromStatus(statusCode: number): string {
    return (
      this.ERROR_MESSAGES[statusCode as keyof typeof this.ERROR_MESSAGES] ||
      'Si è verificato un errore'
    )
  }

  static getErrorCodeFromStatus(statusCode: number): string {
    return this.ERROR_CODES[statusCode as keyof typeof this.ERROR_CODES] || 'UNKNOWN_ERROR'
  }

  static getErrorCodeFromError(error: any): string {
    if (error.code) return error.code
    return this.getErrorCodeFromStatus(this.getStatusFromError(error))
  }

  static getErrorsFromError(error: any): Record<string, string[]> | undefined {
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

  static extractErrorsFromBody(body: any): Record<string, string[]> | undefined {
    return typeof body === 'object' && body.errors ? body.errors : undefined
  }
}
