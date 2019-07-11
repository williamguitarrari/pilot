
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

const applySpring = curry((springPreset, val) => spring(
  val, springPreset || presets.noWobble
))

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
    const {
      atEnter,
      children,
      runOnMount,
    } = this.props

    if (!runOnMount) {
      return null
    }

    if (!children) {
      return []
    }

    return [
      {
        data: children,
        key: children.key,
        style: atEnter,
      },
    ]
  }

  getStyles () {
    const {
      atActive,
      children,
      springOptions,
    } = this.props

    if (!children) {
      return []
    }

    return [
      {
        data: children,
        key: children.key,
        style: ensureSpring(springOptions, atActive),
      },
    ]
  }

  willEnter () {
    const { atEnter } = this.props
    return atEnter
  }

  willLeave () {
    const {
      atLeave,
      springOptions,
    } = this.props

    return ensureSpring(springOptions, atLeave)
  }

  didLeave (styleThatLeft) {
    const {
      didLeave,
    } = this.props

    if (didLeave) {
      didLeave(styleThatLeft)
    }
  }

  renderChild (config) {
    const { mapStyles } = this.props

    const props = {
      key: config.key,
      style: mapStyles(config.style),
    }

    return cloneElement(config.data, props)
  }

  renderChildren (interpolatedStyles) {
    const { className } = this.props

    return (
      <div className={className}>
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
