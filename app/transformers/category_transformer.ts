import { CategoryDTO } from '#contracts/category_contract'
import Category from '#models/category'
import { CategoriesEnum } from '#enums/categories_enum'
import { categoriesLabels } from '#enums/categories_enum'

export default function categoryTransformer(category: Category): CategoryDTO {
  return {
    id: category.id,
    slug: category.slug,
    name: nameTransformer(category),
    iconUrl: category.iconUrl,
    walletId: category.walletId,
    isCustom: category.isCustom,
  }
}

export function nameTransformer(category: Category): string {
  if (category.slug) {
    return categoriesLabels[category.slug as CategoriesEnum]
  }
  return category.name || ''
}
