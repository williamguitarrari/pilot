import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  Button,
} from 'former-kit'

import IconBack from 'emblematic-icons/svg/ChevronBack32.svg'

import styles from './style.css'

const PresentationContainer = ({
  environment,
  environmentUrl,
  redirectToRegister,
  shouldShowCopyright,
  t,
}) => (
  <div className={styles.secondaryContent}>
    <div>
      <h1 className={styles.title}>
        {t('landing.title')}
      </h1>
      <span className={styles.uppercase}>
        {t(`landing.${environment}.subtitle`)}

        {environment === 'test'
          && (
            <Fragment>
              &nbsp;
              <strong>{t('landing.test.subtitle_emphasis')}</strong>
              &nbsp;
              {t('landing.test.subtitle_company')}
            </Fragment>
          )
        }
      </span>
    </div>
    <div>
      <p className={styles.paragraph}>
        {t(`landing.${environment}.about_dashboard`)}
      </p>
      {environment === 'test'
        && (
          <p className={styles.paragraph}>
            {t('landing.test.sandbox_disclaimer')}
          </p>
        )
      }
    </div>
    <div className={classNames(styles.uppercase, styles.signInBlock)}>
      <p>
        <span>{t('landing.login_call')}</span>
        <span>
          {t('landing.signup_call')}
          &nbsp;
          <button
            className={styles.link}
            onClick={redirectToRegister}
            role="link"
            type="button"
          >
            {t('landing.signup_action')}
          </button>
        </span>
      </p>
    </div>
    <div className={styles.changeEnvironment}>
      {shouldShowCopyright
        && (
          <span className={styles.copyright}>
            <p>{t('copyright_group')}</p>
            <p>{t('copyright_company')}</p>
          </span>
        )
      }

      {!shouldShowCopyright && environment === 'test'
        && (
          <div>
            <a href={environmentUrl} className={styles.link}>
              <Button
                fill="outline"
                icon={<IconBack width={16} height={16} />}
              >
                {t('landing.test.back_button')}
              </Button>
            </a>
          </div>
        )
      }
    </div>
  </div>
)

PresentationContainer.propTypes = {
  environment: PropTypes.oneOf(['live', 'test']).isRequired,
  environmentUrl: PropTypes.string.isRequired,
  redirectToRegister: PropTypes.func.isRequired,
  shouldShowCopyright: PropTypes.bool,
  t: PropTypes.func.isRequired,
}

PresentationContainer.defaultProps = {
  shouldShowCopyright: true,
}

export default PresentationContainer
