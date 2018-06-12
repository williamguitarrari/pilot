import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Col,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import { isEmpty } from 'ramda'

class CompanyGeneralForm extends Component {
  constructor (props) {
    super(props)

    const initalFormData = props.managingPartner

    this.state = {
      initalFormData,
      currentFormData: initalFormData,
    }

    this.handleCancellation = this.handleCancellation.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormChange (data) {
    this.setState({
      currentFormData: data,
    })
  }

  handleCancellation () {
    this.setState({
      currentFormData: this.state.initalFormData,
    })
  }

  handleFormSubmit (data, formErrors) {
    if (isEmpty(formErrors)) {
      this.props.onSubmit(data)
    }
  }
  render () {
    const {
      t,
    } = this.props

    return (
      <Form
        customErrorProp="error"
        data={this.state.currentFormData}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
      >
        <Grid>
          <Row>
            <Col palm={12} tablet={12} desk={4} tv={4}>
              <FormInput
                disabled
                label={t('settings.company.card.register.managingPartner.form.name')}
                name="name"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={2} tv={2}>
              <FormInput
                disabled
                label={t('settings.company.card.register.managingPartner.form.phone')}
                name="phone_number"
                type="text"
              />
            </Col>
            <Col palm={12} tablet={12} desk={2} tv={2}>
              <FormInput
                disabled
                label={t('settings.company.card.register.managingPartner.form.cpf')}
                name="cpf"
                type="text"
              />
            </Col>
          </Row>
        </Grid>
      </Form>
    )
  }
}

CompanyGeneralForm.propTypes = {
  managingPartner: PropTypes.shape({
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
}

CompanyGeneralForm.defaultProps = {
  t: t => t,
  onSubmit: data => data,
}

export default CompanyGeneralForm
