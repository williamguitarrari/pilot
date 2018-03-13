import { combineReducers } from 'redux'

import account, { epic as accountEpic } from './Account/actions'
import transactions from './Transactions/actions'

export const rootEpic = accountEpic

export const rootReducer = combineReducers({
  account,
  transactions,
})
