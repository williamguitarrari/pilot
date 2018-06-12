import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import { CardContent } from 'former-kit'

import ApiKey from './ApiKey'
import Pricing from './Pricing'

const GeneralInfoTab = ({
  apiKeys,
  pricing,
  t,
}) => (
  <Fragment>
    <CardContent>
      <Pricing
        pricing={pricing}
        t={t}
      />
    </CardContent>

    <CardContent>
      <ApiKey
        apiKeys={apiKeys}
        t={t}
      />
    </CardContent>
  </Fragment>
)

GeneralInfoTab.propTypes = {
  apiKeys: PropTypes.arrayOf(
    PropTypes.shape({
      keys: PropTypes.shape({
        apiKey: PropTypes.string,
        encryptionKey: PropTypes.string,
      }),
      title: PropTypes.string,
    })
  ).isRequired,
  pricing: PropTypes.arrayOf(PropTypes.shape({
    mainTitle: PropTypes.string.isRequired,
    subItems: PropTypes.arrayOf(PropTypes.shape({
      prices: PropTypes.arrayOf(PropTypes.shape({
        unit: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })).isRequired,
      title: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
}

export default GeneralInfoTab
