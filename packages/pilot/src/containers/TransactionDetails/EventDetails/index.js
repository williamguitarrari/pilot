import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import moment from 'moment-timezone'

import currencyFormatter from '../../../formatters/currency'
import RiskLevel from '../../../components/RiskLevel'
import style from './style.css'

/* eslint-disable camelcase */
const EventDetails = ({
  boleto,
  fraudReimbursed,
  id,
  legendStatus,
  operation,
  payment,
  riskLevel,
  t,
}) => {
  const {
    authorized_amount,
    paid_amount,
  } = payment

  const {
    created_at,
    status,
    type,
  } = operation

  const date = moment(created_at)
  const authorizedAmount = currencyFormatter(Math.abs(authorized_amount))
  const paidAmount = currencyFormatter(Math.abs(paid_amount))

  return (
    <section className={style.eventContent}>
      <div className={style.eventDescription}>
        {fraudReimbursed === true
          && (
            <p className={style.fraudReimbursed}>
              {t('fraud_reimbursed.action')}
            </p>
          )
        }
        <p>
          {legendStatus.status}
        </p>
        <p>
          {
            `${date.format('L')} ${t('at')} ${date.format('HH:mm')}`
          }
        </p>
        {(type === 'capture' || type === 'conciliate' || fraudReimbursed)
          && status === 'success'
          && (
            <p>
              {t('pages.transaction.events.value')}
              <b>{paidAmount}</b>
            </p>
          )
        }
      </div>
      {type === 'analyze'
        && status !== 'refused'
        && riskLevel !== 'unknown'
        && (
          <Fragment>
            <p className={style.riskLevelTitle}>{t(`pages.transaction.risk_level.${riskLevel}`)}</p>
            <RiskLevel level={riskLevel} />
          </Fragment>
        )
      }
      {type === 'authorize'
        && status === 'success'
        && (
          <Fragment>
            {isNil(boleto)
              && (
                <p>
                  {t('pages.transaction.events.value')}
                  <b>{authorizedAmount}</b>
                </p>
              )
            }
            <p>
              {t('pages.transaction.events.tid')}{id}
            </p>
          </Fragment>
        )
      }
    </section>
  )
}
/* eslint-enable camelcase */

EventDetails.propTypes = {
  boleto: PropTypes.shape({
    barcode: PropTypes.string,
    due_date: PropTypes.instanceOf(moment),
    url: PropTypes.string,
  }),
  fraudReimbursed: PropTypes.bool,
  id: PropTypes.number,
  legendStatus: PropTypes.shape({
    status: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  operation: PropTypes.shape({
    status: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  payment: PropTypes.shape({
    authorized_amount: PropTypes.number,
    paid_amount: PropTypes.number,
  }).isRequired,
  riskLevel: PropTypes.string,
  t: PropTypes.func.isRequired,
}

EventDetails.defaultProps = {
  boleto: null,
  fraudReimbursed: null,
  id: null,
  riskLevel: 'unknown',
}

export default EventDetails
