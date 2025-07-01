import Category from '#models/category'
import { PaginationParams } from '#contracts/pagination_contract'
import { PaginatedResponse } from '#contracts/pagination_contract'
import { CategoryDTO } from '#contracts/category_contract'
import categoryTransformer from '#transformers/category_transformer'
import { PaginationHelper } from '#utils/pagination_helper'
import { createCategoryValidator } from '#validators/create_category'
import type { Infer } from '@vinejs/vine/types'
import { updateCategoryValidator } from '#validators/update_category'

type CreateCategoryData = Infer<typeof createCategoryValidator>
type UpdateCategoryData = Infer<typeof updateCategoryValidator>

export class CategoryService {
  async getAll(paginationParams: PaginationParams): Promise<PaginatedResponse<CategoryDTO>> {
    const { page, perPage } = paginationParams

    const paginator = await Category.withoutTrashed().orderBy('name', 'asc').paginate(page, perPage)

    const categories = (paginator.all() as Category[]).map(categoryTransformer)

    return PaginationHelper.createResponse(categories, paginator)
  }

  async getById(id: number): Promise<CategoryDTO> {
    return categoryTransformer(await Category.withoutTrashed().where('id', id).firstOrFail())
  }

  async create(data: CreateCategoryData): Promise<CategoryDTO> {
    const category = await Category.create(data)

    return categoryTransformer(category)
  }

  async update(id: number, data: UpdateCategoryData): Promise<CategoryDTO> {
    const category = await Category.findOrFail(id)
    if (!category.isCustom) {
      throw new Error('Non è possibile modificare una categoria standard')
    }
    category.merge(data)
    await category.save()
    return categoryTransformer(category)
  }

  async delete(id: number): Promise<void> {
    const category = await Category.findOrFail(id)
    await category.softDelete()
  }
}
