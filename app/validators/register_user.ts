import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
    fullName: vine.string().optional(),
    roleId: vine.number().optional(),
  })
)

export const registerUserValidatorMessages = {
  'email.required': "L'email è obbligatoria",
  'email.email': "Inserisci un'email valida",
  'password.required': 'La password è obbligatoria',
  'password.minLength': 'La password deve contenere almeno 8 caratteri',
}
