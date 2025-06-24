import type { HttpContext } from '@adonisjs/core/http'
import { RecurringTypesService } from '#services/recurring_type_service'
import { inject } from '@adonisjs/core'

@inject()
export default class RecurringTypesController {
  constructor(private recurringTypesService: RecurringTypesService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await this.recurringTypesService.getAll()
  }
}
