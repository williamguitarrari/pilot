import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Flexbox } from 'former-kit'
import copyToClipBoard from 'clipboard-copy'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import styles from './styles.css'

const KeyLabelAndValue = ({ label, value }) => (
  <Flexbox
    className={styles.keyLabelAndValue}
    direction="column"
    justifyContent="center"
  >
    <div>{label}</div>
    <div
      className={classnames(styles.value, 'fs-block')}
      onClick={() => copyToClipBoard(value)}
      onKeyPress={() => copyToClipBoard(value)}
      role="button"
      tabIndex={0}
    >
      {value}
      <IconCopy width="16px" height="16px" />
    </div>
  </Flexbox>
)

KeyLabelAndValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default KeyLabelAndValue
