import type { HttpContext } from '@adonisjs/core/http'
import { WalletsService } from '#services/wallet_service'
import { inject } from '@adonisjs/core'
import { PaginationHelper } from '#utils/pagination_helper'
import { createWalletValidator } from '#validators/create_wallet'
import { updateWalletValidator } from '#validators/update_wallet'
import { usersWalletValidator } from '#validators/add_users_wallet'
import { removeUsersWalletValidator } from '#validators/remove_users_wallet'
@inject()
export default class WalletController {
  constructor(private walletsService: WalletsService) {}

  /**
   * Display a list of resource
   */
  async index(ctx: HttpContext) {
    const paginationParams = PaginationHelper.getPaginationParams(ctx)
    return await this.walletsService.getAll(paginationParams)
  }

  /**
   * Handle form submission for the create action
   */
  async store(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(createWalletValidator)
    const result = await this.walletsService.create(data)
    ctx.response.status(201)
    return result
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await this.walletsService.getById(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update(ctx: HttpContext) {
    const { id } = ctx.params
    const data = await ctx.request.validateUsing(updateWalletValidator)
    return await this.walletsService.update(id, data)
  }

  /**
   * Delete record
   */
  async delete({ params }: HttpContext) {
    return await this.walletsService.delete(params.id)
  }

  /**
   * Get users for wallet
   */
  async getUsersForWallet(ctx: HttpContext) {
    const { id } = ctx.params
    const paginationParams = PaginationHelper.getPaginationParams(ctx)
    return await this.walletsService.getUsersForWallet(id, paginationParams)
  }

  /**
   * Add users to wallet
   */
  async addUsersToWallet(ctx: HttpContext) {
    const { id } = ctx.params

    const data = await ctx.request.validateUsing(usersWalletValidator, {
      meta: { walletId: Number.parseInt(id) },
    })

    return await this.walletsService.addUsersToWallet(data, Number.parseInt(id))
  }

  /**
   * Remove user from wallet
   */
  async removeUserFromWallet(ctx: HttpContext) {
    const { id } = ctx.params
    const data = await ctx.request.validateUsing(removeUsersWalletValidator, {
      meta: { walletId: Number.parseInt(id) },
    })
    return await this.walletsService.removeUserFromWallet(data, Number.parseInt(id))
  }
}
