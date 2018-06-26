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
import statusLegends from '../../models/statusLegends'
import style from './style.css'

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

const formatCurrency = value =>
  currencyFormatter(value)

const Charts = ({ data, legendsTitle }) => (
  <Fragment>
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        data={data}
        height={380}
        maxBarSize={17}
        width={600}
      >
        <XAxis
          axisLine={false}
          dataKey="name"
          tick={{ fontSize: 11 }}
          tickFormatter={formatDate}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          height={50}
          tick={{ fontSize: 11 }}
          tickFormatter={formatCurrency}
        />
        <CartesianGrid
          stroke="#d7d7d7"
          vertical={false}
        />
        <Tooltip
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
}

Charts.defaultProps = {
  legendsTitle: '',
}

export default Charts
