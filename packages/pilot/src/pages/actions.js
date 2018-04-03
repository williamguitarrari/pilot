import { combineReducers } from 'redux'

import account, { epic as accountEpic } from './Account/actions'
import { reducers as transactionsReducers } from './Transactions'

export const rootEpic = accountEpic

export const rootReducer = combineReducers({
  account,
  transactionDetails: transactionsReducers.details,
  transactions: transactionsReducers.search,
})
