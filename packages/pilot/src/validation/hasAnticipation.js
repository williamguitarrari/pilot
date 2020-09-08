import { pathEq } from 'ramda'

const hasAnticipation = pathEq(['capabilities', 'allow_transaction_anticipation'], true)

export default hasAnticipation
