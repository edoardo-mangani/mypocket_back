import { schema } from '@adonisjs/validator'

export default class UpdateWalletValidator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    icon_url: schema.string.optional({ trim: true }),
  })

  public messages = {
    'name.string': 'Il nome deve essere una stringa',
    'icon_url.string': 'L’URL dell’icona deve essere una stringa',
  }
}
