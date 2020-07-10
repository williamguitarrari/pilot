import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose, path, nth } from 'ramda'
import {
  Col,
  Grid,
  Row,
} from 'former-kit'
import { withError } from '../../ErrorBoundary'
import {
  getLinkRequest as getLinkRequestAction,
  getTransactionsRequest as getTransactionsRequestAction,
  cancelLinkRequest as cancelLinkRequestAction,
} from './actions'
import {
  DetailsHeader,
  DetailsInfo,
  DisableLinkModal,
  PaymentMethods,
  TransactionsList,
} from '../../../containers/PaymentLinks/Details'
import Spinner from '../../../components/Spinner'
import styles from './styles.css'

const mapStateToProps = ({
  paymentLinksDetails: {
    loadingGetLink,
    loadingGetTransactions,
    paymentLink,
    transactions,
  },
}) => ({
  loadingGetLink,
  loadingGetTransactions,
  paymentLink,
  transactions,
})

const mapDispatchToProps = {
  cancelLinkRequest: cancelLinkRequestAction,
  getLinkRequest: getLinkRequestAction,
  getTransactionsRequest: getTransactionsRequestAction,
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
  getTransactionsRequest,
  history,
  loadingGetLink,
  loadingGetTransactions,
  match,
  paymentLink,
  t,
  transactions,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getLinkRequest(match.params.id)
    getTransactionsRequest(match.params.id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onCancelLink = () => {
    cancelLinkRequest(match.params.id)
    setIsOpen(false)
  }

  const onRowClick = (rowIndex) => {
    const { id } = nth(rowIndex, transactions)
    history.push(`/transactions/${id}`)
  }

  return !loadingGetLink
    ? (
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
          <Row stretch>
            <Col desk={6} palm={6} tablet={6} tv={6}>
              <DetailsInfo
                amount={paymentLink.amount}
                createdAt={paymentLink.date_created}
                expiresAt={paymentLink.expires_at}
                t={t}
              />
            </Col>
            <Col desk={6} palm={6} tablet={6} tv={6}>
              <PaymentMethods
                boletoConfig={path(['payment_config', 'boleto'], paymentLink)}
                creditCardConfig={path(['payment_config', 'credit_card'], paymentLink)}
                t={t}
              />
            </Col>
          </Row>
          <Row>
            <Col {...defaultColumnSize}>
              <TransactionsList
                loading={loadingGetTransactions}
                onRowClick={onRowClick}
                rows={transactions}
                t={t}
              />
            </Col>
          </Row>
        </Grid>
      </>
    )
    : (
      <div className={styles.loading}>
        <Spinner />
      </div>
    )
}

Details.propTypes = {
  cancelLinkRequest: PropTypes.func.isRequired,
  getLinkRequest: PropTypes.func.isRequired,
  getTransactionsRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loadingGetLink: PropTypes.bool.isRequired,
  loadingGetTransactions: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
  paymentLink: PropTypes.shape(),
  t: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({})),
}

Details.defaultProps = {
  paymentLink: null,
  transactions: [],
}

export default enhanced(Details)
