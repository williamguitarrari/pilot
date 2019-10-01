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
  allowReprocessWithoutAntifraud,
  onBack,
  onReprocess,
  t,
}) => {
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')

  const buttons = allowReprocessWithoutAntifraud
    ? t('pages.reprocess.confirm_without_antifraud_step_submit')
    : t('pages.reprocess.confirm_with_antifraud_step_submit')

  const handleSubmit = () => {
    const submitAllowed = (allowReprocessWithoutAntifraud && accepted)
    || !allowReprocessWithoutAntifraud

    if (submitAllowed) {
      return onReprocess()
    }

    return setError(t('confirm_agreement_required'))
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
                content={t('pages.reprocess.confirm_with_antifraud_text')}
                icon={<WarningIcon height={32} width={32} />}
                title={t('pages.reprocess.confirm_with_antifraud_title')}
                type="warning"
              />
              {allowReprocessWithoutAntifraud
                && (
                  <Fragment>
                    <div className={styles.withoutAntifraudAlert}>
                      <DescriptionAlert
                        content={t('pages.reprocess.confirm_without_antifraud_text')}
                        icon={<WarningIcon height={32} width={32} />}
                        title={t('pages.reprocess.confirm_without_antifraud_title')}
                        type="error"
                      />
                    </div>
                    <FormCheckbox
                      label={t('pages.reprocess.confirm_without_antifraud_checkbox')}
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
            fill="outline"
            onClick={onBack}
            type="button"
          >
            {t('pages.reprocess.go_back')}
          </Button>
          <Button
            fill="gradient"
            type="button"
            onClick={handleSubmit}
          >
            {buttons}
          </Button>
        </ModalActions>
      </div>
    </Fragment>
  )
}

Confirmation.propTypes = {
  allowReprocessWithoutAntifraud: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  onReprocess: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

Confirmation.defaultProps = {
  allowReprocessWithoutAntifraud: false,
}

export default Confirmation
