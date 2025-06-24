import User from '#models/user'
import { userTransformer } from '#transformers/user_transformer'
import { UserDTO } from '#contracts/user_contract'
import { updateUserValidator } from '#validators/update_user'
import { HttpContext } from '@adonisjs/core/http'

export class UserService {
  async getAll(): Promise<UserDTO[]> {
    const users = await User.query().where('is_active', true).preload('role')
    return users.map(userTransformer)
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
}
