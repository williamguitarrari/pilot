import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardContent,
  CardActions,
  Col,
  FormInput,
  Grid,
  SegmentedSwitch,
  Spacing,
  Row,
} from 'former-kit'

import {
  complement,
  either,
  isEmpty,
  isNil,
} from 'ramda'

import AddAccountContent from '../../../AddRecipient/BankAccountStep/AddAccount/AddAccountContent'
import SelectAccountContent from '../../../AddRecipient/BankAccountStep/SelectAccount/SelectAccountContent'
import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import createMaxLengthValidation from '../../../../validation/maxLength'
import createAccountDigitValidation from '../../../../validation/accountCheckDigit'
import createAgencyDigitValidation from '../../../../validation/agencyCheckDigit'
import accountTypes from '../../../../models/accountTypes'
import styles from '../style.css'

import {
  BANK_ACCOUNT,
  ADD_ACCOUNT,
  SELECT_ACCOUNT,
} from '../contentIds'

const hasItems = complement(either(isEmpty, isNil))

const toDropdownOptions = (account) => {
  const {
    agency,
    agency_digit: agencyDigit,
    bank,
    id,
    name,
    number,
    number_digit: numberDigit,
  } = account

  const accountNumber = `${number}-${numberDigit}`

  const agencyNumber = (agencyDigit)
    ? `${agency}-${agencyDigit}`
    : agency

  return {
    name: `${name} - ${bank} - ${agencyNumber} - ${accountNumber}`,
    value: id,
  }
}

const masks = {
  cnpj: '11.111.111/1111-11',
  cpf: '111.111.111-11',
}

class BankAccountContent extends Component {
  constructor (props) {
    super(props)

    const { data } = this.props

    this.state = {
      selectedBankAccount: data.id,
      selectedForm: SELECT_ACCOUNT,
    }

    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.handleFormSelectionChange = this.handleFormSelectionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (data, errors) {
    const { onSave } = this.props
    const { selectedBankAccount, selectedForm } = this.state
    if (!errors) {
      let dataTransformed
      if (selectedForm === ADD_ACCOUNT) {
        dataTransformed = {
          ...data,
          id: undefined,
        }
      } else {
        dataTransformed = {
          id: selectedBankAccount,
        }
      }
      onSave(dataTransformed)
    }
  }

  handleFormSelectionChange (selectedForm) {
    this.setState({ selectedForm })
  }

  handleDropdownChange ({ target: { value } }) {
    this.setState({
      selectedBankAccount: value,
    })
  }

  renderDocumentNumber () {
    const { data, t } = this.props
    const maskDocument = data.documentNumber.length === 11
      ? masks.cpf
      : masks.cnpj

    return (
      <Row>
        <Col tv={2} desk={4} tablet={5} palm={8}>
          <FormInput
            disabled
            className={styles.marginBottom}
            label={t('pages.add_recipient.document_owner')}
            type="text"
            mask={maskDocument}
            name="documentNumber"
          />
        </Col>
      </Row>
    )
  }

  renderSelectedForm () {
    const { selectedBankAccount, selectedForm } = this.state
    const {
      accounts,
      data,
      t,
    } = this.props

    if (selectedForm === ADD_ACCOUNT) {
      return (
        <div className={styles.paddingTop}>
          <Grid>
            {this.renderDocumentNumber()}
            {AddAccountContent({ data, t })}
          </Grid>
        </div>
      )
    }

    return (
      <div className={styles.paddingTop}>
        <Grid>
          {this.renderDocumentNumber()}
          <SelectAccountContent
            onChange={this.handleDropdownChange}
            options={accounts.map(toDropdownOptions)}
            t={t}
            value={selectedBankAccount}
          />
        </Grid>
      </div>
    )
  }

  render () {
    const {
      accounts,
      data,
      onCancel,
      t,
    } = this.props
    const { selectedForm } = this.state
    const displaySelectAccount = hasItems(accounts)

    const max30Message = t('pages.add_recipient.field_max', { number: 30 })
    const max13Message = t('pages.add_recipient.field_max', { number: 13 })
    const max5Message = t('pages.add_recipient.field_max', { number: 5 })
    const numberMessage = t('pages.add_recipient.field_number')
    const requiredMessage = t('pages.add_recipient.field_required')
    const digitMessage = t('pages.add_recipient.field_invalid_digit')

    const isNumber = createNumberValidation(numberMessage)
    const max30Characters = createMaxLengthValidation(30, max30Message)
    const max13Characters = createMaxLengthValidation(13, max13Message)
    const max5Characters = createMaxLengthValidation(5, max5Message)
    const required = createRequiredValidation(requiredMessage)
    const isAccountDigit = createAccountDigitValidation(digitMessage)
    const isAgencyDigit = createAgencyDigitValidation(digitMessage)

    if (displaySelectAccount) {
      return (
        <Fragment>
          <Spacing size="medium" />
          <SegmentedSwitch
            options={[
              {
                title: t('pages.add_recipient.select_account'),
                value: SELECT_ACCOUNT,
              },
              {
                title: t('pages.add_recipient.add_account'),
                value: ADD_ACCOUNT,
              },
            ]}
            onChange={this.handleFormSelectionChange}
            name="select_form"
            value={selectedForm}
          />
          <Form
            data={{
              agency: '',
              agency_digit: '',
              bank: '',
              documentNumber: data.documentNumber,
              id: accounts[0].id,
              name: '',
              number: '',
              type: accountTypes[0],
            }}
            validateOn="blur"
            validation={{
              agency: [required, isNumber, max5Characters],
              agency_digit: [isAgencyDigit],
              bank: [required],
              name: [required, max30Characters],
              number: [required, isNumber, max13Characters],
              number_digit: [required, isAccountDigit],
              type: [required],
            }}
            onSubmit={this.handleSubmit}
          >
            <CardContent>
              { this.renderSelectedForm() }
            </CardContent>
            <div className={styles.paddingTop}>
              <CardActions>
                <Button
                  type="button"
                  onClick={() => onCancel(BANK_ACCOUNT)}
                  fill="outline"
                >
                  {t('pages.recipient_detail.cancel')}
                </Button>
                <Spacing size="medium" />
                <Button
                  type="submit"
                >
                  {t('pages.recipient_detail.save')}
                </Button>
              </CardActions>
            </div>
          </Form>
        </Fragment>
      )
    }
    return null
  }
}

BankAccountContent.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  data: PropTypes.shape({
    agency: PropTypes.string,
    bank: PropTypes.string,
    documentNumber: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    type: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

BankAccountContent.defaultProps = {
  accounts: [],
  data: {},
}

export default BankAccountContent
