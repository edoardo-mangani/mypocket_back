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
const WalletsController = () => import('#controllers/wallet_controller')
const CategoriesController = () => import('#controllers/category_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// API routes
router
  .group(() => {
    // Transaction typologies routes
    router
      .get('/transaction-typologies', [TransactionTypologiesController, 'index'])
      .as('transaction_typologies.index')
    // Recurring types routes
    router.get('/recurring-types', [RecurringTypesController, 'index']).as('recurring_types.index')
    // Categories routes
    router.get('/categories', [CategoriesController, 'index']).as('categories.index')
    router.get('/categories/:id', [CategoriesController, 'show']).as('categories.show')
    router.put('/categories/:id', [CategoriesController, 'update']).as('categories.update')
    router.delete('/categories/:id', [CategoriesController, 'delete']).as('categories.delete')
    router.post('/categories', [CategoriesController, 'store']).as('categories.store')
    // Wallets routes
    router.get('/wallets', [WalletsController, 'index']).as('wallets.index')
    router.get('/wallets/:id', [WalletsController, 'show']).as('wallets.show')
    router.put('/wallets/:id', [WalletsController, 'update']).as('wallets.update')
    router.delete('/wallets/:id', [WalletsController, 'delete']).as('wallets.delete')
    router.post('/wallets', [WalletsController, 'store']).as('wallets.store')
    router
      .get('/wallets/:id/users', [WalletsController, 'getUsersForWallet'])
      .as('wallets.getUsersForWallet')
    router
      .post('/wallets/:id/users', [WalletsController, 'addUsersToWallet'])
      .as('wallets.addUsersToWallet')
    router
      .delete('/wallets/:id/users', [WalletsController, 'removeUserFromWallet'])
      .as('wallets.removeUserFromWallet')
    // Users routes
    router.get('/users', [UsersController, 'index']).as('users.index')
    router.get('/users/:id', [UsersController, 'show']).as('users.show')
    router.put('/users/:id', [UsersController, 'update']).as('users.update')
    router
      .get('/users/:id/wallets', [UsersController, 'getWalletsForUser'])
      .as('users.getWalletsForUser')
  })
  .prefix('api')
  .as('api')

// Auth routes
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
