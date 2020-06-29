import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'ramda'
import { withError } from '../../ErrorBoundary'
import { getLinkRequest as getLinkRequestAction } from './actions'

const mapStateToProps = ({
  paymentLinksDetails: {
    loading,
    paymentLink,
  },
}) => ({
  loading,
  paymentLink,
})

const mapDispatchToProps = {
  getLinkRequest: getLinkRequestAction,
}

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withError
)

const Details = ({
  getLinkRequest,
  loading,
  match,
  paymentLink,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getLinkRequest(match.params.id), [])

  return (
    <div>
      {match.params.id}
      {loading}
      {JSON.stringify(paymentLink)}
    </div>
  )
}

Details.propTypes = {
  getLinkRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
  paymentLink: PropTypes.shape(),
}

Details.defaultProps = {
  paymentLink: null,
}

export default enhanced(Details)
