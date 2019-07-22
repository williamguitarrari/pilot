import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import {
  equals,
  juxt,
  merge,
  pipe,
  prop,
  sum,
  uncurryN,
} from 'ramda'
import Balance from '../../../src/containers/Balance'
import Section from '../../Section'
import mock from '../../../src/containers/Balance/mock.json'

const compareMomentDate = date => comparableDate => (
  date.diff(comparableDate, 'days')
)

const compareMomentDates = uncurryN(2, dates => pipe(
  juxt([
    pipe(prop('end'), compareMomentDate(dates.end)),
    pipe(prop('start'), compareMomentDate(dates.start)),
  ]),
  sum,
  equals(0)
))

class BalanceState extends Component {
  constructor () {
    super()

    this.handleDateChange = this.handleDateChange.bind(this)
    this.state = {
      anticipation: {
        available: 10000,
        error: false,
        loading: false,
      },
      company: {
        name: 'Test Company SA',
        pricing: {
          transfers: {
            ted: 1000,
          },
        },
      },
      dates: {
        end: moment(),
        start: moment().subtract(30, 'day'),
      },
      loading: false,
      ...mock,
      query: {
        dates: {
          end: moment(),
          start: moment().subtract(30, 'day'),
        },
        page: 1,
        timeframe: 'past',
      },
      total: {
        net: 1000000,
        outcoming: 1000000,
        outgoing: -1000000,
      },
    }
  }

  handleDateChange (dates) {
    const { query } = this.state
    action('date change')
    this.setState({
      query: merge(query, { dates }),
    })
  }

  render () {
    const {
      anticipation,
      company,
      dates,
      loading,
      query,
      result: {
        balance,
        recipient,
        requests,
        search,
      },
      total,
    } = this.state

    return (
      <Section>
        <Balance
          anticipation={anticipation}
          anticipationCancel={null}
          balance={balance}
          company={company}
          currentPage={query.page}
          dates={dates}
          disabled={false}
          exporting={false}
          filterDisable={compareMomentDates(query.dates, dates)}
          hasNextPage={false}
          itemsPerPage={15}
          loading={loading}
          modalConfirmOpened={false}
          onAnticipationClick={action('anticipation')}
          onCancelRequestClick={action('cancel request click')}
          onCancelRequestClose={action('cancel request close')}
          onConfirmCancelPendingRequest={action('confirm cancel pending request')}
          onDateChange={this.handleDateChange}
          onExport={action('export click')}
          onFilterClick={action('filter click')}
          onPageChange={action('page click')}
          onPageCountChange={action('page count change')}
          onTimeframeChange={action('timeframe change')}
          onWithdrawClick={action('withdraw')}
          recipient={recipient}
          requests={requests}
          search={search}
          selectedTab={0}
          t={t => t}
          timeframe="past"
          total={total}
        />
      </Section>
    )
  }
}

export default BalanceState
