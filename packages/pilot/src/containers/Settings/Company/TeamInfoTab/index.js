import React from 'react'
import PropTypes from 'prop-types'
import TeamManagement from './TeamManagement'

const TeamInfoTab = ({
  company,
  createUserStatus,
  deleteUserStatus,
  handleCreateUser,
  handleDeleteUser,
  resetCreateUserState,
  t,
  team,
}) => (
  <TeamManagement
    company={company}
    createUserStatus={createUserStatus}
    deleteUserStatus={deleteUserStatus}
    handleCreateUser={handleCreateUser}
    handleDeleteUser={handleDeleteUser}
    resetCreateUserState={resetCreateUserState}
    t={t}
    team={team}
  />
)

TeamInfoTab.propTypes = {
  company: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
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

export default TeamInfoTab
