import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info32.svg'

import CompanyGeneralForm from './CompanyGeneralForm'

class CompanyInformation extends React.Component {
  constructor (props) {
    super(props)

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)

    this.state = {
      collapsed: true,
    }
  }

  handleSectionTitleClick () {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
    }))
  }

  render () {
    const {
      general,
      t,
    } = this.props
    const { collapsed } = this.state

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={collapsed}
          icon={<IconInfo height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={t('pages.settings.company.card.register.subtitle.company')}
          title={t('pages.settings.company.card.register.title.company')}
        />
        {!collapsed && (
          <CardContent>
            <CompanyGeneralForm t={t} general={general} />
          </CardContent>
        )}
      </CardSection>
    )
  }
}

CompanyInformation.propTypes = {
  general: PropTypes.shape({
    cnpj: PropTypes.string,
    fullName: PropTypes.string,
    name: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default CompanyInformation
