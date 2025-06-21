import type { HttpContext } from '@adonisjs/core/http'
import { TransactionTypologiesService } from '#services/transaction_typologies_service'
import { transactionTypologyTransformer } from '#transformers/transaction_typologies_transformer'

export default class TransactionTypologiesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const transactionTypologies = await new TransactionTypologiesService().getAll()
    return transactionTypologies.map(transactionTypologyTransformer)
  }
}
