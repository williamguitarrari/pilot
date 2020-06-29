import React from 'react'
import { compose } from 'ramda'
import { withError } from '../../ErrorBoundary'

const enhanced = compose(
  withError
)

const Details = () => <div>Eduardo</div>

export default enhanced(Details)
