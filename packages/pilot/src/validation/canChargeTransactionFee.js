
import {
  both,
  pathEq,
} from 'ramda'

import hasAnticipation from './hasAnticipation'

const canChargeTransactionFee = both(
  hasAnticipation,
  pathEq(['payment_link', 'allow_charge_transaction_fee'], true)
)

export default canChargeTransactionFee
