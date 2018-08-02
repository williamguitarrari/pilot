
import React, { cloneElement, Component } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'
import PropTypes from 'prop-types'
import { identity } from 'ramda'

const applySpring = (val, springPreset) =>
  spring(val, springPreset || presets.noWobble)

const ensureSpring = (styles, springOptions) =>
  Object.keys(styles).reduce((acc, key) => {
    const value = styles[key]
    acc[key] = typeof value === 'number' ? applySpring(value, springOptions) : value
    return acc
  }, {})

class Transition extends Component {
  constructor () {
    super()

    this.didLeave = this.didLeave.bind(this)
    this.getDefaultStyles = this.getDefaultStyles.bind(this)
    this.getStyles = this.getStyles.bind(this)
    this.renderChild = this.renderChild.bind(this)
    this.renderChildren = this.renderChildren.bind(this)
    this.willEnter = this.willEnter.bind(this)
    this.willLeave = this.willLeave.bind(this)
  }

  getDefaultStyles () {
    if (!this.props.runOnMount) {
      return null
    }

    if (!this.props.children) {
      return []
    }

    return [
      {
        key: this.props.children.key,
        data: this.props.children,
        style: this.props.atEnter,
      },
    ]
  }

  getStyles () {
    if (!this.props.children) {
      return []
    }
    return [
      {
        key: this.props.children.key,
        data: this.props.children,
        style: ensureSpring(this.props.atActive, this.props.springOptions),
      },
    ]
  }

  willEnter () {
    return this.props.atEnter
  }

  willLeave () {
    return ensureSpring(this.props.atLeave, this.props.springOptions)
  }

  didLeave (styleThatLeft) {
    if (this.props.didLeave) {
      this.props.didLeave(styleThatLeft)
    }
  }

  renderChild (config) {
    const props = {
      style: this.props.mapStyles(config.style),
      key: config.key,
    }

    return cloneElement(config.data, props)
  }

  renderChildren (interpolatedStyles) {
    return (
      <div className={this.props.className}>
        {interpolatedStyles.map(this.renderChild)}
      </div>
    )
  }

  render () {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        didLeave={this.didLeave}
      >
        {this.renderChildren}
      </TransitionMotion>
    )
  }
}

Transition.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /* eslint-disable react/forbid-prop-types */
  atEnter: PropTypes.object.isRequired,
  atActive: PropTypes.object.isRequired,
  atLeave: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  didLeave: PropTypes.func,
  mapStyles: PropTypes.func,
  runOnMount: PropTypes.bool,
  springOptions: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
    precision: PropTypes.number,
  }),
}

Transition.defaultProps = {
  className: '',
  didLeave: identity,
  runOnMount: false,
  mapStyles: identity,
  springOptions: presets.noWobble,
}

export default Transition
