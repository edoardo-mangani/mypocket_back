import type { HttpContext } from '@adonisjs/core/http'
import { TransactionTypologiesService } from '#services/transaction_typology_service'
import { inject } from '@adonisjs/core'
import { PaginationHelper } from '#utils/pagination_helper'

@inject()
export default class TransactionTypologiesController {
  constructor(private transactionTypologiesService: TransactionTypologiesService) {}

  /**
   * Display a list of resource
   */
  async index(ctx: HttpContext) {
    const paginationParams = PaginationHelper.getPaginationParams(ctx)
    return await this.transactionTypologiesService.getAll(paginationParams)
  }
}
