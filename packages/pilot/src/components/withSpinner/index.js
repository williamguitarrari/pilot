import React from 'react'
import classNames from 'classnames'
import withLoader from '../withLoader'
import Spinner from '../Spinner'
import style from './style.css'

const spinner = overlay => (
  <div className={classNames(overlay, style.spinner)}>
    <Spinner />
  </div>
)

const withSpinner = overlay => withLoader(spinner(overlay))

export default withSpinner
