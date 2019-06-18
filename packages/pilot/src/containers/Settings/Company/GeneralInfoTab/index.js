import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import { CardContent } from 'former-kit'

import ApiKey from './ApiKey'
import Pricing from './Pricing'
import Versions from './Versions'

const GeneralInfoTab = ({
  apiKeys,
  apiVersion,
  environment,
  onVersionChange,
  pricing,
  t,
  userIsReadOnly,
  versions,
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
        environment={environment}
        t={t}
      />
    </CardContent>

    {!userIsReadOnly &&
      <CardContent>
        <Versions
          current={apiVersion}
          environment={environment}
          options={versions}
          onVersionChange={onVersionChange}
          t={t}
          userIsReadOnly={userIsReadOnly}
        />
      </CardContent>
    }
  </Fragment>
)

GeneralInfoTab.propTypes = {
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  apiVersion: PropTypes.string,
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  onVersionChange: PropTypes.func.isRequired,
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
  userIsReadOnly: PropTypes.bool.isRequired,
  versions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
}

GeneralInfoTab.defaultProps = {
  apiKeys: null,
  apiVersion: null,
}

export default GeneralInfoTab
