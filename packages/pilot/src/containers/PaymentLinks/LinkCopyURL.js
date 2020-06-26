import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Tooltip } from 'former-kit'
import copyToClipBoard from 'clipboard-copy'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import IconCheck from 'emblematic-icons/svg/Check24.svg'
import ClickableDiv from '../../components/ClickableDiv'
import styles from './styles.css'

const LinkCopyURL = ({ status, t, url }) => {
  const [isCopied, setIsCopied] = useState(false)

  const isLinkActive = status === 'active'
  const handleLink = (e) => {
    setIsCopied(true)
    e.stopPropagation()
    copyToClipBoard(url)

    setTimeout(() => setIsCopied(false), 1000)
  }

  const eventHandlers = {
    onClick: handleLink,
    onKeyPress: handleLink,
  }

  return (
    <Tooltip
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      placement="topCenter"
      content={t('copied')}
      visible={isCopied}
    >
      <ClickableDiv
        className={
            classNames(
              styles.link,
              { [styles['link--active']]: isLinkActive }
            )
          }
        {...(isLinkActive ? eventHandlers : {})}
      >
        { url }
        {isCopied
          ? <IconCheck />
          : <IconCopy />
        }
      </ClickableDiv>
    </Tooltip>
  )
}

LinkCopyURL.propTypes = {
  status: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
}

export default LinkCopyURL
