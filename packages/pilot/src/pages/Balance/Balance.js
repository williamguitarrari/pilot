import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import qs from 'qs'
import {
  __,
  always,
  anyPass,
  applySpec,
  assoc,
  complement,
  compose,
  defaultTo,
  either,
  equals,
  identity,
  isEmpty,
  isNil,
  juxt,
  merge,
  mergeAll,
  objOf,
  path,
  pipe,
  prop,
  sum,
  tail,
  test,
  uncurryN,
  unless,
  when,
} from 'ramda'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { Alert } from 'former-kit'
import {
  requestBalance,
  receiveBalance,
} from './actions'
import { requestLogout } from '../Account/actions'
import BalanceContainer from '../../containers/Balance'
import env from '../../environment'

const mapStateToProps = ({
  account: {
    client,
    company,
    sessionId,
  },
  balance: { loading, query },
}) => ({
  client,
  company,
  loading,
  query,
  sessionId,
})

const mapDispatchToProps = dispatch => ({
  onRequestBalance: (query) => {
    dispatch(requestBalance(query))
  },
  onReceiveBalance: ({ query }) => {
    dispatch(receiveBalance({ query }))
  },
  onRequestBalanceFail: (error) => {
    dispatch(requestLogout(error))
  },
})

const enhanced = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)
const isNilOrEmpty = anyPass([isNil, isEmpty])

const momentToString = momentObj => momentObj.toISOString()

const normalizeDateToString = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    pipe(momentToString, objOf(property))
  )
)

const normalizeQueryDatesToString = pipe(
  prop('dates'),
  juxt([normalizeDateToString('start'), normalizeDateToString('end')]),
  mergeAll
)

const stringToMoment = str => moment(str)

const normalizeStringToDate = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    pipe(stringToMoment, objOf(property))
  )
)

const normalizeQueryStringToDate = pipe(
  prop('dates'),
  juxt([normalizeStringToDate('start'), normalizeStringToDate('end')]),
  mergeAll,
  objOf('dates')
)

const normalizeTo = (defaultValue, propPath) => pipe(
  path(propPath),
  when(
    either(isNil, isEmpty),
    defaultTo(defaultValue)
  )
)

const normalizeQueryStructure = applySpec({
  count: pipe(
    normalizeTo(15, ['count']),
    Number
  ),
  page: pipe(
    normalizeTo(1, ['page']),
    Number
  ),
})

const parseQueryUrl = pipe(
  tail,
  qs.parse,
  juxt([
    identity,
    normalizeQueryStringToDate,
    normalizeQueryStructure,
  ]),
  mergeAll
)

const parseQueryUrlDates = unless(
  pipe(
    qs.parse,
    isNilOrEmpty
  ),
  pipe(
    qs.parse,
    normalizeQueryStringToDate,
    prop('dates')
  )
)

const isRecipientId = test(/^re_/)

const isNotRecipientId = complement(isRecipientId)

const getValidId = uncurryN(2, defaultId => unless(
  complement(
    anyPass([
      isNil,
      isNaN, // eslint-disable-line no-restricted-globals
      isEmpty,
      isNotRecipientId,
    ])
  ),
  always(defaultId)
))

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

class Balance extends Component {
  constructor (props) {
    super(props)
    const {
      client,
      company,
    } = this.props

    this.state = {
      client,
      query: {
        count: 10,
        dates: {
          end: moment(),
          start: moment().subtract(30, 'days'),
        },
        page: 1,
      },
      recipientId: company.default_recipient_id[env],
      result: {},
    }

    this.handleAnticipation = this.handleAnticipation.bind(this)
    this.handleCancelRequest = this.handleCancelRequest.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleWithdraw = this.handleWithdraw.bind(this)

    this.updateQuery = this.updateQuery.bind(this)
    this.requestData = this.requestData.bind(this)
  }

  componentDidMount () {
    const {
      history: {
        location,
      },
      match: {
        params,
      },
    } = this.props
    const urlBalanceQuery = location.search

    if (isEmpty(urlBalanceQuery)) {
      this.updateQuery(this.state.query, params.id)
    } else {
      this.requestData(params.id, parseQueryUrl(urlBalanceQuery))
    }
  }

  componentWillReceiveProps (nextProps) {
    const {
      location: { search },
    } = this.props
    const {
      match: { params },
      location,
    } = nextProps

    if (search !== location.search) {
      this.requestData(params.id, parseQueryUrl(location.search))
    }
  }

  updateQuery (query, id) {
    const buildBalanceQuery = pipe(
      normalizeQueryDatesToString,
      assoc('dates', __, query),
      qs.stringify
    )
    const {
      query: stateQuery,
      recipientId,
    } = this.state
    const queryObject = isNilOrEmpty(query) ? stateQuery : query
    const pathId = getValidId(recipientId, id)
    const {
      history,
      match: {
        params,
      },
    } = this.props
    if (pathId) {
      history.replace({
        pathname: `${pathId}`,
        search: buildBalanceQuery(queryObject),
      })
    } else if (params.id === ':id') {
      history.replace('/balance')
    }
  }

  requestData (id, searchQuery) {
    this.props.onRequestBalance({ searchQuery })

    return this.state.client
      .balance(id, searchQuery)
      .then(({ query, result }) => {
        this.setState({
          result,
          query,
        })

        this.props.onReceiveBalance(query)
      })
      .catch((error) => {
        this.props.onRequestBalanceFail(error)
      })
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  handleAnticipation (amount) {
    // TODO: add this method when it's available in API
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  handleCancelRequest (requestId) {
    // TODO: add this method when it's available in API
  }

  handleDateChange (dates) { // eslint-disable-line class-methods-use-this
    const { query } = this.state

    this.setState({
      query: merge(query, { dates }),
    })
  }

  handleFilterClick () {
    const {
      query,
    } = this.props
    const updatedQuery = {
      ...query,
      ...this.state.query,
    }

    this.updateQuery(updatedQuery)
  }

  handlePageChange (page) {
    const query = {
      ...this.state.query,
      page,
    }

    this.updateQuery(query)
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  handleWithdraw (amount) {
    // TODO: add this method when it's available in API
  }

  render () {
    const {
      company,
      loading,
      location,
      t,
    } = this.props
    const {
      result: {
        balance,
        recipient,
        requests,
        search,
      },
      query,
      recipientId,
    } = this.state
    const searchDates = parseQueryUrlDates(location.search)
    const dates = isNilOrEmpty(searchDates)
      ? query.dates
      : searchDates
    const isFirstRender = isNilOrEmpty(this.state.result)
    const hasDefaultRecipient = !isNilOrEmpty(recipientId)

    return (
      <Fragment>
        {!isFirstRender
          && hasDefaultRecipient
          && (
            <BalanceContainer
              balance={balance}
              company={company}
              currentPage={query.page}
              dates={dates}
              filterDisable={compareMomentDates(query.dates, dates)}
              loading={loading}
              // onAnticipationClick={this.handleAnticipation}
              // onCancelRequestClick={this.handleCancelRequest}
              onDateChange={this.handleDateChange}
              onFilterClick={this.handleFilterClick}
              onPageChange={this.handlePageChange}
              // onWithdrawClick={this.handleWithdraw}
              queryDates={query.dates}
              recipient={recipient}
              requests={requests}
              search={search}
              t={t}
            />
          )
        }
        {!hasDefaultRecipient
          && (
            <Alert
              icon={<IconInfo height={16} width={16} />}
              type="info"
            >
              <span>{t('balance.invalid_recipient')}</span>
            </Alert>
          )
        }
      </Fragment>
    )
  }
}

Balance.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  company: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  onReceiveBalance: PropTypes.func.isRequired,
  onRequestBalance: PropTypes.func.isRequired,
  onRequestBalanceFail: PropTypes.func.isRequired,
  query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
}

Balance.defaultProps = {
  query: null,
}

export default enhanced(Balance)
