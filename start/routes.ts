/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const TransactionTypologiesController = () => import('#controllers/transaction_typology_controller')
const RecurringTypesController = () => import('#controllers/recurring_type_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/user_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .get('/transaction-typologies', [TransactionTypologiesController, 'index'])
      .as('transaction_typologies.index')
    router.get('/recurring-types', [RecurringTypesController, 'index']).as('recurring_types.index')
    router.get('/users', [UsersController, 'index']).as('users.index')
    router.get('/users/:id', [UsersController, 'show']).as('users.show')
    router.put('/users/:id', [UsersController, 'update']).as('users.update')
  })
  .prefix('api')
  .as('api')

router
  .group(() => {
    router.post('/register', [AuthController, 'register']).as('register')
    router.post('/login', [AuthController, 'login']).as('login')
    router.get('/me', [AuthController, 'me']).middleware(middleware.auth()).as('me')
    router.post('/logout', [AuthController, 'logout']).middleware(middleware.auth()).as('logout')
    router
      .post('/logout-all', [AuthController, 'logoutAll'])
      .middleware(middleware.auth())
      .as('logout_all')
  })
  .prefix('api/auth')
  .as('api.auth')
