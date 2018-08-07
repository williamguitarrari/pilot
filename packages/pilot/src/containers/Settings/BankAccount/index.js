import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  SegmentedSwitch,
  Spacing,
} from 'former-kit'
import IconWithdraw from 'emblematic-icons/svg/Withdraw32.svg'
import BankAccountForm from './Add'
import BankAccountSelector from './Selector'

class BankAccount extends Component {
  constructor () {
    super()

    this.state = {
      collapsed: true,
      selected: 'selection',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
    this.renderSubtitle = this.renderSubtitle.bind(this)
  }

  handleChange (selected) {
    this.setState({
      selected,
    })
  }

  handleCollapse () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  renderSubtitle (account) {
    const { t } = this.props

    const textMainAccount = t('pages.settings.company.register.bank.subtitles.main_account')
    const textAgency = t('pages.settings.company.register.bank.subtitles.agency')
    const textAccount = t('pages.settings.company.register.bank.subtitles.account')
    const bankName = t(`models.bank_code.${account.bank_code}`)

    return (
      <Fragment>
        {`${textMainAccount} ${account.legal_name}`}
        <Spacing size="large" />
        {`${bankName} | `}
        {`${textAgency}: ${account.agencia}-${account.agencia_dv} | `}
        {`${textAccount}: ${account.conta}-${account.conta_dv}`}
      </Fragment>
    )
  }

  render () {
    const {
      collapsed,
      selected,
    } = this.state

    const {
      accounts,
      data,
      disabled,
      errors,
      onAccountSelect,
      onCancel,
      onChange,
      onSubmit,
      selectedAccount,
      t,
    } = this.props

    const viewAddAccount = selected === 'addition'
    const viewSelectAccount = selected === 'selection'

    return (
      <Card>
        <CardSection>
          <CardSectionDoubleLineTitle
            collapsed={collapsed}
            icon={<IconWithdraw width={16} height={16} />}
            onClick={this.handleCollapse}
            subtitle={this.renderSubtitle(selectedAccount)}
            title={t('pages.settings.company.register.title.bank')}
          />
          {!collapsed &&
            <Fragment>
              <CardContent>
                <SegmentedSwitch
                  name="select"
                  onChange={this.handleChange}
                  options={[
                    {
                      title: t('pages.settings.company.register.title.select'),
                      value: 'selection',
                    },
                    {
                      title: t('pages.settings.company.register.title.add'),
                      value: 'addition',
                    },
                  ]}
                  value={selected}
                />
              </CardContent>

              {viewSelectAccount &&
                <BankAccountSelector
                  accounts={accounts}
                  onSelect={onAccountSelect}
                  selectedAccountId={selectedAccount.id}
                  t={t}
                />
              }

              {viewAddAccount &&
                <BankAccountForm
                  actionsDisabled={disabled}
                  data={data}
                  errors={errors}
                  onChange={onChange}
                  onCancel={onCancel}
                  onSubmit={onSubmit}
                  t={t}
                />
              }
            </Fragment>
          }
        </CardSection>
      </Card>
    )
  }
}

const accountShape = {
  agencia: PropTypes.string.isRequired,
  agencia_dv: PropTypes.string,
  bank_code: PropTypes.string.isRequired,
  conta: PropTypes.string.isRequired,
  conta_dv: PropTypes.string.isRequired,
  document_number: PropTypes.string.isRequired,
  document_type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  legal_name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

BankAccount.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape(accountShape)).isRequired,
  data: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    documentNumber: PropTypes.string.isRequired,
    legalName: PropTypes.string.isRequired,
    type: PropTypes.string,
  }),
  disabled: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    account: PropTypes.string,
    accountCd: PropTypes.string,
    agency: PropTypes.string,
    agencyCd: PropTypes.string,
    bankCode: PropTypes.string,
    type: PropTypes.string,
  }),
  onAccountSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedAccount: PropTypes.shape(accountShape).isRequired,
  t: PropTypes.func.isRequired,
}

BankAccount.defaultProps = {
  data: {
    account: '',
    accountCd: '',
    agency: '',
    agencyCd: '',
    bankCode: '',
    type: '',
  },
  errors: null,
}

export default BankAccount
