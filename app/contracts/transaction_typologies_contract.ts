import { TransactionTypologyEnum } from '#enums/transaction_typologies_enum'

export interface TransactionTypologyDTO {
  id: number
  name: TransactionTypologyEnum
  order: number
  label: string
}
