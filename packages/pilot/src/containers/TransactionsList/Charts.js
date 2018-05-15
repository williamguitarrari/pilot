import React from 'react'
import PropTypes from 'prop-types'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Legend as FormerLegend } from 'former-kit'
import formatCurrency from '../../formatters/currency'
import formatDate from '../../formatters/longDate'
import statusLegends from '../../models/statusLegends'
import style from './style.css'

const renderLegend = ({
  dataKey, // eslint-disable-line
  inactive, // eslint-disable-line
}) => {
  const status = statusLegends[dataKey]

  return (
    <span
      key={dataKey}
      className={style.legend}
    >
      <FormerLegend
        acronym={status.acronym}
        color={status.color}
        outline={inactive}
      >
        {status.text}
      </FormerLegend>
    </span>
  )
}

const Charts = ({ data }) => (
  <ResponsiveContainer width="100%" height={500}>
    <BarChart
      data={data}
      height={300}
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
      <Legend
        content={({ payload }) => (
          <span className={style.legendContainer}>
            { payload.map(renderLegend) }
          </span>
        )}
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
)

Charts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
}

export default Charts
