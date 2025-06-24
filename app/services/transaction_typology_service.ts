import TransactionTypology from '#models/transaction_typology'
import { transactionTypologyTransformer } from '#transformers/transaction_typology_transformer'
import { TransactionTypologyDTO } from '#contracts/transaction_typology_contract'

export class TransactionTypologiesService {
  async getAll(): Promise<TransactionTypologyDTO[]> {
    const transactionTypologies = (await TransactionTypology.withoutTrashed().orderBy(
      'order',
      'asc'
    )) as TransactionTypology[]
    return transactionTypologies.map(transactionTypologyTransformer)
  }
}
