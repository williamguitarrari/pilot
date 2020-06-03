import {
  always,
  anyPass,
  applySpec,
  equals,
  find,
  merge,
  not,
  path,
  pathOr,
  pluck,
  pipe,
  prop,
  propEq,
  when,
} from 'ramda'

import {
  ACCOUNT_RECEIVE,
  COMPANY_RECEIVE,
  LOGIN_FAIL,
  LOGIN_RECEIVE,
  LOGIN_REQUEST,
  LOGOUT_RECEIVE,
  RECIPIENT_BALANCE_RECEIVE,
} from './actions'

import environment from '../../../environment'

const getBalance = applySpec({
  available: path(['withdrawal', 'maximum']),
  waitingFunds: path(['balance', 'waiting_funds', 'amount']),
})

const initialState = {
  loading: false,
  sessionId: null,
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_RECEIVE: {
      return merge(state, {
        error: null,
        user: action.payload,
      })
    }

    case COMPANY_RECEIVE: {
      return merge(state, {
        company: action.payload,
        error: null,
        loading: false,
      })
    }

    case LOGIN_REQUEST: {
      return merge(state, {
        error: null,
        loading: true,
        user: null,
      })
    }
    case LOGIN_FAIL: {
      return merge(
        state,
        {
          client: null,
          error: action.payload,
          loading: false,
          sessionId: null,
          user: null,
        }
      )
    }
    case LOGIN_RECEIVE: {
      return merge(
        state,
        {
          client: action.payload,
          error: null,
          loading: false,
          sessionId: action.payload.authentication.session_id,
        }
      )
    }

    case LOGOUT_RECEIVE: {
      return initialState
    }

    case RECIPIENT_BALANCE_RECEIVE: {
      return merge(
        state,
        {
          balance: getBalance(action.payload),
        }
      )
    }

    default:
      return state
  }
}

const getAntifraudCost = pipe(
  pathOr([], ['gateway', environment, 'antifraud_cost']),
  find(propEq('name', 'pagarme')),
  prop('cost')
)

const notDefaultInstallments = pipe(
  pluck('installment'),
  anyPass([equals([1, 2, 7]), equals([1])]),
  not
)

const getInstallmentsFee = pipe(
  pathOr([], ['psp', environment, 'mdrs']),
  find(propEq('payment_method', 'credit_card')),
  pathOr([], ['installments']),
  when(notDefaultInstallments, always([]))
)

const getFees = pipe(
  prop('pricing'),
  applySpec({
    anticipation: path(['psp', environment, 'anticipation']),
    antifraud: getAntifraudCost,
    boleto: path(['gateway', environment, 'boletos', 'payment_fixed_fee']),
    gateway: path(['gateway', environment, 'transaction_cost', 'credit_card']),
    installments: getInstallmentsFee,
    transfer: path(['transfers', 'ted']),
  })
)

export const selectCompanyFees = company => getFees(company)
