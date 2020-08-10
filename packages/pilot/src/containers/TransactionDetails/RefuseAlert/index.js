import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { isNil } from 'ramda'
import {
  Alert,
  Col,
  Row,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/InfoCircle32.svg'
import style from './style.css'

import getRefuseLabel from '../../../models/refuseLabels'

const RefuseAlert = ({
  acquirer,
  status,
  statusReason,
  t,
}) => {
  const refuseCode = acquirer.response_code
  const emptyRefuseCode = '0000'

  const refuseLabels = statusReason === 'acquirer'
    ? getRefuseLabel(refuseCode)
    : getRefuseLabel(statusReason)

  return (
    <Fragment>
      {(status === 'refused')
        && (
          <Row className={style.alertCustom}>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              <Alert
                icon={<IconInfo height={16} width={16} />}
                type="error"
              >
                <span className={style.refuseAlertCustom}>
                  <b>{t('pages.transaction.refuse_reason')}</b>
                  {refuseCode !== emptyRefuseCode
                    && !isNil(refuseCode)
                    && (
                      <span className={style.refuseCode}>
                        {refuseCode}
                      </span>
                    )
                  }
                  {t(refuseLabels.reason)} {t(refuseLabels.action)}
                </span>
              </Alert>
            </Col>
          </Row>
        )
      }
    </Fragment>
  )
}

RefuseAlert.propTypes = {
  acquirer: PropTypes.shape({
    response_code: PropTypes.string,
  }).isRequired,
  status: PropTypes.string.isRequired,
  statusReason: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default RefuseAlert
