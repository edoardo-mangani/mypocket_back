import TransactionTypology from '#models/transaction_typology'
import { transactionTypologyTransformer } from '#transformers/transaction_typology_transformer'
import { TransactionTypologyDTO } from '#contracts/transaction_typology_contract'
import { PaginatedResponse } from '#contracts/pagination_contract'
import { PaginationHelper } from '#utils/pagination_helper'
import { PaginationParams } from '#contracts/pagination_contract'

export class TransactionTypologiesService {
  async getAll(
    paginationParams: PaginationParams
  ): Promise<PaginatedResponse<TransactionTypologyDTO>> {
    const { page, perPage } = paginationParams

    const paginator = await TransactionTypology.withoutTrashed()
      .orderBy('order', 'asc')
      .paginate(page, perPage)

    const transactionTypologies = (paginator.all() as TransactionTypology[]).map(
      transactionTypologyTransformer
    )

    return PaginationHelper.createResponse(transactionTypologies, paginator)
  }
}
