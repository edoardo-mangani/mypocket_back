import RecurringType from '#models/recurring_type'
import { recurringTypeTransformer } from '#transformers/recurring_type_transformer'
import { RecurringTypeDTO } from '#contracts/recurring_type_contract'
import { PaginatedResponse } from '#contracts/pagination_contract'
import { PaginationHelper } from '#utils/pagination_helper'
import { PaginationParams } from '#contracts/pagination_contract'

export class RecurringTypesService {
  async getAll(paginationParams: PaginationParams): Promise<PaginatedResponse<RecurringTypeDTO>> {
    const { page, perPage } = paginationParams

    const paginator = await RecurringType.withoutTrashed()
      .orderBy('order', 'asc')
      .paginate(page, perPage)

    const recurringTypes = (paginator.all() as RecurringType[]).map(recurringTypeTransformer)

    return PaginationHelper.createResponse(recurringTypes, paginator)
  }
}
