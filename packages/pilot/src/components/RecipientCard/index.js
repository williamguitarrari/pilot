import React from 'react'
import PropTypes from 'prop-types'

import { join } from 'ramda'
import {
  CardContent,
  Legend,
} from 'former-kit'

import numberFormat from '../../formatters/decimalCurrency'
import legendStatus from '../../models/statusLegends'
import style from './style.css'

const RecipientCard = ({
  liabilities,
  liabilitiesLabel,
  name,
  netAmount,
  netAmountLabel,
  outAmountLabel,
  status,
  statusLabel,
  totalAmount,
  totalLabel,
}) => (
  <CardContent>
    <div className={style.recipient}>
      <div>
        <span className={style.title}>{name}</span>
        <span>{`${liabilitiesLabel}: ${join(', ', liabilities)}`}</span>

        <div>
          <span className={style.statusLabel}>{statusLabel}</span>
          <Legend
            color={legendStatus[status].color}
            acronym={legendStatus[status].acronym}
            hideLabel
          >
            {legendStatus[status].text}
          </Legend>
        </div>
      </div>

      <div>
        <div className={style.description}>
          <span>{totalLabel}</span>
          <span>{outAmountLabel}</span>
          <span>{netAmountLabel}</span>
        </div>

        <div>
          <strong className={style.total}>{numberFormat(totalAmount)}</strong>
          <strong>{numberFormat(netAmount - totalAmount)}</strong>
          <strong>{numberFormat(netAmount)}</strong>
        </div>
      </div>
    </div>
  </CardContent>
)

RecipientCard.propTypes = {
  liabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  liabilitiesLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  netAmount: PropTypes.number.isRequired,
  netAmountLabel: PropTypes.string,
  outAmountLabel: PropTypes.string,
  status: PropTypes.string.isRequired,
  statusLabel: PropTypes.string,
  totalAmount: PropTypes.number.isRequired,
  totalLabel: PropTypes.string,
}

RecipientCard.defaultProps = {
  liabilitiesLabel: '',
  netAmountLabel: '',
  outAmountLabel: '',
  statusLabel: '',
  totalLabel: '',
}

export default RecipientCard
