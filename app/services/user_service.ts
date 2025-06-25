import User from '#models/user'
import { userTransformer } from '#transformers/user_transformer'
import { UserDTO } from '#contracts/user_contract'
import { updateUserValidator } from '#validators/update_user'
import { HttpContext } from '@adonisjs/core/http'
import { PaginatedResponse } from '#contracts/pagination_contract'
import { PaginationHelper } from '#utils/pagination_helper'
import { WalletDTO } from '#contracts/wallet_contract'
import Wallet from '#models/wallet'
import { walletTransformer } from '#transformers/wallet_transformer'

export class UserService {
  async getAll(ctx: HttpContext): Promise<PaginatedResponse<UserDTO>> {
    const { page, perPage } = PaginationHelper.getPaginationParams(ctx)

    const paginator = await User.withoutTrashed()
      .where('is_active', true)
      .preload('role')
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    const users = paginator.all().map(userTransformer)

    return PaginationHelper.createResponse(users, paginator)
  }

  async getById(id: number): Promise<UserDTO> {
    const user = await User.findOrFail(id)
    await user.load('role')
    return userTransformer(user)
  }

  async update(id: number, ctx: HttpContext): Promise<UserDTO> {
    const data = await ctx.request.validateUsing(updateUserValidator)

    const userToUpdate = await User.findOrFail(id)
    userToUpdate.merge(data)
    await userToUpdate.save()
    await userToUpdate.load('role')
    return userTransformer(userToUpdate)
  }

  async getWalletsForUser(id: number, ctx: HttpContext): Promise<PaginatedResponse<WalletDTO>> {
    const { page, perPage } = PaginationHelper.getPaginationParams(ctx)

    const paginator = await Wallet.withoutTrashed()
      .whereHas('users', (query) => query.where('users.id', id))
      .orderBy('name', 'asc')
      .paginate(page, perPage)

    return PaginationHelper.createResponse(paginator.all().map(walletTransformer), paginator)
  }
}
