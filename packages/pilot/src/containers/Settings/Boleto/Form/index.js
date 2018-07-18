/* eslint-disable */
import React, { Component } from 'react'
import {
  Col,
  FormDropdown,
  FormInput,
  Grid,
  Row,
  Spacing,
} from 'former-kit'
import IconBarcode from 'emblematic-icons/svg/BarCode32.svg'
import ConfigurationCardForm from '../../../../components/ConfigurationCardForm'


class Form extends Component {
  constructor (props) {
    super(props)

    const {
      defaultInstruction,
      payableOffset,
    } = props

    this.state = {
      collapsed: true,
      data: {
        instructions: defaultInstruction,
        payableOffset,
      }
    }

    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }

  handleConfirm (data, error) {
    if (!error) {
      this.setState({ data })
    }
  }

  handleCancel () {
    const {
      defaultInstruction,
      payableOffset,
    } = this.props

    this.setState({
      data: {
        defaultInstruction,
        payableOffset
      }
    })
  }

  toggleForm () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const {
      collapsed,
      data,
    } = this.state

    const {
      instructionsOptions, 
      t,
    } = this.props

    return (
      <ConfigurationCardForm
        title={t('settings.company.card.product.boleto.title')}
        subtitle={t('settings.boleto.subtitle')}
        data={data}
        onCancel={this.handleCancel}
        onClick={this.toggleForm}
        onConfirm={this.handleConfirm}
        collapsed={collapsed}
        icon={<IconBarcode width={16} height={16} />}
        t={t}
      >
      <p>{t('settings.boleto.description')}</p>

      <Grid>
        <Row flex>
          <Col 
            desk={2}
            tv={2}
            tablet={2}
            palm={2}
          >
            <FormInput 
              label={t('settings.boleto.payableOffset.label')}
              name="payableOffset"
            />
          </Col>

          <Col
            desk={4}
            tv={4}
            tablet={4}
            palm={4}
          >
            <FormDropdown 
              label={t('settings.boleto.instructions.label')}
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

export default Form
