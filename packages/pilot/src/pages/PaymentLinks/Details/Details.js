import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import {
  Col,
  Grid,
  Row,
} from 'former-kit'
import { withError } from '../../ErrorBoundary'
import {
  getLinkRequest as getLinkRequestAction,
  cancelLinkRequest as cancelLinkRequestAction,

} from './actions'
import {
  DetailsHeader,
  DetailsInfo,
  DisableLinkModal,
} from '../../../containers/PaymentLinks/Details'

const mapStateToProps = ({
  paymentLinksDetails: {
    loadingGetLink,
    paymentLink,
  },
}) => ({
  loadingGetLink,
  paymentLink,
})

const mapDispatchToProps = {
  cancelLinkRequest: cancelLinkRequestAction,
  getLinkRequest: getLinkRequestAction,
}

const enhanced = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withError
)

const defaultColumnSize = {
  desk: 12,
  palm: 12,
  tablet: 12,
  tv: 12,
}

const Details = ({
  cancelLinkRequest,
  getLinkRequest,
  loadingGetLink,
  match,
  paymentLink,
  t,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getLinkRequest(match.params.id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onCancelLink = () => {
    cancelLinkRequest(match.params.id)
    setIsOpen(false)
  }

  return !loadingGetLink && (
    <>
      <DisableLinkModal
        isOpen={isOpen}
        onCancelLink={onCancelLink}
        onClose={() => setIsOpen(false)}
        t={t}
      />
      <Grid>
        <Row>
          <Col {...defaultColumnSize}>
            <DetailsHeader
              name={paymentLink.name}
              onPaymentLinkCancel={() => setIsOpen(true)}
              status={paymentLink.status}
              t={t}
              url={paymentLink.url}
            />
          </Col>
        </Row>
        <Row>
          <Col {...defaultColumnSize}>
            <DetailsInfo
              amount={paymentLink.amount}
              createdAt={paymentLink.date_created}
              expiresAt={paymentLink.expires_at}
              t={t}
            />
          </Col>
        </Row>
      </Grid>
    </>
  )
}

Details.propTypes = {
  cancelLinkRequest: PropTypes.func.isRequired,
  getLinkRequest: PropTypes.func.isRequired,
  loadingGetLink: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
  paymentLink: PropTypes.shape(),
  t: PropTypes.func.isRequired,
}

Details.defaultProps = {
  paymentLink: null,
}

export default enhanced(Details)
