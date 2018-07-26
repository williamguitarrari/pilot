import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  TabBar,
  TabItem,
} from 'former-kit'

import GeneralInfoTab from './GeneralInfoTab'
import ProductInfoTab from './ProductInfoTab'
import RegisterInfoTab from './RegisterInfoTab'
import TeamInfoTab from './TeamInfoTab'

class CompanySettings extends Component {
  constructor (props) {
    super(props)
    this.state = { selectedIndex: 0 }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selectedIndex) {
    this.setState({ selectedIndex })
  }

  render () {
    const {
      address,
      apiKeys,
      apiVersion,
      boletoActionsDisabled,
      boletoDaysToAddInExpirationDate,
      boletoDisabled,
      boletoInstructions,
      boletoInstructionsOptions,
      createUserStatus,
      deleteUserStatus,
      environment,
      general,
      handleCreateUser,
      handleDeleteUser,
      managingPartner,
      onBoletoSettingsCancel,
      onBoletoSettingsChange,
      onBoletoSettingsSubmit,
      pricing,
      resetCreateUserState,
      t,
      team,
    } = this.props

    const {
      selectedIndex,
    } = this.state

    return (
      <Card>
        <CardContent>
          <TabBar
            onTabChange={this.changeTab}
            selected={selectedIndex}
            variant="just-text"
          >
            <TabItem text={t('pages.settings.company.tab.general')} />
            <TabItem text={t('pages.settings.company.tab.products')} />
            <TabItem text={t('pages.settings.company.tab.team')} />
            <TabItem text={t('pages.settings.company.tab.register')} />
          </TabBar>
        </CardContent>
        {selectedIndex === 0 &&
          <GeneralInfoTab
            apiKeys={apiKeys}
            apiVersion={apiVersion}
            environment={environment}
            pricing={pricing}
            t={t}
          />
        }
        {selectedIndex === 1 &&
          <ProductInfoTab
            boletoActionsDisabled={boletoActionsDisabled}
            boletoDaysToAddInExpirationDate={boletoDaysToAddInExpirationDate}
            boletoDisabled={boletoDisabled}
            boletoHandleCancel={onBoletoSettingsCancel}
            boletoHandleChange={onBoletoSettingsChange}
            boletoHandleSubmit={onBoletoSettingsSubmit}
            boletoInstructions={boletoInstructions}
            boletoInstructionsOptions={boletoInstructionsOptions}
            t={t}
          />
        }
        {selectedIndex === 2 &&
          <TeamInfoTab
            createUserStatus={createUserStatus}
            deleteUserStatus={deleteUserStatus}
            handleCreateUser={handleCreateUser}
            handleDeleteUser={handleDeleteUser}
            resetCreateUserState={resetCreateUserState}
            t={t}
            team={team}
          />
        }
        {selectedIndex === 3 &&
          <RegisterInfoTab
            address={address}
            general={general}
            managingPartner={managingPartner}
            t={t}
          />
        }
      </Card>
    )
  }
}

CompanySettings.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string,
    complementary: PropTypes.string,
    neighborhood: PropTypes.string,
    state: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
    zipcode: PropTypes.string,
  }).isRequired,
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  apiVersion: PropTypes.string,
  boletoActionsDisabled: PropTypes.bool.isRequired,
  boletoDaysToAddInExpirationDate: PropTypes.string,
  boletoDisabled: PropTypes.bool.isRequired,
  boletoInstructions: PropTypes.string,
  boletoInstructionsOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  createUserStatus: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  deleteUserStatus: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  general: PropTypes.shape({
    name: PropTypes.string,
    fullName: PropTypes.string,
    cnpj: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  resetCreateUserState: PropTypes.func.isRequired,
  managingPartner: PropTypes.shape({
    name: PropTypes.string,
    cpf: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onBoletoSettingsCancel: PropTypes.func.isRequired,
  onBoletoSettingsChange: PropTypes.func.isRequired,
  onBoletoSettingsSubmit: PropTypes.func.isRequired,
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
  t: PropTypes.func,
  team: PropTypes.arrayOf(PropTypes.shape({
    date_created: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
}

CompanySettings.defaultProps = {
  apiKeys: null,
  apiVersion: null,
  boletoDaysToAddInExpirationDate: null,
  boletoInstructions: null,
  t: t => t,
}

export default CompanySettings
