import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import BaseSoftDeleteModel from './base_soft_delete_model.js'

export default class TransactionTypology extends BaseSoftDeleteModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare order: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
