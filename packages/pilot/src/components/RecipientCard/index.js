import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { join } from 'ramda'
import {
  CardContent,
  Col,
  Grid,
  Legend,
  Row,
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
      <Grid >
        <Row
          flex
          className={style.row}
        >
          <Col
            align="start"
            className={style.description}
          >
            <span className={style.title}>{name}</span>
          </Col>
          <Col
            align="end"
            className={style.summary}
          >
            <span>
              {totalLabel}
            </span>
            <span className={classNames(
                style.total,
                style.amount
              )}
            >
              {numberFormat(totalAmount)}
            </span>
          </Col>
        </Row>
        <Row
          flex
          className={style.row}
        >
          <Col
            align="start"
            className={style.description}
          >
            { `${liabilitiesLabel}: ${join(', ', liabilities)}` }
          </Col>
          <Col
            align="end"
            className={style.summary}
          >
            <span>
              {outAmountLabel}
            </span>
            <span className={style.amount}>
              { numberFormat(netAmount - totalAmount) }
            </span>
          </Col>
        </Row>
        <Row
          flex
          className={style.row}
        >
          <Col
            align="start"
            className={style.description}
          >
            <span className={style.statusLabel}>{statusLabel}</span>
            <Legend
              color={legendStatus[status].color}
              acronym={legendStatus[status].acronym}
              hideLabel
            >
              {legendStatus[status].text}
            </Legend>
          </Col>
          <Col
            align="end"
            className={style.summary}
          >
            <span>
              {netAmountLabel}
            </span>
            <span className={style.amount}>
              { numberFormat(netAmount) }
            </span>
          </Col>
        </Row>
      </Grid>
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
