import vine, { SimpleMessagesProvider } from '@vinejs/vine'

// Messaggi personalizzati per le regole di validazione
const messages = {
  // Messaggi generali applicabili a tutti i campi
  'required': 'Il campo {{ field }} è obbligatorio',
  'string': 'Il campo {{ field }} deve essere una stringa valida',
  'email': 'Il campo {{ field }} deve essere un indirizzo email valido',
  'number': 'Il campo {{ field }} deve essere un numero valido',
  'minLength': 'Il campo {{ field }} deve contenere almeno {{ min }} caratteri',
  'maxLength': 'Il campo {{ field }} non può contenere più di {{ max }} caratteri',
  'positive': 'Il campo {{ field }} deve essere un numero positivo',

  // Messaggi specifici per mail
  'email.email': "Inserisci un'email valida",
  'email.required': "L'email è obbligatoria",
  // Messaggi specifici per la password
  'password.required': 'La password è obbligatoria',
  'password.minLength': 'La password deve contenere almeno {{ min }} caratteri',
  // Messaggi specifici per il nome completo
  'fullName.minLength': 'Il nome completo deve contenere almeno {{ min }} caratteri',
  // Messaggi specifici per il ruolo
  'roleId.positive': 'Il ruolo deve essere un numero positivo',
  'roleId.number': 'Il ruolo deve essere un numero valido',
}

// Nomi user-friendly per i campi (sostituiscono {{ field }})
const fields = {
  email: 'email',
  password: 'password',
  fullName: 'nome completo',
  roleId: 'ruolo',
}

// Configurazione globale di VineJS
vine.messagesProvider = new SimpleMessagesProvider(messages, fields)
