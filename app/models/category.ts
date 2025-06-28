import { DateTime } from 'luxon'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseSoftDeleteModel from './base_soft_delete_model.js'
import Wallet from './wallet.js'

export default class Category extends BaseSoftDeleteModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare iconUrl: string

  @column()
  declare walletId: number | null

  @belongsTo(() => Wallet, {
    foreignKey: 'walletId',
  })
  declare wallet: BelongsTo<typeof Wallet>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
