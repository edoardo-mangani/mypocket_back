import { RecurrenceEnum } from '#enums/recurrence_enum'

export const recurrenceRules = {
  [RecurrenceEnum.DAILY]: { unit: 'days', frequency: 1 },
  [RecurrenceEnum.WEEKLY]: { unit: 'days', frequency: 7 },
  [RecurrenceEnum.MONTHLY]: { unit: 'months', frequency: 1 },
  [RecurrenceEnum.YEARLY]: { unit: 'years', frequency: 1 },
}
