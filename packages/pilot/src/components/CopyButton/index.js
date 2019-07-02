import React from 'react'
import PropTypes from 'prop-types'
import IconCopy from 'emblematic-icons/svg/Copy32.svg'
import { Button } from 'former-kit'
import { merge } from 'ramda'

const mergeDefaultProps = merge({
  icon: <IconCopy height={16} width={16} />,
})

class CopyButton extends React.Component {
  constructor (props) {
    super(props)

    const { title } = props

    this.state = {
      text: title,
    }

    this.handleFeedback = this.handleFeedback.bind(this)
  }

  handleFeedback () {
    const {
      feedbackText,
      feedbackTimeout,
      onClick,
      title,
    } = this.props

    const {
      text,
    } = this.state

    if (text === title) {
      onClick()
      this.setState({
        text: feedbackText,
      }, () => setTimeout(() => {
        this.setState({
          text: title,
        })
      }, feedbackTimeout))
    }
  }

  render () {
    const {
      text,
    } = this.state
    const {
      feedbackText,
      feedbackTimeout,
      onClick,
      title,
      ...props
    } = this.props
    const mergedProps = mergeDefaultProps(props)

    return (
      <Button
        {...mergedProps}
        onClick={this.handleFeedback}
      >
        {text}
      </Button>
    )
  }
}

CopyButton.propTypes = {
  feedbackText: PropTypes.string.isRequired,
  feedbackTimeout: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default CopyButton
