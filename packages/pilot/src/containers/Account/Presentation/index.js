import React from 'react'
import PropTypes from 'prop-types'

import Mosaic from './mosaic.svg'

import styles from '../style.css'
import localStyle from './style.css'

const PresentationContainer = ({
  environment,
  t,
}) => (
  <div className={styles.presentationSideContent}>
    <Mosaic className={localStyle.mosaic} />
    <div className={localStyle.content}>
      <img src="https://i.imgur.com/nhnSMeZ.png" alt="Demostração da tela inicial" />
      <div>
        <h1>
          {t(`landing.${environment}.about_title`)}
        </h1>
        <p>
          {t(`landing.${environment}.about_dashboard`)}
        </p>
      </div>
    </div>
  </div>
)

PresentationContainer.propTypes = {
  environment: PropTypes.oneOf(['live', 'test']).isRequired,
  t: PropTypes.func.isRequired,
}

export default PresentationContainer
