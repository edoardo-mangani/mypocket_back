import { BaseSchema } from '@adonisjs/lucid/schema'
import { RolesEnum } from '#enums/roles_enum'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable().unique()

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { name: RolesEnum.ADMIN, created_at: this.now(), updated_at: this.now() },
        { name: RolesEnum.USER, created_at: this.now(), updated_at: this.now() },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
