import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardSection,
  Col,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import {
  always,
  apply,
  cond,
  equals,
  gt,
  gte,
  juxt,
  lt,
  pipe,
  prop,
  propSatisfies,
} from 'ramda'
import CurrencyInput from '../../../components/CurrencyInput'
import formatCurrency from '../../../formatters/currency'
import Summary from '../Summary'
import style from './style.css'

const chooseTransferCardColor = cond([
  [Number.isNaN, always('#757575')],
  [lt(0), always('#37cc9a')],
  [gte(0), always('#ff796f')],
])

const buildErrorMessage = t => cond([
  [
    propSatisfies(Number.isNaN, 'requested'),
    always(t('pages.withdraw.requested_required')),
  ],
  [
    propSatisfies(gt(0), 'amount'),
    always(t('pages.withdraw.negative_transfer_value')),
  ],
  [
    pipe(
      juxt([prop('requested'), prop('maximum')]),
      apply(gt),
      equals(true)
    ),
    always(t('pages.withdraw.requested_value_greater_max')),
  ],
])

const maxEnabledAmount = 99999999999

class WithdrawFormContainer extends Component {
  constructor (props) {
    super(props)

    this.renderCardActions = this.renderCardActions.bind(this)
    this.renderInformationRow = this.renderInformationRow.bind(this)
    this.renderInputRow = this.renderInputRow.bind(this)
  }

  renderCardActions () {
    const {
      maximum,
      requested,
      t,
      transferCost,
    } = this.props

    return (
      <CardActions>
        <Button
          disabled={
            requested > maximum ||
            requested <= Math.abs(transferCost) ||
            !requested
          }
          type="submit"
        >
          {t('pages.withdraw.continue')}
        </Button>
      </CardActions>
    )
  }

  renderInputRow () {
    const {
      available,
      maximum,
      onRequestedChange,
      requested,
      t,
      transferCost,
    } = this.props

    const amount = requested + transferCost
    const getErrorMessage = buildErrorMessage(t)

    return (
      <Row stretch>
        <Col
          desk={3}
          palm={3}
          tablet={3}
          tv={3}
        />
        <Col
          desk={6}
          palm={6}
          tablet={6}
          tv={6}
        >
          <CardSection>
            <CardContent className={style.formContent}>
              <div className={style.formMessage}>
                {t('pages.withdraw.form_message')}
              </div>
              <div className={style.balance}>
                {t('pages.withdraw.balance')}
                <span
                  className={style.available}
                >
                  &nbsp;{formatCurrency(available)}
                </span>
              </div>
              <div className={style.inputSection}>
                <span>
                  {t('pages.withdraw.max_value_to_be')}<br /> {t('pages.withdraw.transferred')}
                  <span className={style.maximum}>
                    &nbsp;{formatCurrency(maximum)}
                  </span>
                </span>
                <FormInput
                  error={getErrorMessage({ requested, amount, maximum })}
                  label={t('pages.withdraw.withdraw_value')}
                  name="withdrawValue"
                  onChange={onRequestedChange}
                  renderer={props => (
                    <CurrencyInput
                      max={maxEnabledAmount}
                      {...props}
                    />
                  )}
                  value={requested.toString()}
                />
              </div>
            </CardContent>
          </CardSection>
        </Col>
        <Col
          desk={3}
          palm={3}
          tablet={3}
          tv={3}
        />
      </Row>
    )
  }

  renderInformationRow () {
    const {
      date,
      requested,
      t,
      transferCost,
    } = this.props

    const amount = requested + transferCost

    return (
      <Summary
        unit={t('pages.withdraw.currency_symbol')}
        colors={{
          amount: chooseTransferCardColor(amount),
          requested: '#37cc9a',
          transferCost: '#ff796f',
        }}
        labels={{
          amount: t('pages.withdraw.value_to_transfer'),
          date: t('pages.withdraw.date'),
          requested: t('pages.withdraw.requested_value'),
          transferCost: t('pages.withdraw.transfer_cost'),
        }}
        contents={{
          amount,
          date: moment(date).format('DD/MM/YYYY'),
          requested,
          transferCost,
        }}
      />
    )
  }

  render () {
    return (
      <Card>
        <form onSubmit={this.props.onSubmit}>
          <CardContent>
            <Grid>
              {this.renderInputRow()}
              {this.renderInformationRow()}
            </Grid>
          </CardContent>
          {this.renderCardActions()}
        </form>
      </Card>
    )
  }
}

WithdrawFormContainer.propTypes = {
  available: PropTypes.number,
  date: PropTypes.instanceOf(moment).isRequired,
  maximum: PropTypes.number,
  onRequestedChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  requested: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  transferCost: PropTypes.number.isRequired,
}

WithdrawFormContainer.defaultProps = {
  available: null,
  maximum: null,
}

export default WithdrawFormContainer
