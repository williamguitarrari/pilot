import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Table,
  CardSection,
} from 'former-kit'
import {
  compose,
  defaultTo,
  equals,
  path,
  pipe,
  reverse,
  sortBy,
  toLower,
} from 'ramda'

import IconAdd from 'emblematic-icons/svg/Trash24.svg'
import RemoveUserModal from './RemoveUserModal'

const isAscending = equals('ascending')

const rowSort = accessor =>
  sortBy(compose(toLower, defaultTo(''), path(accessor)))

const getSort = (accessor, order) => (
  isAscending(order) ?
    rowSort(accessor) :
    pipe(rowSort(accessor), reverse)
)

const getRowsSort = (rows, columns) =>
  (orderColumn, order) => {
    const referenceColumn = columns[orderColumn]
    const referenceAcessor = referenceColumn.accessor
    const sort = getSort(referenceAcessor, order)
    return sort(rows)
  }

class UserTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      columns: this.getColumns(),
      isOpenRemoveUserModal: false,
      orderColumn: 0,
      order: 'ascending',
      rows: props.team,
      user: '',
    }

    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { team } = nextProps
    const { team: oldTeam } = this.props

    if (team !== oldTeam) {
      const {
        orderColumn: index,
        order,
      } = this.state
      this.handleOrderChange(index, order, team)
    }
  }

  getColumns () {
    return [
      { title: 'Nome', accessor: ['name'], orderable: false },
      { title: 'E-mail', accessor: ['email'], orderable: false },
      {
        title: 'Permissão',
        accessor: ['role'],
        orderable: true,
        renderer: user =>
          this.props.t(`models.user.permission.${user.role}`),
      },
      { title: 'Data de Criação', accessor: ['date_created'], orderable: true },
      {
        title: 'Ações',
        isAction: true,
        orderable: false,
        renderer: user => (
          <Button
            relevance="low"
            fill="outline"
            onClick={() => this.handleOpenModal(user)}
            icon={<IconAdd width={12} height={12} />}
          />
        ),
      },
    ]
  }

  handleOrderChange (index, order, nextRows) {
    const { columns } = this.state
    const { team } = this.props
    const rows = nextRows || team
    const sortByOrderColumn = getRowsSort(rows, columns)
    const sortedRows = sortByOrderColumn(index, order)
    this.setState({
      orderColumn: index,
      order,
      rows: sortedRows,
    })
  }

  handleOpenModal (user) {
    this.setState({
      isOpenRemoveUserModal: true,
      user,
    })
  }

  handleCloseModal () {
    this.setState({
      isOpenRemoveUserModal: false,
    })
  }

  render () {
    const {
      columns,
      order,
      orderColumn,
      rows,
    } = this.state

    const {
      handleDeleteUser,
    } = this.props

    return (
      <CardSection>
        {
          this.state.isOpenRemoveUserModal &&
          <RemoveUserModal
            handleCloseModal={this.handleCloseModal}
            handleDeleteUser={handleDeleteUser}
            isOpen={this.state.isOpenRemoveUserModal}
            user={this.state.user}
          />
        }
        <Table
          columns={columns}
          onOrderChange={this.handleOrderChange}
          orderSequence={order}
          orderColumn={orderColumn}
          rows={rows}
        />
      </CardSection>
    )
  }
}

UserTable.propTypes = {
  handleDeleteUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    date_created: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
}

export default UserTable
