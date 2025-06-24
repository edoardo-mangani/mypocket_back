import RecurringType from '#models/recurring_type'
import { recurringTypeTransformer } from '#transformers/recurring_type_transformer'
import { RecurringTypeDTO } from '#contracts/recurring_type_contract'

export class RecurringTypesService {
  async getAll(): Promise<RecurringTypeDTO[]> {
    const recurringTypes = (await RecurringType.withoutTrashed().orderBy(
      'order',
      'asc'
    )) as RecurringType[]
    return recurringTypes.map(recurringTypeTransformer)
  }
}
