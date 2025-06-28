import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PaginationHelper } from '#utils/pagination_helper'
import { CategoryService } from '#services/category_service'
import { createCategoryValidator } from '#validators/create_category'
import { updateCategoryValidator } from '#validators/update_category'

@inject()
export default class CategoriesController {
  constructor(private categoryService: CategoryService) {}

  /**
   * Display a list of resource
   */
  async index(ctx: HttpContext) {
    const paginationParams = PaginationHelper.getPaginationParams(ctx)
    return await this.categoryService.getAll(paginationParams)
  }

  /**
   * Handle form submission for the create action
   */
  async store(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(createCategoryValidator)
    const result = await this.categoryService.create(data)
    ctx.response.status(201)
    return result
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await this.categoryService.getById(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { id } = params
    const data = await request.validateUsing(updateCategoryValidator)
    return await this.categoryService.update(id, data)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}

  /**
   * Delete record
   */
  async delete({ params }: HttpContext) {
    return await this.categoryService.delete(params.id)
  }
}
