import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Presentation from '../../containers/Account/Presentation'
import environment from '../../environment'

const PresentationPage = ({
  t,
}) => (
  <Presentation
    environment={environment}
    t={t}
  />
)

PresentationPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(PresentationPage)
