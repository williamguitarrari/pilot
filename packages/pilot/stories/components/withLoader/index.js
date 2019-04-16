import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
} from 'former-kit'
import { action } from '@storybook/addon-actions'
import ContentLoader from 'react-content-loader'

import Section from '../../Section'
import withLoader from '../../../src/components/withLoader'
import style from './style.css'

const actionLoading = action('loading')

const Skeleton = (
  <ContentLoader
    speed={2}
    primaryColor="#f9f9f9"
    secondaryColor="#ecebeb"
    className={style.overlay}
    style={{ backgroundColor: '#ffffff' }}
  >
    <rect x={8} y={16} rx="2" ry="2" width="60%" height="20" />
    <rect x={8} y={55} rx="2" ry="2" width="90%" height="10" />
  </ContentLoader>
)

const withSkeleton = withLoader(Skeleton)

const CardSample = ({ onClick, text }) => ( // eslint-disable-line react/prop-types
  <Card>
    <CardTitle title={<h2>Here we create a card wrapped by withLoader</h2>} />
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

const CardWithSkeleton = withSkeleton(CardSample)

class CardExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loadingSkeleton: false,
    }

    this.handleClickSkeleton = this.handleClickSkeleton.bind(this)
  }

  handleClickSkeleton () {
    this.setState({ loadingSkeleton: true })
    actionLoading(true)

    setTimeout(() => {
      this.setState({ loadingSkeleton: false })
      actionLoading(false)
    }, 2000)
  }

  render () {
    return (
      <Section title="With Loader">
        <CardWithSkeleton
          loading={this.state.loadingSkeleton}
          onClick={this.handleClickSkeleton}
          text="load with skeleton"
        />
      </Section>
    )
  }
}

export default CardExample
