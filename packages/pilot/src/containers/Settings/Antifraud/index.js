import PropTypes from 'prop-types'
import React, { useState } from 'react'

import {
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconShield from 'emblematic-icons/svg/Shield32.svg'

const Antifraud = ({ t }) => {
  const [collapsed, setCollapsed] = useState(true)

  const renderContent = () => (
    <CardContent>
      <p>
        <strong>{t('pages.settings.company.antifraud.fraud_coverage.title')}</strong>
      </p>

      <p>{t('pages.settings.company.antifraud.fraud_coverage.description')}</p>
    </CardContent>
  )

  return (
    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={collapsed}
          icon={<IconShield width={16} height={16} />}
          onClick={() => setCollapsed(!collapsed)}
          title={t('pages.settings.company.antifraud.title')}
          subtitle={t('pages.settings.company.antifraud.subtitle.fraud_coverage_enabled')}
        />

        {!collapsed && renderContent()}
      </CardSection>
    </CardContent>
  )
}

Antifraud.propTypes = {
  t: PropTypes.func.isRequired,
}

export default Antifraud
