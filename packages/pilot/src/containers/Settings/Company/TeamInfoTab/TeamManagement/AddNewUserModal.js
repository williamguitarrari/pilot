import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Alert,
  Button,
  FormInput,
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  RadioGroup,
} from 'former-kit'
import IconWarning from 'emblematic-icons/svg/ExclamationCircle32.svg'
import IconInfo from 'emblematic-icons/svg/InfoCircle32.svg'
import Close from 'emblematic-icons/svg/ClearClose32.svg'

import emailValidation from '../../../../../validation/email'
import isPaymentLink from '../../../../../validation/isPaymentLink'

const isEmail = t => emailValidation(t('validations.isEmail'))
const required = t => value => (
  value
    ? null
    : t('pages.settings.user.card.access.field_required')
)
const getPermissionList = (company) => {
  const permissionsList = [
    'admin',
    'read_only',
  ]
  const newArrayValue = isPaymentLink(company)
    ? 'seller'
    : 'read_write'

  return [
    ...permissionsList,
    newArrayValue,
  ]
}

const getValue = (value) => {
  if (value === 'seller') {
    return 'read_write'
  }

  return value
}

const getPermissionValues = (permissionsList, t) => (
  permissionsList.map(item => (
    {
      name: t(`models.user.permission.${item}`),
      value: getValue(item),
    }
  ))
)

class AddNewUserModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentData: {
        email: '',
        permission: '',
      },
      submittedEmail: null,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormOnChange = this.handleFormOnChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { status: { success } } = nextProps

    if (success) {
      this.setState({
        currentData: {
          email: '',
          permission: '',
        },
      })
    }
  }

  getPermissions () {
    const { company, t } = this.props
    const permissionsList = getPermissionList(company)
    const permissionsValues = getPermissionValues(permissionsList, t)

    return permissionsValues
  }

  handleFormSubmit (data, errors) {
    const { handleCreateUser } = this.props

    if (!errors) {
      this.setState({
        submittedEmail: data.email,
      })
      handleCreateUser(data)
    }
  }

  handleFormOnChange (currentData) {
    this.setState({
      currentData,
    })
  }

  render () {
    const {
      handleCloseModal,
      isOpen,
      status,
      t,
    } = this.props
    const {
      currentData,
      submittedEmail,
    } = this.state

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
      >
        <Form
          data={currentData}
          customErrorProp="error"
          onSubmit={this.handleFormSubmit}
          validation={
            {
              email: [
                required(t),
                isEmail(t),
              ],
              permission: required(t),
            }
          }
          onChange={this.handleFormOnChange}
        >
          <ModalTitle
            title={t('pages.settings.company.card.team.table.add_user')}
            titleAlign="center"
            onClose={handleCloseModal}
            closeIcon={<Close height={16} width={16} />}
          />
          <hr />
          <ModalContent>
            <p>
              {t('pages.settings.company.card.team.modal.identification')}
            </p>

            <FormInput
              label={t('email')}
              name="email"
            />

            <p>
              <small>
                {t('pages.settings.company.card.team.modal.access_level')}
              </small>
            </p>

            <RadioGroup
              options={this.getPermissions()}
              name="permission"
            />

            {status.error
              && (
                <Alert
                  type="error"
                  icon={<IconWarning height={16} width={16} />}
                >
                  <p>{status.error}</p>
                </Alert>
              )
            }
            {status.success
              && (
                <Alert
                  type="info"
                  icon={<IconInfo height={16} width={16} />}
                >
                  {t(
                    'pages.settings.company.card.team.modal.success',
                    { email: (submittedEmail) }
                  )}
                </Alert>
              )
            }
          </ModalContent>

          <ModalActions>
            <Button
              fill="outline"
              size="default"
              onClick={handleCloseModal}
              disabled={status.loading}
            >
              Cancelar
            </Button>

            <Button
              size="default"
              type="submit"
              disabled={status.loading}
            >
              Confirmar
            </Button>
          </ModalActions>
        </Form>
      </Modal>
    )
  }
}

AddNewUserModal.propTypes = {
  company: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  status: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default AddNewUserModal
