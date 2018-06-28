import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import account, { epic as accountEpic } from './Account/actions'
import balance from './Balance'
import anticipation, { epic as anticipationEpic } from './Anticipation'
import { reducers as transactionsReducers } from './Transactions'
import { reducers as recipientsReducers } from './Recipients'

export const rootEpic = combineEpics(accountEpic, anticipationEpic)

export const rootReducer = combineReducers({
  account,
  anticipation,
  balance,
  recipients: recipientsReducers.search,
  transactionDetails: transactionsReducers.details,
  transactions: transactionsReducers.search,
})
