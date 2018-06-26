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

const compareMomentDate = date => comparableDate =>
  date.diff(comparableDate, 'days')

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
      company: {
        name: 'Test Company SA',
      },
      dates: {
        end: moment().add(1, 'month'),
        start: moment(),
      },
      loading: false,
      ...mock,
      query: {
        dates: {
          end: moment().add(1, 'month'),
          start: moment(),
        },
        page: 1,
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
      company,
      dates,
      loading,
      result: {
        recipient,
        requests,
        balance,
        search,
      },
      query,
    } = this.state

    return (
      <Section>
        <Balance
          balance={balance}
          company={company}
          currentPage={query.page}
          dates={dates}
          filterDisable={compareMomentDates(query.dates, dates)}
          loading={loading}
          onAnticipationClick={action('anticipation')}
          onDateChange={this.handleDateChange}
          onFilterClick={action('filter click')}
          onPageChange={action('page click')}
          onWithdrawClick={action('withdraw')}
          queryDates={query.dates}
          recipient={recipient}
          requests={requests}
          search={search}
          t={t => t}
        />
      </Section>
    )
  }
}


export default BalanceState
