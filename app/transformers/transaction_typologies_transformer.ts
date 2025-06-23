import { TransactionTypologyDTO } from '#contracts/transaction_typologies_contract'
import TransactionTypology from '#models/transaction_typology'

export function transactionTypologyTransformer(model: TransactionTypology): TransactionTypologyDTO {
  return {
    id: model.id,
    name: model.name,
    order: model.order,
  }
}
