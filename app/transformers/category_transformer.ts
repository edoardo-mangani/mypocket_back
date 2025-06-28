import { CategoryDTO } from '#contracts/category_contract'
import Category from '#models/category'

export default function categoryTransformer(category: Category): CategoryDTO {
  return {
    id: category.id,
    name: category.name,
    iconUrl: category.iconUrl,
    walletId: category.walletId,
  }
}
