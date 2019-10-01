import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardTitle,
  Col,
  Grid,
  ModalActions,
  ModalContent,
  Row,
  Tooltip,
  Truncate,
} from 'former-kit'
import {
  equals,
  find,
} from 'ramda'
import WarningIcon from 'emblematic-icons/svg/Warning32.svg'

import formatCurrency from '../../../formatters/currency'
import ReprocessDetails from '../../../components/ReprocessDetails'
import DescriptionAlert from '../../../components/DescriptionAlert'

import styles from './style.css'

const WithoutAntifraudButton = ({
  allowReprocessWithoutAntifraud,
  disableWithoutAntifraudReprocess,
  lockReason,
  onReprocessWithoutAntifraud,
  t,
}) => (
  <Fragment>
    { allowReprocessWithoutAntifraud && disableWithoutAntifraudReprocess
      && (
        <Tooltip
          content={t(`pages.reprocess.without_antifraud_requirements.${lockReason}`)}
          placement="topStart"
        >
          <Button
            disabled={disableWithoutAntifraudReprocess}
            fill="outline"
            onClick={onReprocessWithoutAntifraud}
          >
            {t('pages.reprocess.reprocess_without_antifraud')}
          </Button>
        </Tooltip>
      )
    }
    { allowReprocessWithoutAntifraud && !disableWithoutAntifraudReprocess
      && (
        <Button
          disabled={disableWithoutAntifraudReprocess}
          fill="outline"
          onClick={onReprocessWithoutAntifraud}
        >
          {t('pages.reprocess.reprocess_without_antifraud')}
        </Button>
      )
    }
  </Fragment>
)

const getFormattedTransaction = ({
  amount,
  holderName,
  transactionId,
}) => ({
  amount: (
    <span className={styles.numericValue}>
      {formatCurrency(amount)}
    </span>
  ),
  holderName: (
    <span className={styles.holderName}>
      <Truncate text={holderName} />
    </span>
  ),
  transactionId: (
    <span className={styles.numericValue}>
      #{transactionId}
    </span>
  ),
})

const ReprocessForm = ({
  allowReprocessWithoutAntifraud,
  amount,
  disableWithoutAntifraudReprocess,
  holderName,
  loading,
  lockReason,
  onReprocessWithAntifraud,
  onReprocessWithoutAntifraud,
  t,
  transactionId,
}) => (
  <Fragment>
    <ModalContent>
      <Grid>
        <Row stretch>
          <CardTitle
            className={styles.title}
            title={
              allowReprocessWithoutAntifraud
                ? t('pages.reprocess.type_selection')
                : t('pages.reprocess.action_confirm')
            }
          />
        </Row>
        <Row stretch>
          <Col palm={12} tablet={12} desk={12} tv={12}>
            <ReprocessDetails
              contents={getFormattedTransaction({
                amount,
                holderName,
                transactionId,
              })}
              labels={{
                amount: t('amount'),
                holderName: t('holder_name'),
                transactionId: t('transaction'),
              }}
            />
          </Col>
        </Row>
        {allowReprocessWithoutAntifraud
          && (
            <Row flex>
              <Col className={styles.alertColumn}>
                <DescriptionAlert
                  content={(
                    <span>
                      {t('pages.reprocess.without_antifraud_disclaimer_1')}
                      <b>{t('pages.reprocess.without_antifraud_disclaimer_2')}</b>
                      {t('pages.reprocess.without_antifraud_disclaimer_3')}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={t('pages.reprocess.without_antifraud_documentation_link')}
                      >
                        {t('pages.reprocess.without_antifraud_disclaimer_4')}
                      </a>
                    </span>
                  )}
                  icon={<WarningIcon />}
                  title={t('attention')}
                  type="error"
                />
              </Col>
            </Row>
          )
        }
      </Grid>
    </ModalContent>
    <div className={styles.actions}>
      <ModalActions>
        <WithoutAntifraudButton
          allowReprocessWithoutAntifraud={allowReprocessWithoutAntifraud}
          disableWithoutAntifraudReprocess={disableWithoutAntifraudReprocess}
          lockReason={lockReason}
          onReprocessWithoutAntifraud={onReprocessWithoutAntifraud}
          t={t}
        />
        <Button
          disabled={loading}
          fill="gradient"
          onClick={onReprocessWithAntifraud}
        >
          {allowReprocessWithoutAntifraud
            ? t('pages.reprocess.reprocess_with_antifraud')
            : t('pages.reprocess.reprocess')
          }
        </Button>
      </ModalActions>
    </div>
  </Fragment>
)

const lockReasonValidation = (props, propName, componentName) => {
  const oneOf = [
    'chargeback_rate',
    'multiple_reprocess',
    'time_limit',
  ]

  const {
    disableWithoutAntifraudReprocess,
    lockReason,
  } = props

  const errorMessage = message => `Invalid prop '${propName}' supplied to ${componentName}. ${message}`

  if (disableWithoutAntifraudReprocess && !lockReason) {
    return new Error(errorMessage('It should be supplied when \'disableWithoutAntifraudReprocess\' is true'))
  }

  if (lockReason && !find(equals(lockReason), oneOf)) {
    return new Error(errorMessage(`It should be one of [${oneOf.join(', ')}]`))
  }

  return null
}

WithoutAntifraudButton.propTypes = {
  allowReprocessWithoutAntifraud: PropTypes.bool.isRequired,
  disableWithoutAntifraudReprocess: PropTypes.bool.isRequired,
  lockReason: lockReasonValidation,
  onReprocessWithoutAntifraud: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

WithoutAntifraudButton.defaultProps = {
  lockReason: null,
}

ReprocessForm.propTypes = {
  allowReprocessWithoutAntifraud: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  disableWithoutAntifraudReprocess: PropTypes.bool,
  holderName: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  lockReason: lockReasonValidation,
  onReprocessWithAntifraud: PropTypes.func.isRequired,
  onReprocessWithoutAntifraud: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  transactionId: PropTypes.number.isRequired,
}

ReprocessForm.defaultProps = {
  disableWithoutAntifraudReprocess: false,
  loading: false,
  lockReason: null,
}

export default ReprocessForm
