import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info32.svg'

import CompanyAccountManagerForm from './CompanyAccountManagerForm'

class CompanyInformation extends React.Component {
  constructor (props) {
    super(props)

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)

    this.state = {
      collapsed: true,
    }
  }

  handleSectionTitleClick () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    const {
      managingPartner,
      t,
    } = this.props

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={this.state.collapsed}
          icon={<IconInfo height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={t('settings.company.card.register.subtitle.managingPartner')}
          title={t('settings.company.card.register.title.managingPartner')}
        />
        {!this.state.collapsed && (
          <CardContent>
            <CompanyAccountManagerForm t={t} managingPartner={managingPartner} />
          </CardContent>
        )}
      </CardSection>
    )
  }
}

CompanyInformation.propTypes = {
  t: PropTypes.func.isRequired,
  managingPartner: PropTypes.shape({
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

export default CompanyInformation
