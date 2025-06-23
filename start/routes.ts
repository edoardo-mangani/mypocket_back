/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const TransactionTypologiesController = () =>
  import('#controllers/transaction_typologies_controller')

const RecurringTypesController = () => import('#controllers/recurring_types_controller')

const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/transaction-typologies', [TransactionTypologiesController, 'index'])
    router.get('/recurring-types', [RecurringTypesController, 'index'])
  })
  .prefix('api')
  .as('api')

router
  .group(() => {
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/login', [AuthController, 'login'])
    router.get('/auth/me', [AuthController, 'me'])
    router.post('/auth/logout', [AuthController, 'logout'])
    router.post('/auth/logout-all', [AuthController, 'logoutAll'])
  })
  .prefix('auth')
  .as('auth')
