import RecurringType from '#models/recurring_type'

export class RecurringTypesService {
  async getAll(): Promise<RecurringType[]> {
    return (await RecurringType.withoutTrashed().orderBy('order', 'asc')) as RecurringType[]
  }
}
