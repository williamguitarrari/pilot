import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  complement,
  dissoc,
  equals,
  isEmpty,
  pipe,
} from 'ramda'
import {
  Button,
  Col,
  CardActions,
  CardContent,
  FormDropdown,
  FormInput,
  RadioGroup,
  Row,
  Spacing,
} from 'former-kit'

import cnpj from '../../validation/cnpj'
import cpf from '../../validation/cpf'
import email from '../../validation/email'
import phone from '../../validation/phone'
import required from '../../validation/required'

import style from './style.css'

const isUntouchable = pipe(dissoc('type'), isEmpty)
const hasErrors = complement(isEmpty)

const isCNPJ = t => cnpj(t('document_invalid'))
const isCPF = t => cpf(t('document_invalid'))
const isEmail = t => email(t('email_invalid'))
const isPhone = t => phone(t('phone_invalid'))
const isRequired = t => required(t('required'))

const isCorporation = equals('corporation')

const getDocumentMask = type => (isCorporation(type)
  ? '11.111.111/1111-11'
  : '111.111.111-11'
)

const validations = t => ({
  country: isRequired(t),
  email: [isRequired(t), isEmail(t)],
  name: isRequired(t),
  phone: [isRequired(t), isPhone(t)],
})

const setStateData = (name, { value }) =>
  ({ data }) => ({
    data: {
      ...data,
      [name]: value,
    },
  })

class ClientForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: props.customer,
      errors: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeWithMask = this.onChangeWithMask.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidUpdate () {
    const { onChange } = this.props

    if (onChange) {
      onChange(this.state)
    }
  }

  onChange (data, errors) {
    this.setState({
      data,
      errors,
    })
  }

  onChangeWithMask (name) {
    return ({ target }) => this.setState(setStateData(name, target))
  }

  onChangeType ({ target }) {
    const { data } = this.state

    this.setState({
      data: {
        ...data,
        type: target.value,
        document: '',
      },
    })
  }

  onSubmit (data, error) {
    if (!error) {
      this.props.onSubmit(data)
    }
  }

  render () {
    const {
      onCancel,
      t,
    } = this.props

    const {
      data,
      errors,
    } = this.state

    const disabled = isUntouchable(data) || hasErrors(errors)

    return (
      <Form
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        data={data}
        validation={{
          ...validations(t),
          document: isCorporation(data.type)
            ? [isRequired(t), isCNPJ(t)]
            : [isRequired(t), isCPF(t)],
        }}
        validateOn="blur"
      >
        <CardContent>
          <Row>
            <Col palm={4} tablet={4} desk={2} tv={2}>
              <FormInput
                name="externalId"
                label={t('add_transaction_customer_external_id')}
              />
            </Col>

            <Col palm={5} tablet={5} desk={5} tv={5}>
              <FormInput
                name="name"
                label={t('add_transaction_customer_name')}
              />
            </Col>
          </Row>

          <Row>
            <Col palm={4} tablet={4} desk={2} tv={2}>
              <FormInput
                name="phone"
                type="phone"
                label={t('add_transaction_customer_phone')}
                mask="(11) 11111-1111"
                onChange={this.onChangeWithMask('phone')}
              />
            </Col>

            <Col palm={5} tablet={5} desk={5} tv={5}>
              <FormInput
                name="email"
                label={t('add_transaction_customer_email')}
              />
            </Col>

            <Col palm={12} tablet={12} desk={12} tv={12}>
              <span className={style.label}>{t('add_transaction_type')}:</span>
              <RadioGroup
                name="type"
                onChange={this.onChangeType}
                options={[
                  { name: t('add_transaction_customer_individual'), value: 'individual' },
                  { name: t('add_transaction_customer_corporation'), value: 'corporation' },
                ]}
              />
            </Col>
          </Row>

          <Row>
            <Col palm={4} tablet={4} desk={2} tv={2}>
              <FormDropdown
                label={t('add_transaction_customer_country')}
                name="country"
                options={[
                  { name: 'Argentina', value: 'ar' },
                  { name: 'Brasil', value: 'br' },
                  { name: 'Estados Unidos', value: 'usa' },
                ]}
              />
            </Col>
          </Row>

          <Row>
            <Col palm={4} tablet={4} desk={2} tv={2}>
              <FormInput
                key={data.type}
                label={
                  isCorporation(data.type)
                    ? 'CNPJ'
                    : 'CPF'
                }
                mask={getDocumentMask(data.type)}
                name="document"
                onChange={this.onChangeWithMask('document')}
              />
            </Col>
          </Row>
        </CardContent>

        <CardActions>
          <Button
            fill="outline"
            relevance="low"
            onClick={onCancel}
          >
            {t('cancel')}
          </Button>
          <Spacing />
          <Button
            disabled={disabled}
            type="submit"
          >
            {t('confirm')}
          </Button>
        </CardActions>
      </Form>
    )
  }
}

ClientForm.propTypes = {
  customer: PropTypes.shape({
    country: PropTypes.string,
    document: PropTypes.string,
    email: PropTypes.string,
    externalId: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    type: PropTypes.oneOf([
      'corporation', 'individual',
    ]).isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ClientForm.defaultProps = {
  onChange: null,
}

export default ClientForm
