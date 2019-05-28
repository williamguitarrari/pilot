import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { always } from 'ramda'
import {
  Card,
  Col,
  Row,
  Tooltip,
  isMomentPropValidation,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

import Form from './Form'
import Results from './Results'

import style from './style.css'

const renderInfo = (text, placement) => (
  <Tooltip
    placement={placement || 'rightMiddle'}
    content={text}
    className={style.tooltip}
  >
    <IconInfo height={16} width={16} />
  </Tooltip>
)

class AnticipationFormContainer extends Component {
  constructor (props) {
    super(props)

    this.handleCalculateSubmit = this.handleCalculateSubmit.bind(this)
  }

  handleCalculateSubmit ({
    dates,
    requested,
    transfer,
    ...values
  }, errors) {
    if (!errors) {
      const isAutomaticTransfer = transfer === 'yes'

      this.props.onCalculateSubmit({
        date: dates.start,
        isAutomaticTransfer,
        requested: Number(requested),
        ...values,
      })
    }
  }

  render () {
    const {
      amount,
      approximateRequested,
      cost,
      date,
      error,
      isAutomaticTransfer,
      isValidDay,
      loading,
      maximum,
      minimum,
      needsRecalculation,
      onCancel,
      onChange,
      onConfirm,
      requested,
      t,
      timeframe,
      transferCost,
    } = this.props

    return (
      <Fragment>
        <Row stretch>
          <Col
            desk={8}
            palm={12}
            tablet={12}
            tv={8}
          >
            <Card>
              <Form
                anticipationInfo={renderInfo(t('pages.anticipation.date.advise'))}
                dates={{
                  end: date,
                  start: date,
                }}
                error={error}
                isAutomaticTransfer={isAutomaticTransfer}
                isValidDay={isValidDay}
                loading={loading}
                maximum={maximum}
                minimum={minimum}
                onChange={onChange}
                onSubmit={this.handleCalculateSubmit}
                periodInfo={renderInfo(t('pages.anticipation.period.advise'))}
                requested={requested}
                t={t}
                timeframe={timeframe}
                transferInfo={renderInfo(t('pages.anticipation.transfer.advise'))}
              />
            </Card>
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={12}
            tv={4}
          >
            <Results
              amount={amount}
              approximateRequested={approximateRequested}
              cost={cost}
              hasErrors={error}
              isAutomaticTransfer={isAutomaticTransfer}
              loading={loading}
              needsRecalculation={needsRecalculation}
              onCancel={onCancel}
              onConfirm={onConfirm}
              renderInfo={renderInfo}
              t={t}
              transferCost={transferCost}
            />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

AnticipationFormContainer.propTypes = {
  amount: PropTypes.number.isRequired,
  approximateRequested: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  date: isMomentPropValidation,
  error: PropTypes.string,
  isAutomaticTransfer: PropTypes.bool,
  isValidDay: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  maximum: PropTypes.number,
  minimum: PropTypes.number,
  needsRecalculation: PropTypes.bool,
  onCalculateSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  requested: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  timeframe: PropTypes.oneOf(['end', 'start']),
  transferCost: PropTypes.number.isRequired,
}

AnticipationFormContainer.defaultProps = {
  date: moment(),
  error: '',
  isAutomaticTransfer: true,
  isValidDay: always(true),
  maximum: null,
  minimum: null,
  needsRecalculation: false,
  timeframe: 'start',
}

export default AnticipationFormContainer
