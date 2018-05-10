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

import statusLegends from '../../models/statusLegends'
import formatCurrency from '../../formatters/currency'
import formatDate from '../../formatters/longDate'

const Charts = ({ data }) => (
  <ResponsiveContainer width="100%" height={500}>
    <BarChart
      width={600}
      height={300}
      data={data}
      maxBarSize={17}
    >
      <XAxis
        dataKey="name"
        axisLine={false}
        tickMargin={10}
        tick={{ fontSize: 11 }}
        tickFormatter={formatDate}
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
        iconType="square"
        iconSize={19}
      />
      {
        Object.keys(statusLegends).map(legend => (
          <Bar
            type="monotone"
            key={legend}
            name={statusLegends[legend].text}
            dataKey={legend}
            stackId="a"
            fill={statusLegends[legend].color}
            stroke={statusLegends[legend].color}
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
