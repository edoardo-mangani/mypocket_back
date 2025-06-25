import type { HttpContext } from '@adonisjs/core/http'
import { WalletsService } from '#services/wallet_service'
import { inject } from '@adonisjs/core'

@inject()
export default class WalletController {
  constructor(private walletsService: WalletsService) {}

  /**
   * Display a list of resource
   */
  async index(ctx: HttpContext) {
    return await this.walletsService.getAll(ctx)
  }

  /**
   * Handle form submission for the create action
   */
  async store(ctx: HttpContext) {
    return await this.walletsService.create(ctx)
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
    return await this.walletsService.update(id, ctx)
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
    return await this.walletsService.getUsersForWallet(id, ctx)
  }

  /**
   * Add users to wallet
   */
  async addUsersToWallet(ctx: HttpContext) {
    const { id } = ctx.params
    return await this.walletsService.addUsersToWallet(id, ctx)
  }

  /**
   * Remove user from wallet
   */
  async removeUserFromWallet(ctx: HttpContext) {
    const { id } = ctx.params
    return await this.walletsService.removeUserFromWallet(id, ctx)
  }
}
