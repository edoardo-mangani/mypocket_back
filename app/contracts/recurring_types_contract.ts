import { RecurrenceEnum } from '#enums/recurrence_enum'

export interface RecurringTypeDTO {
  id: number
  name: RecurrenceEnum
  order: number
  label: string
}
