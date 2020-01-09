import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button } from 'former-kit'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'

import style from './style.css'

const ApiKey = ({
  apiKey,
  copyLabel,
  onCopy,
  title,
}) => (
  <div>
    <div className={style.title}>
      <strong>{title}</strong>
      <Button
        fill="clean"
        size="tiny"
        icon={<IconCopy width="12px" height="12px" />}
        onClick={() => onCopy(apiKey)}
      >
        {copyLabel}
      </Button>
    </div>
    <div className={classnames(style.content, 'fs-block')}>
      {apiKey}
    </div>
  </div>
)

ApiKey.propTypes = {
  apiKey: PropTypes.string.isRequired,
  copyLabel: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default ApiKey
