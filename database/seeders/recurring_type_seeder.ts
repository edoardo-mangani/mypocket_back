import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RecurringType from '#models/recurring_type'
import { FrequencyEnum } from '#enums/frequency_enum'

export default class extends BaseSeeder {
  async run() {
    await RecurringType.createMany([
      { name: 'Giornaliera', order: 1, frequency: FrequencyEnum.DAILY },
      { name: 'Settimanale', order: 2, frequency: FrequencyEnum.WEEKLY },
      { name: 'Mensile', order: 3, frequency: FrequencyEnum.MONTHLY },
      { name: 'Annuale', order: 4, frequency: FrequencyEnum.YEARLY },
    ])
  }
}
