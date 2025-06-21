import type { HttpContext } from '@adonisjs/core/http'
import { RecurringTypesService } from '#services/recurring_types_service'
import { recurringTypeTransformer } from '#transformers/recurring_types_transformer'

export default class RecurringTypesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const recurringTypes = await new RecurringTypesService().getAll()
    return recurringTypes.map(recurringTypeTransformer)
  }
}
