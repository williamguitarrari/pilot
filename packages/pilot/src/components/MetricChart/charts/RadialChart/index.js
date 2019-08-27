import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Flexbox,
} from 'former-kit'

import sizePropValidation from '../../sizePropValidation'
import Radial from './Radial'

import style from './style.css'

const RadialChart = ({
  data,
  labelFormatter,
  styles,
}) => (
  <Flexbox className={style.radialChart}>
    {data.map(({ fill, label, value }) => (
      <div
        key={`${label}-${value}`}
        className={style.radial}
      >
        <Radial
          data={{
            fill,
            value,
          }}
          labelFormatter={labelFormatter}
          styles={styles}
          title={label}
        />
        <span>{label}</span>
      </div>
    ))}
  </Flexbox>
)

RadialChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  labelFormatter: PropTypes.func,
  styles: PropTypes.shape({
    colors: PropTypes.shape({
      fill: PropTypes.string,
    }),
    height: sizePropValidation,
    width: sizePropValidation,
  }),
}

const defaultLabelFormatter = value => (
  <Fragment>
    {value}
    <tspan>%</tspan>
  </Fragment>
)

RadialChart.defaultProps = {
  labelFormatter: defaultLabelFormatter,
  styles: {},
}

export default RadialChart
