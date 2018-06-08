import React from 'react'
import {
  arrayOf,
  string,
  shape,
  bool,
  func,
  instanceOf,
  object,
  number,
} from 'prop-types'
import moment from 'moment'
import IconTransactions from 'emblematic-icons/svg/Transaction32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'
import {
  Alert,
  Grid,
  Row,
  Col,
  Card,
  CardContent,
  CardTitle,
  CardSection,
  CardSectionTitle,
} from 'former-kit'

import style from './style.css'

import Filter from '../Filter'
import Charts from './Charts'
import Table from './Table'

import formatCurrency from '../../formatters/currency'
import formatDate from '../../formatters/longDate'

const renderDateSelected = ({ start, end }) => {
  if (!start && !end) {
    return 'todo o período'
  }

  if (moment(start).isSame(end, 'days')) {
    return 'Hoje'
  }

  return `${formatDate(start)} até ${formatDate(end)}`
}

const renderTableSubtitle = count => (
  <div className={style.tableButtons}>
    <span>total de {count} transações</span>
  </div>
)

const TransactionsList = ({
  amount,
  clearFiltersLabel,
  collapsed,
  columns,
  count,
  data,
  dateLabels,
  dateSelectorPresets,
  dates,
  filterConfirmLabel,
  filterOptions,
  filtersTitle,
  findByLabel,
  graphicLegendsTittle,
  graphicTittle,
  handleRowClick,
  handleChartsCollapse,
  handleFilterChange,
  handleOrderChange,
  handlePageChange,
  handlePageCountChange,
  handlePendingReviewsFilter,
  itemsPerPageLabel,
  loading,
  noContentFoundMessage,
  ofLabel,
  order,
  orderColumn,
  pagination,
  pendingReviewsCount,
  periodSummaryLabel,
  rows,
  search,
  selectedPage,
  t,
  tableTitle,
  totalVolumeLabel,
  transactionsNumberLabel,
  tryFilterAgainMessage,
  values,
  expandedRows,
  selectedRows,
  handleExpandRow,
  handleSelectRow,
}) => (
  <Grid>
    {
      pendingReviewsCount > 0 &&
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <div className={style.parentWidth}>
              <Alert
                action={t('view_transactions')}
                icon={<IconWarning height={16} width={16} />}
                onDismiss={handlePendingReviewsFilter}
                type="warning"
              >
                <p>
                  <strong>{t('alert.warning')}!</strong>&nbsp;
                  {
                    t('alert.pending_review', { count: pendingReviewsCount })
                  }
                </p>
              </Alert>
            </div>
          </Col>
        </Row>
    }
    <Row>
      <Col
        palm={12}
        tablet={12}
        desk={12}
        tv={12}
      >
        <Filter
          clearLabel={clearFiltersLabel}
          confirmLabel={filterConfirmLabel}
          dateLabels={dateLabels}
          datePresets={dateSelectorPresets}
          dates={dates}
          disabled={loading}
          findByLabel={findByLabel}
          onChange={handleFilterChange}
          options={filterOptions}
          search={search}
          title={filtersTitle}
          values={values}
        />
      </Col>
      <Col
        palm={12}
        tablet={12}
        desk={12}
        tv={12}
      >
        {
          rows.length > 0 &&
          <Card>
            <CardTitle
              title={
                <h2 className={style.customTitle}>
                  <IconTransactions width={16} height={16} />
                  {periodSummaryLabel} <strong>{renderDateSelected(dates)}</strong>
                </h2>
              }
              subtitle={
                <h3 className={style.customTitle}>
                  {transactionsNumberLabel} <strong>{count}</strong>
                  <div className={style.verticalDivider} />
                  {totalVolumeLabel} <strong>{formatCurrency(amount)}</strong>
                </h3>
              }
            />

            <CardContent>
              <CardSection>
                <CardSectionTitle
                  title={graphicTittle}
                  collapsed={collapsed}
                  onClick={handleChartsCollapse}
                />
                {!collapsed &&
                  <CardContent>
                    <Charts
                      data={data}
                      legendsTitle={graphicLegendsTittle}
                    />
                  </CardContent>
                }
              </CardSection>
            </CardContent>

            <CardContent>
              <CardSection>
                <CardSectionTitle
                  title={tableTitle}
                  subtitle={renderTableSubtitle(count, loading)}
                />
                <Table
                  expandable
                  maxColumns={7}
                  rows={rows}
                  columns={columns}
                  order={order}
                  orderColumn={orderColumn}
                  pagination={pagination}
                  handleRowClick={handleRowClick}
                  handleOrderChange={handleOrderChange}
                  handlePageChange={handlePageChange}
                  handlePageCountChange={handlePageCountChange}
                  loading={loading}
                  selectedPage={selectedPage}
                  itemsPerPageLabel={itemsPerPageLabel}
                  ofLabel={ofLabel}
                  expandedRows={expandedRows}
                  selectedRows={selectedRows}
                  handleExpandRow={handleExpandRow}
                  handleSelectRow={handleSelectRow}
                />
              </CardSection>
            </CardContent>
          </Card>
        }
        {
          rows.length <= 0 &&
          !loading &&
          <div className={style.parentWidth}>
            <Alert
              type="info"
              icon={<IconInfo height={16} width={16} />}
            >
              <p>
                <strong>{noContentFoundMessage}</strong>
                {tryFilterAgainMessage}
              </p>
            </Alert>
          </div>
        }
      </Col>
    </Row>
  </Grid>
)

TransactionsList.propTypes = {
  amount: number,
  count: number,
  clearFiltersLabel: string.isRequired, // eslint-disable-line react/no-typos
  collapsed: bool.isRequired, // eslint-disable-line react/no-typos
  columns: arrayOf(object),
  data: arrayOf(object), // eslint-disable-line
  dateLabels: shape({
    anyDate: string,
    cancel: string,
    confirmPeriod: string,
    custom: string,
    day: string,
    daySelected: string,
    daysSelected: string,
    end: string,
    noDayOrPeriodSelected: string,
    period: string,
    select: string,
    start: string,
    today: string,
  }).isRequired,
  dates: shape({
    start: instanceOf(moment),
    end: instanceOf(moment),
  }),
  dateSelectorPresets: arrayOf(shape({
    key: string,
    title: string,
    date: string,
    items: arrayOf(shape({
      title: string,
      date: func,
    })),
  })).isRequired,
  expandedRows: arrayOf(number).isRequired,
  filterConfirmLabel: string.isRequired, // eslint-disable-line react/no-typos
  filterOptions: arrayOf(shape({
    key: string,
    name: string,
    items: arrayOf(shape({
      label: string,
      value: string,
    })),
  })).isRequired,
  filtersTitle: string.isRequired, // eslint-disable-line react/no-typos
  findByLabel: string.isRequired, // eslint-disable-line react/no-typos
  graphicLegendsTittle: string.isRequired, // eslint-disable-line react/no-typos
  graphicTittle: string.isRequired, // eslint-disable-line react/no-typos
  handleChartsCollapse: func.isRequired, // eslint-disable-line react/no-typos
  handleExpandRow: func.isRequired, // eslint-disable-line react/no-typos
  handleRowClick: func.isRequired, // eslint-disable-line react/no-typos
  handleFilterChange: func.isRequired, // eslint-disable-line react/no-typos
  handleOrderChange: func.isRequired, // eslint-disable-line react/no-typos
  handlePageChange: func.isRequired, // eslint-disable-line react/no-typos
  handlePageCountChange: func.isRequired, // eslint-disable-line react/no-typos
  handlePendingReviewsFilter: func.isRequired, // eslint-disable-line react/no-typos
  handleSelectRow: func.isRequired, // eslint-disable-line react/no-typos
  itemsPerPageLabel: string.isRequired, // eslint-disable-line react/no-typos
  loading: bool.isRequired, // eslint-disable-line react/no-typos
  noContentFoundMessage: string.isRequired, // eslint-disable-line react/no-typos
  ofLabel: string.isRequired, // eslint-disable-line react/no-typos
  order: string,
  orderColumn: number,
  pagination: shape({
    offset: number,
    total: number,
  }).isRequired,
  pendingReviewsCount: number.isRequired, // eslint-disable-line react/no-typos
  periodSummaryLabel: string.isRequired, // eslint-disable-line react/no-typos
  rows: arrayOf(object).isRequired, // eslint-disabled-line react/no-typos
  search: string,
  selectedPage: number,
  selectedRows: arrayOf(number).isRequired,
  t: func.isRequired, // eslint-disable-line react/no-typos
  tableTitle: string.isRequired, // eslint-disable-line react/no-typos
  totalVolumeLabel: string.isRequired, // eslint-disable-line react/no-typos
  transactionsNumberLabel: string.isRequired, // eslint-disable-line react/no-typos
  tryFilterAgainMessage: string.isRequired, // eslint-disable-line react/no-typos
  values: object, // eslint-disable-line
}

TransactionsList.defaultProps = {
  amount: 0,
  columns: [],
  count: 0,
  dates: {
    start: moment(),
    end: moment(),
  },
  order: 'descending',
  orderColumn: 0,
  search: '',
  selectedPage: 15,
  values: [],
}

export default TransactionsList
