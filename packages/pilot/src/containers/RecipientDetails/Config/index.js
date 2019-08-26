import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Spacing } from 'former-kit'

import AnticipationIcon from 'emblematic-icons/svg/Undo32.svg'
import TransferIcon from 'emblematic-icons/svg/Transaction32.svg'
import BackAccountIcon from 'emblematic-icons/svg/BankAccount32.svg'
import AnticipationContent from './AnticipationContent'
import TransferContent from './TransferContent'
import BankAccountContent from './BankAccountContent'
import RecipientItem from './RecipientItem'
import HelpModal from './HelpModal'

import {
  userAccountProps,
  userAccountDefaultProps,
} from '../../AddRecipient/BankAccountStep'

import style from './style.css'

class RecipientDetailConfig extends Component {
  constructor (props) {
    super(props)
    const { anticipation, transfer } = this.props
    this.state = {
      anticipation,
      expanded: {},
      openedModal: false,
      transfer,
    }

    this.handleCollapse = this.handleCollapse.bind(this)
    this.handleChangeAnticipation = this.handleChangeAnticipation.bind(this)
    this.handleChangeTransfer = this.handleChangeTransfer.bind(this)
    this.toggleChangeTransfer = this.toggleChangeTransfer.bind(this)
    this.renderAnticipationSub = this.renderAnticipationSub.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onSaveAnticipation = this.onSaveAnticipation.bind(this)
    this.onSaveTransfer = this.onSaveTransfer.bind(this)
    this.onSaveBankAccount = this.onSaveBankAccount.bind(this)
    this.handleOpenHelpModal = this.handleOpenHelpModal.bind(this)
    this.handleCloseHelpModal = this.handleCloseHelpModal.bind(this)
  }

  onSaveAnticipation (data, errors) {
    const { onSaveAnticipation } = this.props

    if (!errors) {
      onSaveAnticipation(
        data,
        this.setState({
          expanded: {},
        })
      )
    }
  }

  onSaveTransfer (data) {
    const { onSaveTransfer } = this.props
    onSaveTransfer(
      data,
      this.setState({
        expanded: {},
      })
    )
  }

  onSaveBankAccount (data) {
    const { onSaveBankAccount } = this.props
    onSaveBankAccount(
      data,
      this.setState({
        expanded: {},
      })
    )
  }

  handleChangeAnticipation (anticipation) {
    this.setState({
      anticipation,
    })
  }

  handleChangeTransfer (transfer) {
    this.setState({
      transfer,
    })
  }

  handleCancel () {
    const { anticipation, transfer } = this.props
    this.setState({
      anticipation,
      expanded: {},
      transfer,
    })
  }

  toggleChangeTransfer () {
    const { transfer } = this.state
    this.setState({
      transfer: {
        ...transfer,
        transferEnabled: !transfer.transferEnabled,
      },
    })
  }

  handleCollapse (id) {
    const { expanded } = this.state
    this.setState({
      expanded: {
        [id]: !expanded[id],
      },
    })
  }

  handleOpenHelpModal () {
    this.setState({ openedModal: true })
  }

  handleCloseHelpModal () {
    this.setState({ openedModal: false })
  }

  renderAnticipationSub () {
    const {
      anticipation,
      t,
    } = this.props
    const model = t('pages.add_recipient.anticipation_model')
    const volume = t('pages.add_recipient.anticipation_volume')
    const anticipationManual = t('pages.add_recipient.manual_volume')
    const anticipationVolume = t('pages.add_recipient.automatic_volume')
    const anticipation1025 = t('pages.add_recipient.automatic_1025')
    const anticipationDx = t('pages.add_recipient.automatic_dx')
    const HelpButton = (
      <Button
        type="button"
        size="tiny"
        fill="outline"
        onClick={this.handleOpenHelpModal}
      >
        {t('pages.recipient_detail.help')}
      </Button>
    )

    if (anticipation.anticipationModel === 'manual') {
      return (
        <div className={style.alignItems}>
          {`${model}: ${anticipationManual}`}
          <Spacing size="large" />
          {`${volume}: ${anticipation.anticipationVolumePercentage}%`}
          <Spacing size="large" />
          {HelpButton}
        </div>
      )
    }
    if (anticipation.anticipationModel === 'automatic_volume') {
      return (
        <div className={style.alignItems}>
          {`${model}: ${anticipationVolume}`}
          <Spacing size="large" />
          {`${volume}: ${anticipation.anticipationVolumePercentage}%`}
          <Spacing size="large" />
          {HelpButton}
        </div>
      )
    }
    if (anticipation.anticipationModel === 'automatic_1025') {
      return (
        <div className={style.alignItems}>
          {`${model}: ${anticipation1025}`}
          <Spacing size="large" />
          {HelpButton}
        </div>
      )
    }
    if (anticipation.anticipationModel === 'automatic_dx') {
      return (
        <div className={style.alignItems}>
          {`${model}: ${anticipationDx}`}
          <Spacing size="large" />
          {HelpButton}
        </div>
      )
    }
    return null
  }

  renderTransferSub () {
    const {
      t,
      transfer,
    } = this.props
    const transferSub = t('pages.add_recipient.automatic_transfer')
    if (transfer.transferEnabled === true) {
      return (
        `${transferSub}: ${t('pages.recipient_detail.enabled')}`
      )
    }
    return (
      `${transferSub}: ${t('pages.recipient_detail.disabled')}`
    )
  }

  renderBankAccountSub () {
    const {
      accounts,
      bankAccount,
    } = this.props

    if (!bankAccount.id) {
      bankAccount.id = accounts[0].id
    }

    const selectedAccount = accounts.find(account => (
      account.id === bankAccount.id
    )) || {}

    const agency = (selectedAccount.agency_digit)
      ? `${selectedAccount.agency}-${selectedAccount.agency_digit}`
      : selectedAccount.agency

    const number = `${selectedAccount.number}-${selectedAccount.number_digit}`

    return `${selectedAccount.name} - ${selectedAccount.bank} - ${agency} - ${number}`
  }

  render () {
    const {
      accounts,
      bankAccount,
      t,
    } = this.props

    const {
      anticipation,
      expanded,
      openedModal,
      transfer,
    } = this.state

    return (
      <Fragment>
        <RecipientItem
          title={t('pages.recipient_detail.anticipation')}
          subtitle={this.renderAnticipationSub()}
          icon={<AnticipationIcon width={16} height={16} />}
          isOpen={expanded.anticipation}
          onClick={this.handleCollapse}
          id="anticipation"
        >
          <AnticipationContent
            data={anticipation}
            t={t}
            onSave={this.onSaveAnticipation}
            onChange={this.handleChangeAnticipation}
            onCancel={this.handleCancel}
          />
        </RecipientItem>
        <RecipientItem
          title={t('pages.recipient_detail.transfer')}
          subtitle={this.renderTransferSub()}
          icon={<TransferIcon width={16} height={16} />}
          isOpen={expanded.transfer}
          onClick={this.handleCollapse}
          id="transfer"
        >
          <TransferContent
            data={transfer}
            t={t}
            onCancel={this.handleCancel}
            onSave={this.onSaveTransfer}
            onChange={this.handleChangeTransfer}
            onToggle={this.toggleChangeTransfer}
          />
        </RecipientItem>
        <RecipientItem
          title={t('pages.recipient_detail.bank_account')}
          subtitle={this.renderBankAccountSub()}
          icon={<BackAccountIcon width={16} height={16} />}
          isOpen={expanded.bankAccount}
          onClick={this.handleCollapse}
          id="bankAccount"
        >
          <BankAccountContent
            accounts={accounts}
            data={bankAccount}
            onCancel={this.handleCancel}
            onSave={this.onSaveBankAccount}
            t={t}
          />
        </RecipientItem>
        <HelpModal
          anticipationModel={anticipation.anticipationModel}
          isOpen={openedModal}
          onExit={this.handleCloseHelpModal}
          size="huge"
          title={t('pages.recipient_detail.title_modal')}
          t={t}
        />
      </Fragment>
    )
  }
}

RecipientDetailConfig.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  anticipation: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
  }),
  bankAccount: userAccountProps,
  onSaveAnticipation: PropTypes.func.isRequired,
  onSaveBankAccount: PropTypes.func.isRequired,
  onSaveTransfer: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  transfer: PropTypes.shape({
    transferDay: PropTypes.string,
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
  }),
}

RecipientDetailConfig.defaultProps = {
  accounts: [],
  anticipation: {
    anticipationDays: '',
    anticipationModel: '',
    anticipationVolumePercentage: '',
  },
  bankAccount: userAccountDefaultProps,
  transfer: {
    transferDay: '',
    transferEnabled: true,
    transferInterval: '',
  },
}

export default RecipientDetailConfig
