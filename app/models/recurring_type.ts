import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import BaseSoftDeleteModel from '#models/base_soft_delete_model'
import { RecurrenceEnum } from '#enums/recurrence_enum'

export default class RecurringType extends BaseSoftDeleteModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: RecurrenceEnum

  @column()
  declare order: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
