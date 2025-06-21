import { RecurringTypeDTO } from '#contracts/recurring_types_contract'
import RecurringType from '#models/recurring_type'

export function recurringTypeTransformer(model: RecurringType): RecurringTypeDTO {
  return {
    id: model.id,
    name: model.name,
    order: model.order,
  }
}
