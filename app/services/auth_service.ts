import User from '#models/user'
import { registerUserValidator, registerUserValidatorMessages } from '#validators/register_user'
import { loginUserValidator, loginUserValidatorMessages } from '#validators/login_user'
import { HttpContext } from '@adonisjs/core/http'
import { userTransformer } from '#transformers/users_transformer'
import { AuthResponseDTO } from '#contracts/auth_contract'
import { UserDTO } from '#contracts/users_contract'

export default class AuthService {
  async register(ctx: HttpContext): Promise<AuthResponseDTO> {
    const data = await ctx.request.validateUsing(registerUserValidator, {
      messagesProvider: {
        getMessage: (field: string, rule: string) => {
          const key = `${field}.${rule}`
          return registerUserValidatorMessages[key as keyof typeof registerUserValidatorMessages]
        },
      },
    })
    const user = await User.create(data)
    await user.load('role')
    const token = await User.accessTokens.create(user)
    return {
      token: token.value!.release(),
      user: userTransformer(user),
    }
  }

  async login(ctx: HttpContext): Promise<AuthResponseDTO> {
    const { email, password } = await ctx.request.validateUsing(loginUserValidator, {
      messagesProvider: {
        getMessage: (field: string, rule: string) => {
          const key = `${field}.${rule}`
          return loginUserValidatorMessages[key as keyof typeof loginUserValidatorMessages]
        },
      },
    })
    const user = await User.verifyCredentials(email, password)
    await user.load('role')
    const token = await User.accessTokens.create(user)
    return {
      token: token.value!.release(),
      user: userTransformer(user),
    }
  }

  async me(ctx: HttpContext): Promise<UserDTO> {
    const user = ctx.auth.getUserOrFail()
    await user.load('role')
    return userTransformer(user)
  }

  async logout(ctx: HttpContext): Promise<{ message: string }> {
    const user = ctx.auth.getUserOrFail()
    const token = ctx.auth.user?.currentAccessToken

    if (token) {
      await User.accessTokens.delete(user, token.identifier)
    }

    return { message: 'Logout effettuato con successo' }
  }

  async logoutAll(ctx: HttpContext): Promise<{ message: string }> {
    const user = ctx.auth.getUserOrFail()
    await User.accessTokens
      .all(user)
      .then((tokens) =>
        Promise.all(tokens.map((token) => User.accessTokens.delete(user, token.identifier)))
      )

    return { message: 'Logout da tutti i dispositivi effettuato con successo' }
  }
}
