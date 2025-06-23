import type { HttpContext } from '@adonisjs/core/http'
import { TransactionTypologiesService } from '#services/transaction_typologies_service'
import { inject } from '@adonisjs/core'

@inject()
export default class TransactionTypologiesController {
  constructor(private transactionTypologiesService: TransactionTypologiesService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await this.transactionTypologiesService.getAll()
  }
}
