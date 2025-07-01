import { DateTime } from 'luxon'
import { column, belongsTo, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseSoftDeleteModel from './base_soft_delete_model.js'
import Wallet from './wallet.js'
import { CategoriesEnum } from '../enums/categories_enum.js'

export default class Category extends BaseSoftDeleteModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: CategoriesEnum | null

  @column()
  declare name: string | null

  @column()
  declare iconUrl: string | null

  @column()
  declare walletId: number | null

  @belongsTo(() => Wallet, {
    foreignKey: 'walletId',
  })
  declare wallet: BelongsTo<typeof Wallet>

  @computed()
  get isCustom(): boolean {
    return this.walletId !== null
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
