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
  fees,
  hiddenApiKey,
  isMDRzao,
  onVersionChange,
  t,
  userIsReadOnly,
  versions,
}) => (
  <Fragment>
    <CardContent>
      <Pricing
        fees={fees}
        isMDRzao={isMDRzao}
        t={t}
      />
    </CardContent>

    {!hiddenApiKey
      && (
        <CardContent>
          <ApiKey
            apiKeys={apiKeys}
            environment={environment}
            t={t}
          />
        </CardContent>
      )
    }

    {!userIsReadOnly && !hiddenApiKey
      && (
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
      )
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
  fees: PropTypes.shape({
    anticipation: PropTypes.number,
    antifraud: PropTypes.number,
    boleto: PropTypes.number,
    gateway: PropTypes.number,
    installments: PropTypes.arrayOf(PropTypes.shape({
      installment: PropTypes.number.isRequired,
      mdr: PropTypes.number.isRequired,
    })),
    transfer: PropTypes.number,
  }).isRequired,
  hiddenApiKey: PropTypes.bool.isRequired,
  isMDRzao: PropTypes.bool.isRequired,
  onVersionChange: PropTypes.func.isRequired,
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
