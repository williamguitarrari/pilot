import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import {
  apply,
  applySpec,
  map,
  mergeLeft,
  pipe,
  prop,
  props,
  toString,
} from 'ramda'
import {
  CardContent,
  CardTitle,
} from 'former-kit'

import MetricCard from '../MetricCard'
import List from '../MetricList/List'

import sizePropValidation from './sizePropValidation'
import StatusIcon from './status-icon.svg'
import MetricBarChart from './charts/BarChart'
import MetricAreaChart from './charts/AreaChart'
import MetricDonutChart from './charts/DonutChart'

import style from './style.css'

const renderChart = ({
  chartLegend,
  styles,
  tickFormatter,
  tooltip,
  type,
}, data) => {
  let stylesCopy = styles
  let ChartComponent

  switch (type) {
    case 'bar':
      ChartComponent = MetricBarChart
      break
    case 'area':
      ChartComponent = MetricAreaChart
      break
    case 'donut':
      ChartComponent = MetricDonutChart
      break
    case 'pizza':
      stylesCopy = mergeLeft(stylesCopy, {
        innerRadius: 0,
      })
      ChartComponent = MetricDonutChart
      break
    default:
      ChartComponent = null
  }

  return ChartComponent && (
    <ChartComponent
      data={data}
      legend={chartLegend}
      styles={stylesCopy}
      tickFormatter={tickFormatter}
      tooltip={tooltip}
    />
  )
}

const labelOrRenderer = ([renderer, label]) => (
  (renderer && renderer(label)) || label
)

const buildLegendItems = map(applySpec({
  icon: pipe(
    prop('color'),
    color => apply(createElement, [
      StatusIcon,
      { fill: color },
    ])
  ),
  title: pipe(
    props(['legendRenderer', 'label']),
    labelOrRenderer
  ),
  value: pipe(
    prop('value'),
    toString
  ),
}))

const MetricChart = ({
  chartLegend,
  data,
  loading,
  showLegend,
  styles,
  tickFormatter,
  title,
  tooltip,
  type,
}) => (
  <MetricCard loading={loading}>
    <CardTitle
      className={style.title}
      title={title}
    />
    <CardContent className={style.content}>
      {renderChart(
        {
          chartLegend,
          styles,
          tickFormatter,
          tooltip,
          type,
        },
        data
      )}
    </CardContent>
    {showLegend && (
      <CardContent>
        <List items={buildLegendItems(data)} />
      </CardContent>
    )}
  </MetricCard>
)

MetricChart.propTypes = {
  chartLegend: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string.isRequired,
      legendRenderer: PropTypes.func,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  showLegend: PropTypes.bool,
  styles: PropTypes.shape({
    colors: PropTypes.object,
    height: sizePropValidation,
    width: sizePropValidation,
  }).isRequired,
  tickFormatter: PropTypes.func,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.shape({
    labelFormatter: PropTypes.func,
  }),
  type: PropTypes.oneOf([
    'area', 'bar', 'donut', 'pizza',
  ]).isRequired,
}

MetricChart.defaultProps = {
  chartLegend: null,
  loading: false,
  showLegend: false,
  tickFormatter: null,
  tooltip: {},
}

export default MetricChart
