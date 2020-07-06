import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
} from 'former-kit'
import TableList from '../../../../components/TableList'
import tableColumns from './tableColumns'
import EmptyIcon from './EmptyIcon.svg'
import styles from './styles.css'

const TransactionsList = ({
  loading,
  onRowClick,
  rows,
  t,
}) => (
  <Card>
    <CardContent>
      {(rows.length > 0 || loading ? (
        <TableList
          columns={tableColumns(t)}
          loading={loading}
          onRowClick={onRowClick}
          rows={rows}
        />
      ) : (
        <div className={styles.emptyState}>
          <div><EmptyIcon /></div>
          <div>
            <h1>
              {t('pages.payment_link_detail.list.empty_state_title')}
            </h1>
            <p>
              {t('pages.payment_link_detail.list.empty_state_subtitle')}
            </p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)

TransactionsList.propTypes = {
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.shape({})),
  t: PropTypes.func.isRequired,
}

TransactionsList.defaultProps = {
  loading: false,
  onRowClick: () => {},
  rows: [],
}

export default TransactionsList

