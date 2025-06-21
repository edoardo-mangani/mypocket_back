import TransactionTypology from '#models/transaction_typology'

export class TransactionTypologiesService {
  async getAll(): Promise<TransactionTypology[]> {
    return (await TransactionTypology.withoutTrashed().orderBy(
      'order',
      'asc'
    )) as TransactionTypology[]
  }
}
