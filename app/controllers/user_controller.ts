import type { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { PaginationHelper } from '#utils/pagination_helper'
import { updateUserValidator } from '#validators/update_user'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  /**
   * Display a list of resource
   */
  async index(ctx: HttpContext) {
    const paginationParams = PaginationHelper.getPaginationParams(ctx)
    return await this.userService.getAll(paginationParams)
  }

  /**
   * Handle form submission for the create action
   */
  //async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await this.userService.getById(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update(ctx: HttpContext) {
    const { id } = ctx.params
    const data = await ctx.request.validateUsing(updateUserValidator)
    return await this.userService.update(id, data)
  }

  /**
   * Delete record
   */
  //async destroy({ params }: HttpContext) {}

  /**
   * Soft delete record
   */
  //async softDelete({ params }: HttpContext) {}

  /**
   * Get wallets for user
   */
  async getWalletsForUser(ctx: HttpContext) {
    const { id } = ctx.params
    const paginationParams = PaginationHelper.getPaginationParams(ctx)
    return await this.userService.getWalletsForUser(id, paginationParams)
  }
}
