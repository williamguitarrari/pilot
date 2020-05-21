import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  FormInput,
  Grid,
  ModalActions,
  ModalContent,
  Row,
} from 'former-kit'
import style from './style.css'

class ManualReviewForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
    }

    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePasswordChange (event) {
    this.setState({
      password: event.target.value,
    })
  }

  handleSubmit (event) {
    const { onConfirm } = this.props
    const { password } = this.state

    event.preventDefault()
    onConfirm(password)
  }

  render () {
    const {
      action,
      errorMessage,
      t,
      transactionId,
    } = this.props
    const { password } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <ModalContent>
          <Grid>
            <Row>
              <Col palm={12} tablet={12} desk={12} tv={12}>
                <span className={style.instructionMessage}>
                  {t('pages.manual_review.question_part_1')}
                  <strong className={style.textHighlight}>
                    {action === 'approve'
                      ? t('pages.manual_review.question_action_approve')
                      : t('pages.manual_review.question_action_refuse')
                    }
                  </strong>&nbsp;
                  {t('pages.manual_review.question_part_2')}
                  &nbsp;ID#{transactionId},&nbsp;
                  <strong className={style.textHighlight}>
                    {t('models.antifraud_analyses.status.refused')}
                  </strong>&nbsp;
                  {t('pages.manual_review.question_part_3')}
                </span>
              </Col>

              <Col palm={12} tablet={12} desk={12} tv={12} align="center">
                <FormInput
                  error={errorMessage}
                  label={t('pages.manual_review.password_password_label')}
                  onChange={this.handlePasswordChange}
                  type="password"
                  value={password}
                />
              </Col>

              <Col palm={12} tablet={12} desk={12} tv={12}>
                <p className={style.legalWarning}>
                  {t('pages.manual_review.legal_warning_approves_part_1')}&nbsp;
                  <strong className={style.textHighlight}>
                    {t('pages.manual_review.legal_warning_approves_part_2')}
                  </strong>
                  {t('pages.manual_review.legal_warning_approves_part_3')}&nbsp;
                  {action === 'approve'
                    ? t('pages.manual_review.legal_warning_approves_approve')
                    : t('pages.manual_review.legal_warning_approves_refuse')
                  }
                </p>
              </Col>
            </Row>
          </Grid>
        </ModalContent>
        <ModalActions>
          <Button
            type="submit"
            disabled={!password}
          >
            {action === 'approve'
              ? t('pages.manual_review.approve_action')
              : t('pages.manual_review.refuse_action')
            }
          </Button>
        </ModalActions>
      </form>
    )
  }
}

ManualReviewForm.propTypes = {
  action: PropTypes.oneOf(['approve', 'refuse']).isRequired,
  errorMessage: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  transactionId: PropTypes.number.isRequired,
}

ManualReviewForm.defaultProps = {
  errorMessage: '',
}

export default ManualReviewForm
