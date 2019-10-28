import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Col,
  Grid,
  Legend,
  Row,
} from 'former-kit'
import currencyFormatter from '../../formatters/currency'
import formatDate from '../../formatters/longDate'
import sufixNumber from '../../formatters/sufixNumber'
import statusLegends from '../../models/statusLegends'

import withSpinner from '../../components/withSpinner'
import YAxisLabel from '../../components/MetricChart/charts/YAxisLabel'

import style from './style.css'

const enhance = withSpinner(style.overlay)

const renderLegend = (legendKey) => {
  const status = statusLegends[legendKey]

  return (
    <Col
      desk={2}
      key={legendKey}
      palm={2}
      tablet={2}
      tv={1}
    >
      <Legend
        acronym={status.acronym}
        color={status.color}
      >
        {status.text}
      </Legend>
    </Col>
  )
}

const formatCurrency = value => currencyFormatter(value)

const Charts = ({ data, legendsTitle, t }) => (
  <Fragment>
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        data={data}
        height={380}
        margin={{
          left: 15,
        }}
        maxBarSize={17}
      >
        <XAxis
          axisLine={false}
          dataKey="name"
          tick={{ fontSize: 13 }}
          tickFormatter={formatDate}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          height={50}
          label={<YAxisLabel textAnchor="end" value={t('pages.transactions.chart_amount')} />}
          tick={{ fontSize: 13 }}
          tickFormatter={amount => sufixNumber(amount / 100)}
        />
        <CartesianGrid
          stroke="#d7d7d7"
          vertical={false}
        />
        <Tooltip
          cursor={{
            fillOpacity: 0.3,
          }}
          formatter={formatCurrency}
          labelFormatter={formatDate}
        />
        {
          Object.keys(statusLegends).map(legend => (
            <Bar
              dataKey={legend}
              fill={statusLegends[legend].color}
              key={legend}
              name={statusLegends[legend].text}
              stackId="a"
              stroke={statusLegends[legend].color}
              type="monotone"
            />
          ))
        }
      </BarChart>
    </ResponsiveContainer>
    <div className={style.legendContainer}>
      <span className={style.legendTitle}> {legendsTitle} </span>
      <Grid className={style.stretch}>
        <Row stretch>
          {Object.keys(statusLegends).map(renderLegend)}
        </Row>
      </Grid>
    </div>
  </Fragment>
)

Charts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  legendsTitle: PropTypes.string,
  t: PropTypes.func.isRequired,
}

Charts.defaultProps = {
  legendsTitle: '',
}

export default enhance(Charts)
