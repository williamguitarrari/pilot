import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  FormDropdown,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import IconBarcode from 'emblematic-icons/svg/BarCode32.svg'
import ConfigurationCardForm from '../../../../components/ConfigurationCardForm'

import lessThan from '../../../../validation/lessThan'
import numberValidation from '../../../../validation/number'
import requiredValidation from '../../../../validation/required'

class BoletoForm extends Component {
  constructor () {
    super()

    this.state = {
      collapsed: true,
    }

    this.toggleForm = this.toggleForm.bind(this)
  }

  toggleForm () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    const {
      collapsed,
    } = this.state

    const {
      daysToAddInExpirationDate,
      instructions,
      instructionsOptions,
      onCancel,
      onSubmit,
      t,
    } = this.props

    const isNumber = numberValidation(t('pages.settings.company.boleto.number'))
    const isRequired = requiredValidation(t('pages.settings.company.boleto.required'))

    return (
      <ConfigurationCardForm
        collapsed={collapsed}
        data={{
          daysToAddInExpirationDate,
          instructions,
        }}
        icon={<IconBarcode width={16} height={16} />}
        onCancel={onCancel}
        onClick={this.toggleForm}
        onSubmit={onSubmit}
        subtitle={t('pages.settings.company.boleto.subtitle')}
        t={t}
        title={t('pages.settings.company.card.product.boleto.title')}
        validation={{
          daysToAddInExpirationDate: [
            isRequired,
            isNumber,
            lessThan(0, t('pages.settings.company.boleto.greater_than_or_equal')),
          ],
          instructions: isRequired,
        }}
      >
        <p>{t('pages.settings.company.boleto.description')}</p>

        <Grid>
          <Row flex>
            <Col
              desk={2}
              palm={2}
              tablet={2}
              tv={2}
            >
              <FormInput
                label={t('pages.settings.company.boleto.daysToAddInExpirationDate.label')}
                name="daysToAddInExpirationDate"
              />
            </Col>

            <Col
              desk={4}
              palm={4}
              tablet={4}
              tv={4}
            >
              <FormDropdown
                label={t('pages.settings.company.boleto.instructions.label')}
                name="instructions"
                options={instructionsOptions}
              />
            </Col>
          </Row>
        </Grid>
      </ConfigurationCardForm>
    )
  }
}

BoletoForm.propTypes = {
  daysToAddInExpirationDate: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  instructionsOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default BoletoForm
