
import React, { cloneElement, Component } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'
import PropTypes from 'prop-types'
import {
  curry,
  identity,
  ifElse,
  is,
  mapObjIndexed,
  uncurryN,
} from 'ramda'

const applySpring = curry((springPreset, val) =>
  spring(val, springPreset || presets.noWobble))

const applySpringIfNumber = springOptions => ifElse(
  is(Number),
  applySpring(springOptions),
  identity
)

const ensureSpring = uncurryN(
  2,
  springOptions => mapObjIndexed(applySpringIfNumber(springOptions))
)

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
        data: this.props.children,
        key: this.props.children.key,
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
        data: this.props.children,
        key: this.props.children.key,
        style: ensureSpring(this.props.springOptions, this.props.atActive),
      },
    ]
  }

  willEnter () {
    return this.props.atEnter
  }

  willLeave () {
    return ensureSpring(this.props.springOptions, this.props.atLeave)
  }

  didLeave (styleThatLeft) {
    if (this.props.didLeave) {
      this.props.didLeave(styleThatLeft)
    }
  }

  renderChild (config) {
    const props = {
      key: config.key,
      style: this.props.mapStyles(config.style),
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
  /* eslint-disable react/forbid-prop-types */
  atActive: PropTypes.object.isRequired,
  atEnter: PropTypes.object.isRequired,
  atLeave: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /* eslint-enable react/forbid-prop-types */
  didLeave: PropTypes.func,
  mapStyles: PropTypes.func,
  runOnMount: PropTypes.bool,
  springOptions: PropTypes.shape({
    damping: PropTypes.number,
    precision: PropTypes.number,
    stiffness: PropTypes.number,
  }),
}

Transition.defaultProps = {
  className: '',
  didLeave: identity,
  mapStyles: identity,
  runOnMount: false,
  springOptions: presets.noWobble,
}

export default Transition
