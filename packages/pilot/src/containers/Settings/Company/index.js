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
      antifraud,
      apiKeys,
      apiVersion,
      bankAccountChangeActionDisabled,
      bankAccountSelected,
      bankAccountSelectedView,
      bankAccounts,
      bankActionsDisabled,
      bankData,
      bankErrors,
      boletoActionsDisabled,
      boletoDaysToAddInExpirationDate,
      boletoDisabled,
      boletoInstructions,
      boletoInstructionsOptions,
      createUserStatus,
      deleteUserStatus,
      environment,
      fees,
      general,
      handleCreateUser,
      handleDeleteUser,
      hiddenApiKey,
      isMDRzao,
      managingPartner,
      onBankAccountCancel,
      onBankAccountChange,
      onBankAccountCreate,
      onBankAccountSelect,
      onBoletoSettingsCancel,
      onBoletoSettingsChange,
      onBoletoSettingsSubmit,
      onVersionChange,
      resetCreateUserState,
      t,
      team,
      userIsReadOnly,
      versions,
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
        {selectedIndex === 0
          && (
            <GeneralInfoTab
              apiKeys={apiKeys}
              apiVersion={apiVersion}
              environment={environment}
              fees={fees}
              hiddenApiKey={hiddenApiKey}
              isMDRzao={isMDRzao}
              onVersionChange={onVersionChange}
              t={t}
              userIsReadOnly={userIsReadOnly}
              versions={versions}
            />
          )
        }
        {selectedIndex === 1
          && (
            <ProductInfoTab
              antifraud={antifraud}
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
          )
        }
        {selectedIndex === 2
          && (
            <TeamInfoTab
              createUserStatus={createUserStatus}
              deleteUserStatus={deleteUserStatus}
              handleCreateUser={handleCreateUser}
              handleDeleteUser={handleDeleteUser}
              resetCreateUserState={resetCreateUserState}
              t={t}
              team={team}
            />
          )
        }
        {selectedIndex === 3
          && (
            <RegisterInfoTab
              address={address}
              bankAccounts={bankAccounts}
              bankAccountActionsDisabled={bankActionsDisabled}
              bankAccountData={bankData}
              bankAccountErrors={bankErrors}
              bankAccountSelected={bankAccountSelected}
              bankAccountChangeActionDisabled={bankAccountChangeActionDisabled}
              bankAccountSelectedView={bankAccountSelectedView}
              general={general}
              managingPartner={managingPartner}
              onBankAccountCancel={onBankAccountCancel}
              onBankAccountChange={onBankAccountChange}
              onBankAccountCreate={onBankAccountCreate}
              onBankAccountSelect={onBankAccountSelect}
              t={t}
            />
          )
        }
      </Card>
    )
  }
}

const bankAccountShape = {
  agencia: PropTypes.string,
  agencia_dv: PropTypes.string,
  bank_code: PropTypes.string,
  conta: PropTypes.string,
  conta_dv: PropTypes.string,
  document_number: PropTypes.string,
  document_type: PropTypes.string,
  id: PropTypes.number,
  legal_name: PropTypes.string,
  type: PropTypes.string,
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
  antifraud: PropTypes.shape({
    fraud_covered: PropTypes.bool.isRequired,
  }).isRequired,
  apiKeys: PropTypes.shape({
    keys: PropTypes.shape({
      apiKey: PropTypes.string.isRequired,
      encryptionKey: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
  apiVersion: PropTypes.string,
  /* eslint-disable max-len, react/sort-prop-types */
  bankAccountChangeActionDisabled: PropTypes.bool.isRequired,
  bankAccounts: PropTypes.arrayOf(PropTypes.shape(bankAccountShape).isRequired).isRequired,
  bankAccountSelected: PropTypes.shape(bankAccountShape).isRequired,
  bankAccountSelectedView: PropTypes.oneOf([
    'addition',
    'selection',
  ]).isRequired,
  bankActionsDisabled: PropTypes.bool.isRequired,
  /* eslint-enable max-len, react/sort-prop-types */
  bankData: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    documentNumber: PropTypes.string.isRequired,
    legalName: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
  bankErrors: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    type: PropTypes.string,
  }),
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
  general: PropTypes.shape({
    cnpj: PropTypes.string,
    fullName: PropTypes.string,
    name: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  hiddenApiKey: PropTypes.bool.isRequired,
  isMDRzao: PropTypes.bool.isRequired,
  managingPartner: PropTypes.shape({
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onBankAccountCancel: PropTypes.func.isRequired,
  onBankAccountChange: PropTypes.func.isRequired,
  onBankAccountCreate: PropTypes.func.isRequired,
  onBankAccountSelect: PropTypes.func.isRequired,
  onBoletoSettingsCancel: PropTypes.func.isRequired,
  onBoletoSettingsChange: PropTypes.func.isRequired,
  onBoletoSettingsSubmit: PropTypes.func.isRequired,
  onVersionChange: PropTypes.func.isRequired,
  resetCreateUserState: PropTypes.func.isRequired,
  t: PropTypes.func,
  team: PropTypes.arrayOf(PropTypes.shape({
    date_created: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  userIsReadOnly: PropTypes.bool.isRequired,
  versions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
}

CompanySettings.defaultProps = {
  apiKeys: null,
  apiVersion: null,
  bankData: {
    account: '',
    accountCd: '',
    agency: '',
    agencyCd: '',
    bankCode: '',
    type: '',
  },
  bankErrors: null,
  boletoDaysToAddInExpirationDate: null,
  boletoInstructions: null,
  t: t => t,
}

export default CompanySettings
