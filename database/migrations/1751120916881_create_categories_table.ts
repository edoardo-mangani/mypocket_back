import { BaseSchema } from '@adonisjs/lucid/schema'
import { CategoriesEnum, categoriesLabels } from '#enums/categories_enum'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('slug').nullable().unique()
      table.string('name').nullable()
      table.string('icon_url').nullable()

      table.integer('wallet_id').unsigned().nullable()
      table.foreign('wallet_id').references('id').inTable('wallets').onDelete('set null')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })

    //Inserisce i dati iniziali
    this.defer(async (db) => {
      const categoriesData = Object.values(CategoriesEnum).map((categoryEnum) => ({
        slug: categoryEnum,
        name: null,
        icon_url: null,
        wallet_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }))

      await db.table(this.tableName).multiInsert(categoriesData)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
