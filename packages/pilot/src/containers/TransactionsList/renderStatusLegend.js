import React, { Fragment } from 'react'
import {
  Legend,
  Spacing,
  Tooltip,
} from 'former-kit'
import HelpInfo from 'emblematic-icons/svg/Help32.svg'

import style from './style.css'

import status from '../../models/statusLegends'
import refuse from '../../models/refuseLabels'

const getActionOrIMSG = ({ refuseLabels, t }) => {
  if (refuseLabels.code === 'IMSG') {
    return (
      <Fragment>
        {t('refuse.action.imsg_error_1')}
        <a
          href={t('refuse.action.imsg_error_link')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('refuse.action.imsg_error_2')}
        </a>
      </Fragment>
    )
  }
  return t(refuseLabels.action)
}

const getRefuseLabels = (item) => {
  if (item.status === 'fraud_reimbursed') {
    return refuse('fraud_reimbursed')
  }

  return item.status_reason === 'acquirer'
    ? refuse(item.acquirer.response_code)
    : refuse(item.status_reason)
}

const isStatusRefused = transactionStatus => transactionStatus === 'refused'

const getTransactionStatus = isRefusedTransaction => (isRefusedTransaction
  ? 'refuse'
  : 'fraud_reimbursed'
)

const renderContentTooltip = (item, t) => {
  const refuseLabels = getRefuseLabels(item)
  const isRefusedTransaction = isStatusRefused(item.status)
  const transactionStatus = getTransactionStatus(isRefusedTransaction)

  return (
    <div className={style.tooltip}>
      <p className={style.title}>{t(`${transactionStatus}.title`)}</p>
      <div className={style.description}>
        <div className={style.descriptionTitle}>
          { item.status_reason === 'acquirer' && isRefusedTransaction
            && (
              <span className={style.responseCode}>
                {refuseLabels.code}
              </span>
            )
          }
          <span>
            {t(refuseLabels.reason)}
          </span>
        </div>
        <p>
          {getActionOrIMSG({ refuseLabels, t })}
        </p>
      </div>
    </div>
  )
}

const renderStatusLegend = t => item => (
  <div className={style.centralizedItem}>
    {(item.status === 'refused' || item.status === 'fraud_reimbursed')
      && <Spacing size="medium" />
    }
    <Legend
      acronym={status[item.status].text}
      color={status[item.status].color}
      hideLabel
      textColor={status[item.status].textColor}
      textFormat="capitalize"
    >
      {status[item.status].text}
    </Legend>
    {(item.status === 'refused' || item.status === 'fraud_reimbursed')
      && (
        <Tooltip
          content={renderContentTooltip(item, t)}
          placement="rightMiddle"
        >
          <HelpInfo
            className={style.helpIcon}
            color={status[item.status].color}
            height={16}
            width={16}
          />
        </Tooltip>
      )
    }
  </div>
)

export default renderStatusLegend
