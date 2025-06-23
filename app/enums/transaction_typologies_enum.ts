export enum TransactionTypologyEnum {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const transactionTypologyLabels: Record<TransactionTypologyEnum, string> = {
  [TransactionTypologyEnum.INCOME]: 'Entrata',
  [TransactionTypologyEnum.EXPENSE]: 'Uscita',
}
