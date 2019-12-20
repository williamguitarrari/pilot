import {
  has,
  ifElse,
  prop,
  uncurryN,
} from 'ramda'

import actions from './actions'
import reasons from './reasons'

const getPropOrUnknown = uncurryN(2, code => ifElse(
  has(code),
  prop(code),
  prop('unknown')
))

const refuseLabels = code => ({
  action: getPropOrUnknown(code, actions),
  code,
  reason: getPropOrUnknown(code, reasons),
})

export default refuseLabels
