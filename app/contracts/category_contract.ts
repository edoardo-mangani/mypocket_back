import { CategoriesEnum } from '#enums/categories_enum'

export interface CategoryDTO {
  id: number
  slug: CategoriesEnum | null
  name: string | null
  iconUrl: string | null
  walletId: number | null
  isCustom: boolean
}
