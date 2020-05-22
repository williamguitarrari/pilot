import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.css'
import Transition from '../Transition'
import Spinner from '../Spinner'

const createOverlayStyle = position => classNames(
  style.highZIndex,
  style.overlay,
  style[position]
)

const Loader = ({
  position,
  visible,
}) => (
  <Transition
    atActive={{
      opacity: 1,
      zIndex: 10,
    }}
    atEnter={{
      opacity: 0.3,
      zIndex: 10,
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
          className={classNames(createOverlayStyle(position), style.spinner)}
          key="overlay"
        >
          <Spinner />
        </div>
      )
    }
  </Transition>
)

Loader.propTypes = {
  position: PropTypes.oneOf(['fixed', 'absolute', 'relative']),
  visible: PropTypes.bool,
}

Loader.defaultProps = {
  position: 'fixed',
  visible: false,
}

export default Loader
