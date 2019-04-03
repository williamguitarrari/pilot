import { flatten } from 'ramda'
import connection from './connection'
import sessions from './sessions'

export default flatten([
  connection,
  sessions,
])
