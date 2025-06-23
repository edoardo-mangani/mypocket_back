import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'transaction_typologies'

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
          name: 'Entrata',
          order: 1,
          created_at: this.now(),
          updated_at: this.now(),
        },
        {
          name: 'Uscita',
          order: 2,
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
