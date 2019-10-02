import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  FormCheckbox,
  Grid,
  ModalActions,
  ModalContent,
  Row,
} from 'former-kit'

import WarningIcon from 'emblematic-icons/svg/Warning32.svg'
import DescriptionAlert from '../../../components/DescriptionAlert'

import styles from './style.css'

const Confirmation = ({
  isReprocessingWithoutAntifraud,
  loading,
  onBack,
  onReprocess,
  t,
}) => {
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')

  let buttonText = t('pages.reprocess.confirm')

  buttonText = isReprocessingWithoutAntifraud
    ? t('pages.reprocess.confirm_without_antifraud')
    : t('pages.reprocess.confirm_with_antifraud')

  const handleSubmit = () => {
    const submitAllowed = (allowReprocessWithoutAntifraud && accepted)
      || !allowReprocessWithoutAntifraud

    if (submitAllowed) {
      return onReprocess()
    }

    return setError(t('pages.reprocess.confirm_agreement_required'))
  }

  useEffect(() => {
    if (accepted) {
      setError('')
    }
  }, [accepted, setError])

  return (
    <Fragment>
      <ModalContent>
        <Grid>
          <Row stretch flex>
            <Col palm={12} tablet={12} desk={12} tv={12}>
              <div className={styles.title}>
                <strong>
                  {t('pages.reprocess.confirm_question')}
                </strong>
              </div>
              <DescriptionAlert
                content={t('pages.reprocess.confirm_with_antifraud_disclaimer')}
                icon={<WarningIcon height={32} width={32} />}
                title={t('pages.reprocess.confirm_with_antifraud_disclaimer_title')}
                type="warning"
              />
              {isReprocessingWithoutAntifraud
                && (
                  <Fragment>
                    <div className={styles.withoutAntifraudAlert}>
                      <DescriptionAlert
                        content={t('pages.reprocess.confirm_without_antifraud_disclaimer')}
                        icon={<WarningIcon height={32} width={32} />}
                        title={t('pages.reprocess.confirm_without_antifraud_disclaimer_title')}
                        type="error"
                      />
                    </div>
                    <FormCheckbox
                      disabled={loading}
                      label={t('pages.reprocess.confirm_without_antifraud_agreement')}
                      name="acceptTerms"
                      onChange={() => setAccepted(!accepted)}
                      error={error}
                      checked={accepted}
                      value="acceptTerms"
                    />
                  </Fragment>
                )
              }
            </Col>
          </Row>
        </Grid>
      </ModalContent>
      <div>
        <ModalActions>
          <Button
            disabled={loading}
            fill="outline"
            onClick={onBack}
            type="button"
          >
            {t('pages.reprocess.go_back')}
          </Button>
          <Button
            disabled={loading}
            fill="gradient"
            type="button"
            loading={loading}
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        </ModalActions>
      </div>
    </Fragment>
  )
}

Confirmation.propTypes = {
  isReprocessingWithoutAntifraud: PropTypes.bool,
  loading: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  onReprocess: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

Confirmation.defaultProps = {
  isReprocessingWithoutAntifraud: false,
  loading: false,
}

export default Confirmation
