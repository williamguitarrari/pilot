import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
} from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import withSpinner from '../../../src/components/withSpinner'

import style from './style.css'

const actionLoading = action('loading')

const withOverlayedSpinner = withSpinner(style.overlay)

const CardSample = ({ onClick, text }) => ( // eslint-disable-line react/prop-types
  <Card>
    <CardTitle title={<h2>Here we create a card wrapped by withSpinner</h2>} />
    <CardContent>
      The Card content can be anything. The loader will appear when the user
      click on loader action button bellow.
    </CardContent>
    <CardActions>
      <Button onClick={onClick}>
        { text }
      </Button>
    </CardActions>
  </Card>
)

const CardWithSpinner = withOverlayedSpinner(CardSample)

class CardExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ loading: true })
    actionLoading(true)

    setTimeout(() => {
      this.setState({ loading: false })
      actionLoading(false)
    }, 1000)
  }

  render () {
    const { loading } = this.state

    return (
      <Section title="With Spinner">
        <CardWithSpinner
          loading={loading}
          onClick={this.handleClick}
          text="load with spinner"
        />
      </Section>
    )
  }
}

export default CardExample
