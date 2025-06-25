import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { inject } from '@adonisjs/core'
import { registerUserValidator } from '#validators/register_user'
import { loginUserValidator } from '#validators/login_user'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async register(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(registerUserValidator)
    const result = await this.authService.register(data)
    ctx.response.status(201)
    return result
  }

  async login(ctx: HttpContext) {
    const credentials = await ctx.request.validateUsing(loginUserValidator)
    return await this.authService.login(credentials)
  }

  async me(ctx: HttpContext) {
    const user = ctx.auth.getUserOrFail()
    return await this.authService.me(user)
  }

  async logout(ctx: HttpContext) {
    const user = ctx.auth.getUserOrFail()
    const token = ctx.auth.user?.currentAccessToken
    return await this.authService.logout(user, token?.identifier)
  }

  async logoutAll(ctx: HttpContext) {
    const user = ctx.auth.getUserOrFail()
    return await this.authService.logoutAll(user)
  }
}
