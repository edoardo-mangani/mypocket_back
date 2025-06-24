import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    password: vine.string().minLength(8).optional(),
    fullName: vine.string().optional(),
    roleId: vine.number().optional(),
  })
)

export const updateUserValidatorMessages = {
  'email.required': "L'email è obbligatoria",
  'email.email': "Inserisci un'email valida",
  'password.required': 'La password è obbligatoria',
  'password.minLength': 'La password deve contenere almeno 8 caratteri',
}
