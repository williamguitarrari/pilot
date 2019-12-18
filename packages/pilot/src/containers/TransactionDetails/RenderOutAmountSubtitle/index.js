import React from 'react'
import PropTypes from 'prop-types'

import {
  Flexbox,
  Tooltip,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import style from './style.css'

const RenderOutAmountSubTitle = ({
  payment,
  tooltipLabels,
  totalDisplayLabels,
}) => (
  <div className={style.subtitle}>
    <Flexbox>
      {totalDisplayLabels.mdr
        && (
          <p className={style.mdr}>
            {totalDisplayLabels.mdr}
          </p>
        )
      }
      {payment.refund_amount > 0
        && (
          <span className={style.refund}>
            {totalDisplayLabels.refund}
          </span>
        )
      }
    </Flexbox>
    {totalDisplayLabels.cost && payment.method !== 'boleto'
      && (
        <Flexbox className={style.processCost}>
          <span>
            {totalDisplayLabels.cost}
          </span>
          <Tooltip
            className={style.tooltip}
            content={(
              <div className={style.content}>
                <p className={style.title}>{tooltipLabels.title}</p>
                <p className={style.description}>
                  {tooltipLabels.description}
                </p>
              </div>
            )}
            placement="bottomEnd"
          >
            <IconInfo
              className={style.iconInfo}
              color="#7052c8"
              height={12}
              width={12}
            />
          </Tooltip>
        </Flexbox>
      )
    }
  </div>
)

RenderOutAmountSubTitle.propTypes = {
  payment: PropTypes.shape({
    barcode: PropTypes.string,
  }).isRequired,
  tooltipLabels: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  totalDisplayLabels: PropTypes.shape({
    captured_at: PropTypes.string,
    cost: PropTypes.string,
    mdr: PropTypes.string,
    net_amount: PropTypes.string,
    out_amount: PropTypes.string,
    paid_amount: PropTypes.string,
    receive_date: PropTypes.string,
    refund: PropTypes.string,
  }).isRequired,
}

export default RenderOutAmountSubTitle
