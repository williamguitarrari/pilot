import React from 'react'
import PropTypes from 'prop-types'
import {
  evolve,
  juxt,
  uncurryN,
} from 'ramda'
import {
  LabelList,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts'

import CustomLabel from './CustomLabel'

import sizePropValidation from '../../sizePropValidation'

const buildChartData = uncurryN(2, colors => juxt([
  evolve({
    fill: dataColor => dataColor || colors.fill,
  }),
]))

const Radial = ({
  data,
  labelFormatter,
  styles: {
    colors = {
      fill: '#2bb1d1',
    },
    height = 120,
    innerRadius = '75%',
    outerRadius = '100%',
    width,
  },
}) => {
  const chartData = buildChartData(colors, data)

  return (
    <ResponsiveContainer
      height={height}
      width={width}
    >
      <RadialBarChart
        data={chartData}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
      >
        <PolarAngleAxis
          domain={[0, 100]}
          tick={false}
          type="number"
        />
        <RadialBar
          background
          dataKey="value"
        >
          <LabelList
            content={props => (
              <CustomLabel
                {...props}
                labelFormatter={labelFormatter}
              />
            )}
            dataKey="value"
          />
        </RadialBar>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

Radial.propTypes = {
  data: PropTypes.shape({
    fill: PropTypes.string,
    value: PropTypes.number.isRequired,
  }).isRequired,
  labelFormatter: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    colors: PropTypes.shape({
      fill: PropTypes.string,
    }),
    height: sizePropValidation,
    width: sizePropValidation,
  }),
}

Radial.defaultProps = {
  styles: {},
}

export default Radial
