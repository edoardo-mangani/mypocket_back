import vine from '@vinejs/vine'

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

export const loginUserValidatorMessages = {
  'email.required': "L'email è obbligatoria",
  'email.email': "Inserisci un'email valida",
  'password.required': 'La password è obbligatoria',
}
