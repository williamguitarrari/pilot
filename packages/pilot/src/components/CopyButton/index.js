import React from 'react'
import PropTypes from 'prop-types'

class CopyButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      text: this.props.title,
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

    if (onClick()) {
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

    return (
      this.props.children({
        onClick: this.handleFeedback,
        title: text,
      })
    )
  }
}

CopyButton.propTypes = {
  children: PropTypes.func.isRequired,
  feedbackText: PropTypes.string.isRequired,
  feedbackTimeout: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default CopyButton
