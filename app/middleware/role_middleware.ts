import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { RolesEnum } from '#enums/roles_enum'

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
      return ctx.response.status(403).json({
        data: null,
        error: true,
        error_code: 'NO_ROLE_ASSIGNED',
        error_message: "Nessun ruolo assegnato all'utente",
        exception: 'ForbiddenException',
      })
    }

    // Verifico che il ruolo dell'utente sia tra quelli autorizzati
    if (!options.roles.includes(user.role.name)) {
      return ctx.response.status(403).json({
        data: null,
        error: true,
        error_code: 'INSUFFICIENT_PERMISSIONS',
        error_message: 'Permessi insufficienti per accedere a questa risorsa',
        exception: 'ForbiddenException',
      })
    }

    // L'utente ha i permessi necessari, procedo
    return next()
  }
}
