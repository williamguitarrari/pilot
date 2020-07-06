import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Flexbox } from 'former-kit'
import copyToClipBoard from 'clipboard-copy'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import ClickableDiv from '../../../components/ClickableDiv'
import styles from './styles.css'

const LabelledValue = ({ label, value }) => (
  <Flexbox
    className={styles.labelledValue}
    direction="column"
    justifyContent="center"
  >
    <div>{label}</div>
    <ClickableDiv
      className={classnames(styles.value, 'fs-block')}
      onClick={() => copyToClipBoard(value)}
      onKeyPress={() => copyToClipBoard(value)}
    >
      {value}
      <IconCopy width="16px" height="16px" />
    </ClickableDiv>
  </Flexbox>
)

LabelledValue.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default LabelledValue
