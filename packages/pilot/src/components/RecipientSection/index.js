import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import classNames from 'classnames'
import {
  isEmpty,
  take,
} from 'ramda'
import {
  Card,
  CardSection,
  CardSectionTitle,
  Table,
} from 'former-kit'
import { matchToPrint } from '../../validation/matchToMediaQuery'
import RecipientCard from '../RecipientCard'
import style from './style.css'

const minimumInstallmentsRows = 5

class RecipientSection extends PureComponent {
  constructor (props) {
    super(props)
    this.renderInstallmentsTable = this.renderInstallmentsTable.bind(this)
    this.renderInstallments = this.renderInstallments.bind(this)
  }

  renderInstallmentsTable ({
    installmentsRowSize,
    isMultipleInstallments,
    isSingleRecipient,
  }) {
    const {
      collapsed,
      collapsedTitle,
      columns,
      installments,
      onDetailsClick,
      title,
    } = this.props

    const isPrint = matchToPrint()
    const rows = isPrint
      ? installments
      : take(installmentsRowSize, installments)

    return (
      <Fragment>
        {((!isSingleRecipient && !collapsed) || isSingleRecipient)
          && (
            <Table
              columns={columns}
              rows={rows}
              showAggregationRow={
                rows.length === installments.length && isMultipleInstallments
              }
            />
          )
        }
        {(installments.length > minimumInstallmentsRows || !isSingleRecipient)
          && (
            <CardSectionTitle
              collapsed={collapsed}
              title={
                collapsed
                  ? collapsedTitle
                  : title
              }
              onClick={onDetailsClick}
            />
          )
        }
      </Fragment>
    )
  }

  renderInstallments () {
    const {
      collapsed,
      installments,
      isSingleRecipient,
      liabilities,
      liabilitiesLabel,
      name,
      netAmount,
      netAmountLabel,
      outAmountLabel,
      status,
      statusLabel,
      totalAmount,
      totalLabel,
    } = this.props

    const hasInstallments = !isEmpty(installments)
    const isMultipleInstallments = installments.length > 1
    const installmentsRowSize = collapsed
      ? minimumInstallmentsRows
      : installments.length

    return (
      <Fragment>
        {!isSingleRecipient
          && (
            <RecipientCard
              liabilities={liabilities}
              liabilitiesLabel={liabilitiesLabel}
              name={name}
              netAmount={netAmount}
              netAmountLabel={netAmountLabel}
              outAmountLabel={outAmountLabel}
              status={status}
              statusLabel={statusLabel}
              totalAmount={totalAmount}
              totalLabel={totalLabel}
            />
          )
        }
        <CardSection>
          {hasInstallments
            && (
              this.renderInstallmentsTable({
                installmentsRowSize,
                isMultipleInstallments,
                isSingleRecipient,
              })
            )
          }
        </CardSection>
      </Fragment>
    )
  }

  render () {
    const {
      className,
    } = this.props

    return (
      <Card
        className={classNames(
          style.recipientSection,
          className
        )}
      >
        {this.renderInstallments()}
      </Card>
    )
  }
}

RecipientSection.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsedTitle: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.arrayOf(PropTypes.string),
    orderable: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
  installments: PropTypes.arrayOf(PropTypes.shape({
    costs: PropTypes.shape({
      anticipation: PropTypes.number,
      chargeback: PropTypes.number,
      mdr: PropTypes.number,
      refund: PropTypes.number,
    }),
    net_amount: PropTypes.number,
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    original_payment_date: PropTypes.instanceOf(moment),
    payment_date: PropTypes.instanceOf(moment),
    status: PropTypes.string,
  })).isRequired,
  isSingleRecipient: PropTypes.bool.isRequired,
  liabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  liabilitiesLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  netAmount: PropTypes.number.isRequired,
  netAmountLabel: PropTypes.string,
  onDetailsClick: PropTypes.func.isRequired,
  outAmountLabel: PropTypes.string,
  status: PropTypes.string,
  statusLabel: PropTypes.string,
  title: PropTypes.string,
  totalAmount: PropTypes.number.isRequired,
  totalLabel: PropTypes.string,
}

RecipientSection.defaultProps = {
  className: '',
  collapsed: true,
  collapsedTitle: '',
  liabilitiesLabel: '',
  netAmountLabel: '',
  outAmountLabel: '',
  status: '',
  statusLabel: '',
  title: '',
  totalLabel: '',
}

export default RecipientSection
