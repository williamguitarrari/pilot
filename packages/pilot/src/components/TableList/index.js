import React from 'react'
import { omit } from 'ramda'
import { Table } from 'former-kit'

import withSpinner from '../withSpinner'

import style from './style.css'

const enhance = withSpinner(style.overlay)

const TableList = props => (
  <Table {...omit(['loading'], props)} />
)

export default enhance(TableList)
