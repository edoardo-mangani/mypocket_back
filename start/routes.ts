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
const WalletsController = () => import('#controllers/wallets_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/transaction-typologies', [TransactionTypologiesController, 'index'])

router.get('/recurring-types', [RecurringTypesController, 'index'])

router
  .group(() => {
    router.get('/wallets', [WalletsController, 'index'])
    router.post('/wallets', [WalletsController, 'store'])
    router.get('/wallets/:id', [WalletsController, 'show'])
    router.put('/wallets/:id', [WalletsController, 'update'])
    router.delete('/wallets/:id', [WalletsController, 'delete'])
  })
  .prefix('wallets')
  .as('wallets')
