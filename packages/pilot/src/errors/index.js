import { flatten } from 'ramda'
import connection from './connection'
import sessions from './sessions'
import unauthorizedEnvironment from './unauthorizedEnvironment'

export default flatten([
  connection,
  sessions,
  unauthorizedEnvironment,
])
