import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

class Recipients extends Component {
  constructor (props) {
    super(props)

    this.state = {
      test: 'oi',
    }
  }

  render () {
    return <div>{this.state.test}</div>
  }
}

export default Recipients
