import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Button,
  Flexbox,
  Spacing,
} from 'former-kit'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import Check from 'emblematic-icons/svg/Check24.svg'

import style from './style.css'

const CopyText = ({
  className,
  copyIcon,
  onCopy,
  text,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)

    onCopy(text)
  }

  const currentIcon = copied
    ? <Check width={12} height={12} />
    : <IconCopy width={12} height={12} />

  return (
    <Flexbox
      className={classNames(style.copyText, className)}
      alignItems="center"
    >
      {text}
      <Spacing size="tiny" />
      <Button
        fill="clean"
        size="tiny"
        icon={copyIcon || currentIcon}
        onClick={handleCopy}
      />
    </Flexbox>
  )
}

CopyText.propTypes = {
  className: PropTypes.string,
  copyIcon: PropTypes.node,
  onCopy: PropTypes.func.isRequired,
  strings: PropTypes.shape({
    copied: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.node.isRequired,
}

CopyText.defaultProps = {
  className: null,
  copyIcon: null,
}

export default CopyText
