import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import MosaicLive from './mosaic_live.svg'
import MosaicTest from './mosaic_test.svg'
import Home from './home.png'
import PencilBoy from './pencil_boy.svg'

import styles from './style.css'

const PresentationContainer = ({
  environment,
  t,
}) => {
  const isLive = environment === 'live'

  const Mosaic = isLive
    ? MosaicLive
    : MosaicTest

  return (
    <div className={classNames(
      styles.presentationSide,
      !isLive && styles.presentationSideTest
    )}
    >
      <div className={styles.presentationSideContent}>
        <Mosaic className={styles.mosaic} />
        <div className={classNames(
          styles.content,
          !isLive && styles.contentTest
        )}
        >
          {!isLive
            ? <PencilBoy />
            : <img src={Home} alt="Demostração da tela inicial" />
          }
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
    </div>
  )
}

PresentationContainer.propTypes = {
  environment: PropTypes.oneOf(['live', 'test']).isRequired,
  t: PropTypes.func.isRequired,
}

export default PresentationContainer
