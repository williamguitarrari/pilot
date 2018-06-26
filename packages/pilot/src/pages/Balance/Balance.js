import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import qs from 'qs'
import {
  always,
  anyPass,
  applySpec,
  complement,
  compose,
  defaultTo,
  either,
  identity,
  invoker,
  isEmpty,
  isNil,
  juxt,
  merge,
  mergeAll,
  path,
  pathOr,
  pipe,
  prop,
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
import BalanceContainer from '../../containers/Balance'
import env from '../../environment'

const mapStateToProps = ({
  account: {
    client,
    company,
    sessionId,
  },
  balance: {
    error,
    loading,
    query,
  },
}) => ({
  client,
  error,
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
    dispatch(receiveBalance(error))
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

const momentToISOString = unless(
  isNilOrEmpty,
  pipe(moment, invoker(0, 'toISOString'))
)

const stringToMoment = unless(
  isNilOrEmpty,
  moment
)

const queryDatesToISOString = applySpec({
  dates: {
    start: pipe(path(['dates', 'start']), momentToISOString),
    end: pipe(path(['dates', 'end']), momentToISOString),
  },
})

const queryDatesToMoment = applySpec({
  dates: {
    start: pipe(path(['dates', 'start']), stringToMoment),
    end: pipe(path(['dates', 'end']), stringToMoment),
  },
})

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
    queryDatesToMoment,
    normalizeQueryStructure,
  ]),
  mergeAll
)

const parseQueryUrlDates = pipe(
  qs.parse,
  unless(
    isNilOrEmpty,
    pipe(
      queryDatesToMoment,
      prop('dates')
    )
  )
)

const isRecipientId = test(/^re_/)

const isNotRecipientId = complement(isRecipientId)

const getValidId = uncurryN(2, defaultId => unless(
  complement(
    anyPass([
      isNil,
      Number.isNaN,
      isEmpty,
      isNotRecipientId,
    ])
  ),
  always(defaultId)
))

const getRecipientId = pathOr(null, ['default_recipient_id', env])

class Balance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      query: {
        count: 10,
        dates: {
          end: moment(),
          start: moment().subtract(30, 'days'),
        },
        page: 1,
      },
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
      queryDatesToISOString,
      merge(query),
      qs.stringify
    )

    const queryObject = isNilOrEmpty(query) ? this.state.stateQuery : query
    const pathId = getValidId(getRecipientId(this.props.company), id)

    const {
      history,
      match: {
        params,
      },
    } = this.props

    if (pathId) {
      history.replace({
        pathname: pathId,
        search: buildBalanceQuery(queryObject),
      })
    } else if (params.id === ':id') {
      history.replace('/balance')
    }
  }

  requestData (id, searchQuery) {
    this.props.onRequestBalance({ searchQuery })

    return this.props.client
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

  handleAnticipation () {
    const {
      history,
      company,
    } = this.props

    history.push(`/anticipation/${getRecipientId(company)}`)
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

  handleFilterClick (dates) {
    const {
      query,
    } = this.props

    const nextQuery = {
      ...query,
      ...this.state.query,
      dates,
      page: 1,
    }

    this.updateQuery(nextQuery)
  }

  handlePageChange (page) {
    const query = {
      ...this.state.query,
      page,
    }

    this.updateQuery(query)
  }

  handleWithdraw () {
    const {
      history,
      company,
    } = this.props

    history.push(`/withdraw/${getRecipientId(company)}`)
  }

  render () {
    const {
      company,
      error,
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
    } = this.state

    const searchDates = parseQueryUrlDates(location.search)
    const dates = isNilOrEmpty(searchDates) ? query.dates : searchDates

    const isEmptyResult = isNilOrEmpty(this.state.result)
    const hasDefaultRecipient = !isNilOrEmpty(getRecipientId(company))

    if (error) {
      return (
        <Alert
          icon={<IconInfo height={16} width={16} />}
          type="info"
        >
          <span>
            {pathOr(
              t('pages.balance.unknown_error'),
              ['errors', 0, 'message'],
              error
            )}
          </span>
        </Alert>
      )
    }

    if (!hasDefaultRecipient && !isNil(company)) {
      return (
        <Alert
          icon={<IconInfo height={16} width={16} />}
          type="info"
        >
          <span>{t('pages.balance.invalid_recipient')}</span>
        </Alert>
      )
    }

    if (!isEmptyResult) {
      return (
        <BalanceContainer
          balance={balance}
          company={company}
          currentPage={query.page}
          dates={dates}
          disabled={loading}
          onAnticipationClick={this.handleAnticipation}
          // onCancelRequestClick={this.handleCancelRequest}
          onFilterClick={this.handleFilterClick}
          onPageChange={this.handlePageChange}
          onWithdrawClick={this.handleWithdraw}
          queryDates={query.dates}
          recipient={recipient}
          requests={requests}
          search={search}
          t={t}
        />
      )
    }

    return null
  }
}

Balance.propTypes = {
  client: PropTypes.shape({
    balance: PropTypes.func.isRequired,
  }).isRequired,
  company: PropTypes.shape({
    default_recipient_id: PropTypes.shape({
      live: PropTypes.string.isRequired,
      test: PropTypes.string.isRequired,
    }).isRequired,
  }),
  error: PropTypes.shape({
    errors: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string,
    })),
  }),
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
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onReceiveBalance: PropTypes.func.isRequired,
  onRequestBalance: PropTypes.func.isRequired,
  onRequestBalanceFail: PropTypes.func.isRequired,
  query: PropTypes.shape({
    dates: {
      start: PropTypes.string,
      end: PropTypes.string,
    },
  }),
  t: PropTypes.func.isRequired,
}

Balance.defaultProps = {
  company: null,
  error: null,
  query: null,
}

export default enhanced(Balance)
