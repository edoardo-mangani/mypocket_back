import TransactionTypology from '#models/transaction_typology'
import { transactionTypologyTransformer } from '#transformers/transaction_typologies_transformer.js'

export class TransactionTypologiesService {
  async getAll(): Promise<TransactionTypologyDTO[]> {
    return await TransactionTypology.withoutTrashed().orderBy('order', 'asc')
  }
}
