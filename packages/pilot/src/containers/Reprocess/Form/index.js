import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Grid,
  ModalActions,
  ModalContent,
  Row,
} from 'former-kit'
import formatCardNumber from '../../../formatters/cardNumber'
import formatCurrency from '../../../formatters/currency'
import ReprocessDetails from '../../../components/ReprocessDetails'

class ReprocessForm extends Component {
  constructor (props) {
    super(props)

    this.getFormattedTransaction = this.getFormattedTransaction.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getFormattedTransaction () {
    const {
      amount,
      cardFirstDigits,
      cardLastDigits,
      holderName,
      installments,
      t,
    } = this.props

    return {
      amount: formatCurrency(amount),
      cardNumber: `${formatCardNumber(cardFirstDigits)} ${cardLastDigits}`,
      holderName,
      installments: t('installment', { count: installments }),
    }
  }

  handleSubmit (event) {
    this.props.onConfirm()
    event.preventDefault()
    event.stopPropagation()
  }

  render () {
    const {
      loading,
      t,
    } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <ModalContent>
          <Grid>
            <Row stretch>
              <Col palm={12} tablet={12} desk={12} tv={12}>
                <ReprocessDetails
                  contents={this.getFormattedTransaction()}
                  labels={{
                    amount: t('amount'),
                    cardNumber: t('card_number'),
                    holderName: t('holder_name'),
                    installments: t('installments'),
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </ModalContent>
        <ModalActions>
          <Button
            disabled={loading}
            fill="gradient"
            type="submit"
          >
            {t('pages.reprocess.submit')}
          </Button>
        </ModalActions>
      </form>
    )
  }
}

ReprocessForm.propTypes = {
  amount: PropTypes.number.isRequired,
  cardFirstDigits: PropTypes.string.isRequired,
  cardLastDigits: PropTypes.string.isRequired,
  holderName: PropTypes.string.isRequired,
  installments: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ReprocessForm.defaultProps = {
  loading: false,
}

export default ReprocessForm
