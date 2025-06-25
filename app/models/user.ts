import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import BaseSoftDeleteModel from './base_soft_delete_model.js'
import Role from './role.js'
import Wallet from './wallet.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseSoftDeleteModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isActive: boolean

  @column()
  declare roleId: number | null

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof Role>

  @manyToMany(() => Wallet, {
    pivotTable: 'user_wallets',
    pivotColumns: ['user_id', 'wallet_id'],
  })
  declare wallets: ManyToMany<typeof Wallet>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
