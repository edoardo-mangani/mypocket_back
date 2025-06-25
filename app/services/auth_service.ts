import User from '#models/user'
import { userTransformer } from '#transformers/user_transformer'
import { AuthResponseDTO } from '#contracts/auth_contract'
import { UserDTO } from '#contracts/user_contract'
import type { Infer } from '@vinejs/vine/types'
import { registerUserValidator } from '#validators/register_user'
import { loginUserValidator } from '#validators/login_user'

type RegisterData = Infer<typeof registerUserValidator>
type LoginCredentials = Infer<typeof loginUserValidator>

export default class AuthService {
  async register(data: RegisterData): Promise<AuthResponseDTO> {
    const user = await User.create(data)
    await user.load('role')
    const token = await User.accessTokens.create(user)
    return {
      token: token.value!.release(),
      user: userTransformer(user),
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponseDTO> {
    const user = await User.verifyCredentials(credentials.email, credentials.password)
    await user.load('role')
    const token = await User.accessTokens.create(user)
    return {
      token: token.value!.release(),
      user: userTransformer(user),
    }
  }

  async me(user: User): Promise<UserDTO> {
    await user.load('role')
    return userTransformer(user)
  }

  async logout(
    user: User,
    tokenIdentifier?: string | number | BigInt
  ): Promise<{ message: string }> {
    if (tokenIdentifier) {
      await User.accessTokens.delete(user, tokenIdentifier)
    }
    return { message: 'Logout effettuato con successo' }
  }

  async logoutAll(user: User): Promise<{ message: string }> {
    await User.accessTokens
      .all(user)
      .then((tokens) =>
        Promise.all(tokens.map((token) => User.accessTokens.delete(user, token.identifier)))
      )
    return { message: 'Logout da tutti i dispositivi effettuato con successo' }
  }
}
