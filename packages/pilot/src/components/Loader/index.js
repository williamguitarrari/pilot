import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.css'
import Transition from '../Transition'
import Spinner from '../Spinner'

const createOverlayStyle = (opaqueBackground, position) => classNames(
  style.opaqueBackground,
  style.overlay,
  { [style[position]]: true }
)

const Loader = ({
  opaqueBackground,
  position,
  visible,
}) => (
  <Transition
    atActive={{
      opacity: 1,
      zIndex: 100,
    }}
    atEnter={{
      opacity: 0.3,
      zIndex: 100,
    }}
    atLeave={{
      opacity: 0,
      zIndex: -1,
    }}
    className={style.overlay}
    springOptions={{
      damping: 26,
      precision: 0.01,
      stiffness: 170,
    }}
  >
    {visible
      && (
        <div
          className={classNames(createOverlayStyle(
            opaqueBackground, position
          ), style.spinner)}
          key="overlay"
        >
          <Spinner />
        </div>
      )
    }
  </Transition>
)

Loader.propTypes = {
  opaqueBackground: PropTypes.bool,
  position: PropTypes.oneOf(['fixed', 'absolute', 'relative']),
  visible: PropTypes.bool,
}

Loader.defaultProps = {
  opaqueBackground: false,
  position: 'fixed',
  visible: false,
}

export default Loader
