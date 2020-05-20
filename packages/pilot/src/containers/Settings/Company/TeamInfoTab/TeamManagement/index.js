import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Button,
  CardActions,
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconTeam from 'emblematic-icons/svg/Sellers32.svg'
import IconAdd from 'emblematic-icons/svg/Add24.svg'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import AddNewUserModal from './AddNewUserModal'
import UserTable from './UserTable'

class MenagementTeam extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
      isModalOpened: false,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.handleModalOpenAddUser = this.handleModalOpenAddUser.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  handleSectionTitleClick () {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
    }))
  }

  handleModalOpenAddUser () {
    this.setState({
      isModalOpened: true,
    })
  }

  handleCloseModal () {
    const { resetCreateUserState } = this.props

    resetCreateUserState()
    this.setState({
      isModalOpened: false,
    })
  }

  renderContent () {
    const {
      createUserStatus,
      deleteUserStatus,
      handleCreateUser,
      handleDeleteUser,
      t,
      team,
    } = this.props

    const {
      isModalOpened,
      loadingCreateUser,
    } = this.state
    return (
      <Fragment>
        <AddNewUserModal
          isOpen={isModalOpened}
          handleCloseModal={this.handleCloseModal}
          handleCreateUser={handleCreateUser}
          status={createUserStatus}
          loading={loadingCreateUser}
          t={t}
        />
        <CardActions>
          <Button
            size="default"
            icon={<IconAdd width={12} height={12} />}
            onClick={this.handleModalOpenAddUser}
          > {t('pages.settings.company.card.team.table.add_user')}
          </Button>

          <div style={{ flex: '1' }} />

          <strong>
            {t('pages.settings.company.card.team.table.user', { count: team.length })}
          </strong>
        </CardActions>
        {(deleteUserStatus.error || deleteUserStatus.success) && (
          <CardContent>
            {deleteUserStatus.error
              && (
                <Alert
                  type="error"
                  icon={<IconWarning height={16} width={16} />}
                >
                  <p>{deleteUserStatus.error}</p>
                </Alert>
              )
            }
            {deleteUserStatus.success
              && (
                <Alert
                  type="info"
                  icon={<IconInfo height={16} width={16} />}
                >
                  <p>{t('pages.settings.company.card.team.delete_user.success')}</p>
                </Alert>
              )
            }
          </CardContent>
        )}
        <CardContent>
          <UserTable
            handleDeleteUser={handleDeleteUser}
            t={t}
            team={team}
          />
        </CardContent>
      </Fragment>
    )
  }

  render () {
    const {
      t,
    } = this.props
    const { collapsed } = this.state

    return (
      <CardContent>
        <CardSection>
          <CardSectionDoubleLineTitle
            collapsed={collapsed}
            icon={<IconTeam height={16} width={16} />}
            onClick={
              this.handleSectionTitleClick
            }
            subtitle={t('pages.settings.company.card.team.subtitle.management')}
            title={t('pages.settings.company.card.team.title.management')}
          />
          {!collapsed
            && this.renderContent()
          }
        </CardSection>
      </CardContent>
    )
  }
}

MenagementTeam.propTypes = {
  createUserStatus: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  deleteUserStatus: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  resetCreateUserState: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    date_created: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
}

export default MenagementTeam
