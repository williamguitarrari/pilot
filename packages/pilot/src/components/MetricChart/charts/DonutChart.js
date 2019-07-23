import React from 'react'
import PropTypes from 'prop-types'
import {
  applySpec,
  identity,
  map,
  prop,
} from 'ramda'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import sizePropValidation from '../sizePropValidation'

const transformData = map(applySpec({
  name: prop('label'),
  value: prop('value'),
}))

const MetricDonutChart = ({
  data,
  labelFormatter,
  styles: {
    height,
    innerRadius,
    width,
  },
}) => (
  <ResponsiveContainer
    height={height}
    width={width}
  >
    <PieChart>
      <Pie
        dataKey="value"
        data={transformData(data)}
        innerRadius={innerRadius}
        paddingAngle={2}
      >
        {
          data.map(({ color, value }) => (
            <Cell
              key={`${value}-${color}`}
              fill={color}
            />
          ))
        }
      </Pie>
      <Tooltip
        labelFormatter={labelFormatter}
      />
    </PieChart>
  </ResponsiveContainer>
)

MetricDonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string.isRequired,
      legendRenderer: PropTypes.func,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  labelFormatter: PropTypes.func,
  styles: PropTypes.shape({
    height: sizePropValidation,
    innerRadius: PropTypes.number.isRequired,
    width: sizePropValidation,
  }).isRequired,
}

MetricDonutChart.defaultProps = {
  labelFormatter: identity,
}

export default MetricDonutChart
