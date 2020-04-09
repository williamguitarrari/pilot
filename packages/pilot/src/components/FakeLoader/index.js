import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Flexbox } from 'former-kit'
import Spinner from '../Spinner'
import styles from './styles.css'

const FakeLoader = ({ runAfterLoader, t }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const finalStep = 3

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep >= finalStep) {
        return runAfterLoader()
      }

      return setCurrentStep(currentStep + 1)
    }, 1500)

    return () => clearInterval(interval)
  })

  return (
    <Flexbox
      alignItems="center"
      className={styles.fakeLoader}
      direction="column"
      justifyContent="center"
    >
      <Spinner />
      <h1>{t('components.fake_loader.title')}</h1>
      <div>
        <span>
          {t('components.fake_loader.steps_info', { currentStep, finalStep })}
        </span>
        <span>
          {t(`components.fake_loader.step_${currentStep}`)}
        </span>
      </div>
    </Flexbox>
  )
}

FakeLoader.propTypes = {
  runAfterLoader: PropTypes.func,
  t: PropTypes.func.isRequired,
}

FakeLoader.defaultProps = {
  runAfterLoader: () => {},
}

export default FakeLoader
