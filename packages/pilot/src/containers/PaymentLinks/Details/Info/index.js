import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import {
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'
import concurrency from '../../../../formatters/currency'
import styles from './styles.css'

const formatDate = dateString => moment(dateString).format('DD/MM/YYYY HH:mm')

const renderItem = (label, value) => (
  <div className={styles.item}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
)

const Info = ({
  amount, createdAt, expiresAt, t,
}) => (
  <Card>
    <CardTitle title={t('pages.payment_link_detail.info.title')} />
    <CardContent>
      <div>
        <div className={styles.firstRow}>
          {renderItem(t('pages.payment_link_detail.info.amount'), concurrency(amount))}
          {renderItem(t('pages.payment_link_detail.info.date_created'), formatDate(createdAt))}
        </div>
        {renderItem(
          t('pages.payment_link_detail.info.expires_at'),
          t('pages.payment_link_detail.info.until', { date: formatDate(expiresAt) })
        )}
      </div>
    </CardContent>
  </Card>
)

Info.propTypes = {
  amount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  expiresAt: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default Info
