import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.string('icon_url').notNullable()

      table.integer('wallet_id').unsigned().nullable()
      table.foreign('wallet_id').references('id').inTable('wallets').onDelete('set null')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
