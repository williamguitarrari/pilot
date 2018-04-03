import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import {
  Card,
  CardSection,
  CardSectionTitle,
  Table,
} from 'former-kit'

import RecipientCard from '../RecipientCard'
import style from './style.css'

class RecipientSection extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false,
    }
    this.renderInstallmentsTable = this.renderInstallmentsTable.bind(this)
    this.renderInstallments = this.renderInstallments.bind(this)
    this.renderSingleRecipientInstallments = this.renderSingleRecipientInstallments.bind(this)
  }

  componentDidCatch () {
    this.setState({ hasError: true })
  }

  renderInstallmentsTable () {
    const {
      collapsed,
      columns,
      installments,
    } = this.props
    const isMultipleInstallments = installments.length >= 1

    if (!collapsed || !isMultipleInstallments) {
      return (
        <Table
          columns={columns}
          rows={installments}
          showAggregationRow={isMultipleInstallments}
        />
      )
    }
    return null
  }

  renderInstallments () {
    const {
      collapsed,
      collapsedTitle,
      liabilities,
      liabilitiesLabel,
      name,
      netAmount,
      netAmountLabel,
      onDetailsClick,
      outAmountLabel,
      status,
      statusLabel,
      title,
      totalAmount,
      totalLabel,
    } = this.props
    return (
      <Fragment>
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
        <CardSection>
          {this.renderInstallmentsTable()}
          <CardSectionTitle
            collapsed={collapsed}
            title={collapsed ? collapsedTitle : title}
            onClick={onDetailsClick}
          />
        </CardSection>
      </Fragment>
    )
  }

  renderSingleRecipientInstallments () {
    return (
      <CardSection>
        {this.renderInstallmentsTable()}
      </CardSection>
    )
  }

  render () {
    const {
      className,
    } = this.props
    const { hasError } = this.state

    return (
      <Card className={classNames(
          style.recipientSection,
          className
        )}
      >
        {!hasError
          && this.renderInstallments()
        }
        {hasError &&
          <CardSection>
            <p> Deu um erro, beleza ? </p>
          </CardSection>
        }
      </Card>
    )
  }
}

RecipientSection.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsedTitle: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    accessor: PropTypes.arrayOf(PropTypes.string),
    orderable: PropTypes.bool,
  })).isRequired,
  installments: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.string,
    payment_date: PropTypes.instanceOf(moment),
    original_payment_date: PropTypes.instanceOf(moment),
    net_amount: PropTypes.number,
    costs: PropTypes.shape({
      mdr: PropTypes.number,
      anticipation: PropTypes.number,
      chargeback: PropTypes.number,
      refund: PropTypes.number,
    }),
  })).isRequired,
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
  statusLabel: '',
  title: '',
  totalLabel: '',
  status: 'chargedback', // TODO: Change this to required when the model is fixed with the correct status
}

export default RecipientSection
