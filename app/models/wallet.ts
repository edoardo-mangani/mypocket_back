import { DateTime } from 'luxon'
import { column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import BaseSoftDeleteModel from './base_soft_delete_model.js'
import User from './user.js'

export default class Wallet extends BaseSoftDeleteModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name?: string | null

  @column()
  declare iconUrl?: string | null

  @manyToMany(() => User, {
    pivotTable: 'user_wallets',
    pivotColumns: ['user_id', 'wallet_id'],
  })
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
