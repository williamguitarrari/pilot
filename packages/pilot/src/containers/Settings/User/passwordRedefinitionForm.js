import Form from 'react-vanilla-form'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Alert,
  Button,
  CardActions,
  CardContent,
  Col,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import {
  always,
  equals,
  F,
  ifElse,
} from 'ramda'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

const required = t => value => (value ? null : t('pages.settings.user.card.access.field_required'))
const equalsString = (t, str1) => ifElse(
  equals(str1),
  F,
  always(t('pages.settings.user.card.access.password_equal'))
)

class PasswordRedefinitionForm extends Component {
  constructor (props) {
    super(props)

    const initalFormData = {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    }

    this.state = {
      initalFormData,
      currentFormData: initalFormData,
    }

    this.handleCancellation = this.handleCancellation.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { status: { success } } = nextProps

    if (success) {
      this.setState({
        currentFormData: this.state.initalFormData,
      })
    }
  }

  handleFormChange (data) {
    this.setState({
      currentFormData: data,
    })
  }

  handleCancellation () {
    this.setState({
      currentFormData: {},
    })
  }

  handleFormSubmit (data, errors) {
    if (!errors) {
      this.props.onSubmit(data)
    }
  }
  render () {
    const {
      status,
      t,
    } = this.props

    const {
      currentFormData: {
        new_password: password,
      },
    } = this.state

    return (
      <Form
        data={this.state.currentFormData}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
        validation={{
          current_password: required(t),
          new_password: required(t),
          new_password_confirmation: [
            required(t),
            equalsString(t, password),
          ],
        }}
      >
        <CardContent>
          <Grid>
            <Row>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('pages.settings.user.card.access.current_password')}
                  name="current_password"
                  type="password"
                />
              </Col>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('pages.settings.user.card.access.new_nassword')}
                  name="new_password"
                  type="password"
                />
              </Col>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('pages.settings.user.card.access.match_new_password')}
                  name="new_password_confirmation"
                  type="password"
                />
              </Col>
            </Row>
            <Row>
              <Col palm={12} tablet={12} desk={12} tv={12}>
                {status.error &&
                  <Alert
                    type="error"
                    icon={<IconWarning height={16} width={16} />}
                  >
                    <p>{status.error}</p>
                  </Alert>
                }
                {status.success &&
                  <Alert
                    type="info"
                    icon={<IconInfo height={16} width={16} />}
                  >
                    <p>{t('pages.settings.user.card.access.alert.success')}</p>
                  </Alert>
                }
              </Col>
            </Row>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            type="reset"
            fill="outline"
            size="default"
            onClick={this.handleCancellation}
          >
            {t('pages.settings.user.card.access.button_cancel')}
          </Button>
          <Button
            type="submit"
            size="default"
            fill="gradient"
          >
            {t('pages.settings.user.card.access.button_submit')}
          </Button>
        </CardActions>
      </Form>
    )
  }
}

PasswordRedefinitionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.shape({
    error: PropTypes.string,
    success: PropTypes.bool,
  }).isRequired,
  t: PropTypes.func,
}

PasswordRedefinitionForm.defaultProps = {
  t: t => t,
}

export default PasswordRedefinitionForm
