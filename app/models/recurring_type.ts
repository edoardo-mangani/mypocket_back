import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import BaseSoftDeleteModel from '#models/base_soft_delete_model'
import { FrequencyEnum } from '#enums/frequency_enum'

export default class RecurringType extends BaseSoftDeleteModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare order: number

  @column()
  declare frequency: FrequencyEnum

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
