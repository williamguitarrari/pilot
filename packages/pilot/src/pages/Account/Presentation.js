import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'

import Presentation from '../../containers/Account/Presentation'

import environment, {
  liveUrl,
  testUrl,
} from '../../environment'

const enhanced = compose(
  translate(),
  withRouter
)

const changeEnvironmentUrl = () => (
  environment === 'test'
    ? liveUrl
    : testUrl
)

const PresentationPage = ({ t }) => (
  <Presentation
    environment={environment}
    environmentUrl={changeEnvironmentUrl()}
    t={t}
  />
)

PresentationPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(PresentationPage)
