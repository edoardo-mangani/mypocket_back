import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { RolesEnum } from '#enums/roles_enum'
import { ApiResponse } from '#contracts/api_response_contract'

export default class RoleMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      roles?: RolesEnum[]
    } = {}
  ) {
    // Verifico che l'utente sia autenticato
    const user = ctx.auth.getUserOrFail()

    // Se non sono specificati ruoli, procedo
    if (!options.roles || options.roles.length === 0) {
      return next()
    }

    // Carico la relazione role se non è già stata caricata
    if (!user.role) {
      await user.load('role')
    }

    // Verifico che l'utente abbia un ruolo assegnato
    if (!user.role) {
      const response: ApiResponse = {
        success: false,
        message: "Nessun ruolo assegnato all'utente",
        data: null,
        errors: {
          role: ["Nessun ruolo assegnato all'utente"],
        },
        error_code: 'NO_ROLE_ASSIGNED',
        meta: undefined,
      }
      return ctx.response.status(403).json(response)
    }

    // Verifico che il ruolo dell'utente sia tra quelli autorizzati
    if (!options.roles.includes(user.role.name)) {
      const response: ApiResponse = {
        success: false,
        message: 'Permessi insufficienti per accedere a questa risorsa',
        data: null,
        errors: {
          role: ['Permessi insufficienti per accedere a questa risorsa'],
        },
        error_code: 'INSUFFICIENT_PERMISSIONS',
        meta: undefined,
      }
      return ctx.response.status(403).json(response)
    }

    // L'utente ha i permessi necessari, procedo
    return next()
  }
}
