export enum RecurrenceEnum {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export const recurrenceLabels: Record<RecurrenceEnum, string> = {
  [RecurrenceEnum.DAILY]: 'Giornaliera',
  [RecurrenceEnum.WEEKLY]: 'Settimanale',
  [RecurrenceEnum.MONTHLY]: 'Mensile',
  [RecurrenceEnum.YEARLY]: 'Annuale',
}
