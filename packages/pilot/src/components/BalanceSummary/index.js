import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { keys } from 'ramda'
import {
  CardContent,
  CardSection,
} from 'former-kit'
import IconForward from 'emblematic-icons/svg/ArrowForward24.svg'

import TotalDisplay from '../TotalDisplay'

import style from './style.css'

const renderDate = date => (
  <div className={style.date}>
    <h3>{date.format('DD')}</h3>
    <div>
      <strong>{date.format('MMMM')} {date.year()}</strong>
      <span>{date.format('dddd')}</span>
    </div>
  </div>
)

const colors = {
  net: '#4ca9d7',
  outcoming: '#37cc9a',
  outgoing: '#ff796f',
}

const BalanceSummary = ({ amount, dates }) => (
  <CardSection>
    <CardContent>
      <div className={style.content}>
        <div className={style.dates}>
          { renderDate(dates.start) }
          <IconForward className={style.icon} />
          { renderDate(dates.end) }
        </div>
        <div className={style.amount}>
          {
            keys(amount).map(type => (
              <TotalDisplay
                amount={amount[type].value}
                color={colors[type]}
                key={type}
                title={amount[type].title}
                unit={amount[type].unit}
              />
            ))
          }
        </div>
      </div>
    </CardContent>
  </CardSection>
)

const totalShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.number,
})

BalanceSummary.propTypes = {
  amount: PropTypes.shape({
    net: totalShape.isRequired,
    outcoming: totalShape.isRequired,
    outgoing: totalShape.isRequired,
  }).isRequired,
  dates: PropTypes.shape({
    end: PropTypes.instanceOf(moment).isRequired,
    start: PropTypes.instanceOf(moment).isRequired,
  }).isRequired,
}

export default BalanceSummary
