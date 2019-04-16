import React from 'react'

import withLoader from '../withLoader'

import style from './style.css'

const spinner = overlay => (
  <div className={overlay}>
    <span className={style.spinner} />
  </div>
)

const withSpinner = overlay => withLoader(spinner(overlay))

export default withSpinner
