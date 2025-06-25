import Wallet from '#models/wallet'
import { WalletDTO } from '#contracts/wallet_contract'
import { PaginationHelper } from '#utils/pagination_helper'
import { walletTransformer } from '#transformers/wallet_transformer'
import { PaginatedResponse } from '#contracts/pagination_contract'
import { createWalletValidator } from '#validators/create_wallet'
import { updateWalletValidator } from '#validators/update_wallet'
import { UserDTO } from '#contracts/user_contract'
import User from '#models/user'
import { usersWalletValidator } from '#validators/add_users_wallet'
import { removeUsersWalletValidator } from '#validators/remove_users_wallet'
import { userTransformer } from '#transformers/user_transformer'
import type { Infer } from '@vinejs/vine/types'
import logger from '@adonisjs/core/services/logger'

type CreateWalletData = Infer<typeof createWalletValidator>
type UpdateWalletData = Infer<typeof updateWalletValidator>
type AddUsersData = Infer<typeof usersWalletValidator>
type RemoveUsersData = Infer<typeof removeUsersWalletValidator>

export class WalletsService {
  async getAll(paginationParams: {
    page: number
    perPage: number
  }): Promise<PaginatedResponse<WalletDTO>> {
    const { page, perPage } = paginationParams

    const paginator = await Wallet.withoutTrashed().orderBy('name', 'asc').paginate(page, perPage)

    return PaginationHelper.createResponse(
      paginator.all().map(walletTransformer),
      paginator
    ) as PaginatedResponse<WalletDTO>
  }

  async getById(id: number): Promise<WalletDTO> {
    return walletTransformer(await Wallet.withoutTrashed().where('id', id).firstOrFail())
  }

  async create(data: CreateWalletData): Promise<WalletDTO> {
    const { userIds, ...walletData } = data
    const wallet = await Wallet.create(walletData)

    if (userIds?.length) {
      await this.addUsersToWallet({ userIds }, wallet.id)
    }

    await wallet.load('users')
    return walletTransformer(wallet)
  }

  async update(id: number, data: UpdateWalletData): Promise<WalletDTO> {
    const wallet = await Wallet.findOrFail(id)
    wallet.merge(data)
    await wallet.save()
    return walletTransformer(wallet)
  }

  async delete(id: number): Promise<void> {
    const wallet = await Wallet.findOrFail(id)
    await wallet.softDelete()
  }

  async getUsersForWallet(
    id: number,
    paginationParams: { page: number; perPage: number }
  ): Promise<PaginatedResponse<UserDTO>> {
    const { page, perPage } = paginationParams

    const paginator = await User.withoutTrashed()
      .whereHas('wallets', (query) => query.where('wallets.id', id))
      .preload('role')
      .orderBy('full_name', 'asc')
      .paginate(page, perPage)

    return PaginationHelper.createResponse(
      paginator.all().map(userTransformer),
      paginator
    ) as PaginatedResponse<UserDTO>
  }

  async addUsersToWallet(data: AddUsersData, walletId: number): Promise<void> {
    const wallet = await Wallet.findOrFail(walletId)

    const now = new Date()
    const usersData: Record<number, { created_at: Date; updated_at: Date }> = {}
    data.userIds.forEach((userId) => {
      usersData[userId] = { created_at: now, updated_at: now }
    })

    await wallet.related('users').attach(usersData)
  }

  async removeUserFromWallet(data: RemoveUsersData, walletId: number): Promise<void> {
    const wallet = await Wallet.findOrFail(walletId)
    await wallet.related('users').pivotQuery().whereIn('user_id', data.userIds).update({
      deleted_at: new Date(),
    })
  }
}
