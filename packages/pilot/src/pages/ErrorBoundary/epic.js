import { map } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { LOGOUT_RECEIVE } from '../Account/actions/actions'
import { clearAllErrors } from './actions'

const logoutClearEpic = action$ => action$
  .pipe(
    ofType(LOGOUT_RECEIVE),
    map(clearAllErrors)
  )

export default logoutClearEpic
