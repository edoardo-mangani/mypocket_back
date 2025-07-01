import { Exception } from '@adonisjs/core/exceptions'

export default class ForbiddenOperationException extends Exception {
  static status = 403
  static code = 'E_FORBIDDEN_OPERATION'

  constructor(message: string = 'Operazione non consentita') {
    super(message)
    this.status = 403
    this.code = 'E_FORBIDDEN_OPERATION'
  }
}
