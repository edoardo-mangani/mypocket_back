import { BaseSchema } from '@adonisjs/lucid/schema'
import { RecurrenceEnum } from '#enums/recurrence_enum'

export default class extends BaseSchema {
  protected tableName = 'recurring_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('order').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })

    // Inserisce i dati iniziali
    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          name: RecurrenceEnum.DAILY,
          order: 1,
          created_at: this.now(),
          updated_at: this.now(),
        },
        {
          name: RecurrenceEnum.WEEKLY,
          order: 2,
          created_at: this.now(),
          updated_at: this.now(),
        },
        {
          name: RecurrenceEnum.MONTHLY,
          order: 3,
          created_at: this.now(),
          updated_at: this.now(),
        },
        {
          name: RecurrenceEnum.YEARLY,
          order: 4,
          created_at: this.now(),
          updated_at: this.now(),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
