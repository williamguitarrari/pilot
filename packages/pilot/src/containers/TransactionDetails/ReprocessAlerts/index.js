import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Alert,
  Col,
  Row,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import style from './style.css'

const ReprocessAlerts = ({
  nextTransactionId,
  onNextTransactionRedirect,
  onPreviousTransactionRedirect,
  reprocessLabels,
  transaction,
}) => {
  const nextId = transaction.nextId || nextTransactionId

  return (
    <Fragment>
      {(nextId && nextId !== transaction.id)
        && (
          <Row className={style.alertCustom}>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              <Alert
                action={reprocessLabels.showNext}
                icon={<IconInfo height={16} width={16} />}
                onDismiss={onNextTransactionRedirect}
                type="info"
              >
                <span className={style.reprocessAlertCustom}>
                  {reprocessLabels.nextAlert}
                  <strong> {nextId} </strong>
                </span>
              </Alert>
            </Col>
          </Row>
        )
      }
      {transaction.previousId
        && (
          <Row className={style.alertCustom}>
            <Col
              desk={12}
              tv={12}
              tablet={12}
              palm={12}
            >
              <Alert
                action={reprocessLabels.showPrevious}
                icon={<IconInfo height={16} width={16} />}
                onDismiss={onPreviousTransactionRedirect}
                type="info"
              >
                <span className={style.reprocessAlertCustom}>
                  {reprocessLabels.previousAlert}
                  <strong> {transaction.previousId} </strong>
                </span>
              </Alert>
            </Col>
          </Row>
        )
      }
    </Fragment>
  )
}

ReprocessAlerts.propTypes = {
  nextTransactionId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onNextTransactionRedirect: PropTypes.func,
  onPreviousTransactionRedirect: PropTypes.func,
  reprocessLabels: PropTypes.shape({
    nextAlert: PropTypes.string,
    previousAlert: PropTypes.string,
    showNext: PropTypes.string,
    showPrevious: PropTypes.string,
  }).isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    nextId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    previousId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
}

ReprocessAlerts.defaultProps = {
  nextTransactionId: null,
  onNextTransactionRedirect: null,
  onPreviousTransactionRedirect: null,
}

export default ReprocessAlerts
