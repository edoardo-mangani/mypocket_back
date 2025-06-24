import { HttpContext } from '@adonisjs/core/http'
import { PaginationParams, PaginationMeta, PaginatedResponse } from '#contracts/pagination_contract'

export class PaginationHelper {
  // Valori di default
  static readonly DEFAULT_PAGE = 1
  static readonly DEFAULT_PER_PAGE = 10
  static readonly MAX_PER_PAGE = 100

  /**
   * Estrae e valida i parametri di paginazione dalla query string
   */
  static getPaginationParams(ctx: HttpContext): { page: number; perPage: number } {
    const { page, perPage } = ctx.request.qs() as PaginationParams

    const validPage = page && page > 0 ? Math.floor(page) : this.DEFAULT_PAGE
    const validPerPage =
      perPage && perPage > 0
        ? Math.min(Math.floor(perPage), this.MAX_PER_PAGE)
        : this.DEFAULT_PER_PAGE

    return { page: validPage, perPage: validPerPage }
  }

  /**
   * Crea l'oggetto meta per la risposta paginata da un paginator di Lucid
   */
  static createMeta(paginator: any): PaginationMeta {
    return {
      total: paginator.total,
      perPage: paginator.perPage,
      currentPage: paginator.currentPage,
      lastPage: paginator.lastPage,
    }
  }

  /**
   * Crea una risposta paginata completa
   */
  static createResponse<T>(data: T[], paginator: any): PaginatedResponse<T> {
    return {
      data,
      meta: this.createMeta(paginator),
    }
  }
}
