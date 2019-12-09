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

const renderContentTooltip = (item, t) => {
  const refuseLabels = item.status_reason === 'acquirer'
    ? refuse(item.acquirer.response_code)
    : refuse(item.status_reason)

  return (
    <div className={style.tooltip}>
      <p className={style.title}>{t('refuse.title')}</p>
      <div className={style.description}>
        <div className={style.descriptionTitle}>
          { item.status_reason === 'acquirer'
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
    {item.status === 'refused'
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
    {item.status === 'refused'
      && (
        <Tooltip
          content={renderContentTooltip(item, t)}
          placement="rightMiddle"
        >
          <HelpInfo
            className={style.helpIcon}
            color="#ea5656"
            height={16}
            width={16}
          />
        </Tooltip>
      )
    }
  </div>
)

export default renderStatusLegend
