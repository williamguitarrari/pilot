import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { is } from 'ramda'
import { Card as FormerCard } from 'former-kit'
import styles from './styles.css'

const isFunction = is(Function)

const Card = ({ children, className, onSubmit }) => {
  const card = (
    <FormerCard className={classNames(styles.card, className)}>
      {children}
    </FormerCard>
  )

  if (!isFunction(onSubmit)) {
    return card
  }

  return (
    <div
      className={styles.clickableCard}
      onClick={onSubmit}
      onKeyPress={onSubmit}
      role="button"
      tabIndex="0"
    >
      {card}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
}

Card.defaultProps = {
  className: '',
  onSubmit: null,
}

export default Card
