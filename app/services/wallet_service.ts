import Wallet from '#models/wallet'
import { WalletDTO } from '#contracts/wallet_contract'
import { PaginationHelper } from '#utils/pagination_helper'
import { HttpContext } from '@adonisjs/core/http'
import { walletTransformer } from '#transformers/wallet_transformer'
import { PaginatedResponse } from '#contracts/pagination_contract'
import { createWalletValidator } from '#validators/create_wallet'
import { updateWalletValidator } from '#validators/update_wallet'
import { UserDTO } from '#contracts/user_contract'
import User from '#models/user'
import { usersWalletValidator } from '#validators/add_users_wallet'
import { removeUsersWalletValidator } from '#validators/remove_users_wallet'
import { userTransformer } from '#transformers/user_transformer'

export class WalletsService {
  async getAll(ctx: HttpContext): Promise<PaginatedResponse<WalletDTO>> {
    const { page, perPage } = PaginationHelper.getPaginationParams(ctx)

    const paginator = await Wallet.withoutTrashed().orderBy('name', 'asc').paginate(page, perPage)

    return PaginationHelper.createResponse(
      paginator.all().map(walletTransformer),
      paginator
    ) as PaginatedResponse<WalletDTO>
  }

  async getById(id: number): Promise<WalletDTO> {
    return walletTransformer(await Wallet.withoutTrashed().where('id', id).firstOrFail())
  }

  async create(ctx: HttpContext): Promise<WalletDTO> {
    const data = await ctx.request.validateUsing(createWalletValidator)
    const wallet = await Wallet.create(data)
    await wallet.load('users')
    return walletTransformer(wallet)
  }

  async update(id: number, ctx: HttpContext): Promise<WalletDTO> {
    const data = await ctx.request.validateUsing(updateWalletValidator)
    const wallet = await Wallet.findOrFail(id)
    wallet.merge(data)
    await wallet.save()
    return wallet
  }

  async delete(id: number): Promise<void> {
    const wallet = await Wallet.findOrFail(id)
    await wallet.softDelete()
  }

  async getUsersForWallet(id: number, ctx: HttpContext): Promise<PaginatedResponse<UserDTO>> {
    const { page, perPage } = PaginationHelper.getPaginationParams(ctx)

    const paginator = await User.withoutTrashed()
      .where('wallet_id', id)
      .orderBy('name', 'asc')
      .paginate(page, perPage)

    return PaginationHelper.createResponse(
      paginator.all().map(userTransformer),
      paginator
    ) as PaginatedResponse<UserDTO>
  }

  async addUsersToWallet(id: number, ctx: HttpContext): Promise<void> {
    const data = await ctx.request.validateUsing(usersWalletValidator)
    const wallet = await Wallet.findOrFail(id)
    await wallet.related('users').attach(data.userIds)
  }

  async removeUserFromWallet(id: number, ctx: HttpContext): Promise<void> {
    const data = await ctx.request.validateUsing(removeUsersWalletValidator)
    const wallet = await Wallet.findOrFail(id)
    await wallet.related('users').pivotQuery().whereIn('user_id', data.userIds).update({
      deleted_at: new Date(),
    })
  }
}
