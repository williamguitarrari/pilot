import React, { PureComponent } from 'react'
import { Button } from 'former-kit'
import Loader from '../../../src/components/Loader'
import Section from '../../Section'
import style from './style.css'

class LoaderState extends PureComponent {
  constructor () {
    super()

    this.state = {
      showingLoader: false,
    }

    this.handleLoaderToggle = this.handleLoaderToggle.bind(this)
  }

  handleLoaderToggle () {
    const { showingLoader } = this.state

    this.setState({
      showingLoader: !showingLoader,
    })
  }

  render () {
    const { showingLoader } = this.state
    const buttonMessage = showingLoader
      ? 'hide loader'
      : 'show loader'

    return (
      <Section>
        <div className={style.container}>
          <Button
            onClick={this.handleLoaderToggle}
          >
            {buttonMessage}
          </Button>
          <Loader
            position="fixed"
            visible={showingLoader}
          />
        </div>
      </Section>
    )
  }
}

export default LoaderState
