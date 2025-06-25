import User from '#models/user'
import { userTransformer } from '#transformers/user_transformer'
import { UserDTO } from '#contracts/user_contract'
import { updateUserValidator } from '#validators/update_user'
import { PaginatedResponse } from '#contracts/pagination_contract'
import { PaginationHelper } from '#utils/pagination_helper'
import { WalletDTO } from '#contracts/wallet_contract'
import Wallet from '#models/wallet'
import { walletTransformer } from '#transformers/wallet_transformer'
import type { Infer } from '@vinejs/vine/types'

type UpdateUserData = Infer<typeof updateUserValidator>

export class UserService {
  async getAll(paginationParams: {
    page: number
    perPage: number
  }): Promise<PaginatedResponse<UserDTO>> {
    const { page, perPage } = paginationParams

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

  async update(id: number, data: UpdateUserData): Promise<UserDTO> {
    const userToUpdate = await User.findOrFail(id)
    userToUpdate.merge(data)
    await userToUpdate.save()
    await userToUpdate.load('role')
    return userTransformer(userToUpdate)
  }

  async getWalletsForUser(
    id: number,
    paginationParams: { page: number; perPage: number }
  ): Promise<PaginatedResponse<WalletDTO>> {
    const { page, perPage } = paginationParams

    const paginator = await Wallet.withoutTrashed()
      .whereHas('users', (query) => query.where('users.id', id))
      .orderBy('name', 'asc')
      .paginate(page, perPage)

    return PaginationHelper.createResponse(paginator.all().map(walletTransformer), paginator)
  }
}
