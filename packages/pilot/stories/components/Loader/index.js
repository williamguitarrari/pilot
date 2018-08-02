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
    this.setState({
      showingLoader: !this.state.showingLoader,
    })
  }

  render () {
    const buttonMessage = this.state.showingLoader
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
            label="Loading"
            position="fixed"
            text="Loading..."
            visible={this.state.showingLoader}
          />
        </div>
      </Section>
    )
  }
}

export default LoaderState
