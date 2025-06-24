import { TransactionTypologyDTO } from '#contracts/transaction_typology_contract'
import TransactionTypology from '#models/transaction_typology'
import { transactionTypologyLabels } from '#enums/transaction_typologies_enum'

export function transactionTypologyTransformer(model: TransactionTypology): TransactionTypologyDTO {
  return {
    id: model.id,
    name: model.name,
    order: model.order,
    label: transactionTypologyLabels[model.name],
  }
}
