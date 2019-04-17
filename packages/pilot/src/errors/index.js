import { flatten } from 'ramda'
import connection from './connection'
import sessions from './sessions'
import unauthorizedEnvironment from './unauthorizedEnvironment'
import transactions from './transactions'
import react from './react'

export default flatten([
  connection,
  sessions,
  unauthorizedEnvironment,
  transactions,
  react,
])
