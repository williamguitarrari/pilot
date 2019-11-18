import React from 'react'
import { Legend } from 'former-kit'

import style from './style.css'

import status from '../../models/statusLegends'

const renderStatusLegend = item => (
  <div className={style.centralizedItem}>
    <Legend
      acronym={status[item.status].text}
      color={status[item.status].color}
      hideLabel
      textColor={status[item.status].textColor}
    >
      {status[item.status].text}
    </Legend>
  </div>
)

export default renderStatusLegend
