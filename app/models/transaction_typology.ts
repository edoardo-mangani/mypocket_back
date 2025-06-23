import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import BaseSoftDeleteModel from './base_soft_delete_model.js'
import { TransactionTypologyEnum } from '#enums/transaction_typologies_enum'

export default class TransactionTypology extends BaseSoftDeleteModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: TransactionTypologyEnum

  @column()
  declare order: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
