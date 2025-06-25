import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_wallets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')

      table.integer('wallet_id').unsigned().notNullable()
      table.foreign('wallet_id').references('id').inTable('wallets').onDelete('cascade')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
