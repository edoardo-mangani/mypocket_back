import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async register(ctx: HttpContext) {
    const result = await this.authService.register(ctx)
    ctx.response.status(201)
    return result
  }

  async login(ctx: HttpContext) {
    return await this.authService.login(ctx)
  }

  async me(ctx: HttpContext) {
    return await this.authService.me(ctx)
  }

  async logout(ctx: HttpContext) {
    return await this.authService.logout(ctx)
  }

  async logoutAll(ctx: HttpContext) {
    return await this.authService.logoutAll(ctx)
  }
}
