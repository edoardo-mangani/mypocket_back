import type { HttpContext } from '@adonisjs/core/http'
import { RecurringTypesService } from '#services/recurring_type_service'
import { inject } from '@adonisjs/core'
import { PaginationHelper } from '#utils/pagination_helper'

@inject()
export default class RecurringTypesController {
  constructor(private recurringTypesService: RecurringTypesService) {}

  /**
   * Display a list of resource
   */
  async index(ctx: HttpContext) {
    const paginationParams = PaginationHelper.getPaginationParams(ctx)
    return await this.recurringTypesService.getAll(paginationParams)
  }
}
