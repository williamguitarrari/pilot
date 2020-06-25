import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import copyToClipBoard from 'clipboard-copy'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import ClickableDiv from '../../components/ClickableDiv'
import styles from './styles.css'

const LinkCopyURL = ({ status, url }) => {
  const isLinkActive = status === 'active'
  const handleLink = (e) => {
    e.stopPropagation()
    copyToClipBoard(url)
  }
  const eventHandlers = {
    onClick: handleLink,
    onKeyPress: handleLink,
  }

  return (
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
      <IconCopy />
    </ClickableDiv>
  )
}

LinkCopyURL.propTypes = {
  status: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default LinkCopyURL
