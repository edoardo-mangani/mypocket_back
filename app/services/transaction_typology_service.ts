import TransactionTypology from '#models/transaction_typology'
import { transactionTypologyTransformer } from '#transformers/transaction_typology_transformer'
import { TransactionTypologyDTO } from '#contracts/transaction_typology_contract'
import { HttpContext } from '@adonisjs/core/http'
import { PaginatedResponse } from '#contracts/pagination_contract'
import { PaginationHelper } from '#utils/pagination_helper'

export class TransactionTypologiesService {
  async getAll(ctx: HttpContext): Promise<PaginatedResponse<TransactionTypologyDTO>> {
    const { page, perPage } = PaginationHelper.getPaginationParams(ctx)

    const paginator = await TransactionTypology.withoutTrashed()
      .orderBy('order', 'asc')
      .paginate(page, perPage)

    const transactionTypologies = (paginator.all() as TransactionTypology[]).map(
      transactionTypologyTransformer
    )

    return PaginationHelper.createResponse(transactionTypologies, paginator)
  }
}
