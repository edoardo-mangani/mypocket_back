import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class BaseSoftDeleteModel extends BaseModel {
  @column.dateTime()
  public deletedAt?: DateTime

  public async softDelete() {
    if (!this.deletedAt) {
      this.deletedAt = DateTime.now()
      await this.save()
    }
  }

  public async restore() {
    if (this.deletedAt) {
      this.deletedAt = undefined
      await this.save()
    }
  }

  public trashed(): boolean {
    return !!this.deletedAt
  }

  public notTrashed(): boolean {
    return !this.deletedAt
  }

  public static onlyTrashed() {
    return this.query().whereNotNull('deleted_at')
  }

  public static withTrashed() {
    return this.query()
  }

  public static withoutTrashed() {
    return this.query().whereNull('deleted_at')
  }
}
