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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/transaction-typologies', [TransactionTypologiesController, 'index'])
