import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import { isMomentPropValidation } from 'former-kit'

import dateFormat from '../../formatters/longDate'

import style from './style.css'

const Separator = () => (
  <Fragment>
    &nbsp;<small>-</small>&nbsp;
  </Fragment>
)

const OperationsTitle = ({
  count,
  date: {
    end,
    start,
  },
  isTodayPreset,
  labels: {
    results,
    totalOf,
  },
}) => (
  <span className={style.title}>
    <strong>{dateFormat(start)}</strong>
    {!isTodayPreset && <Separator />}
    {!isTodayPreset && <strong>{dateFormat(end)}</strong>}
    {!isNil(count) && count > 0 && results
      && (
        <span>
          <Separator />
          {totalOf}
          &nbsp;
          <strong>
            {count}
          </strong>
          &nbsp;
          {results}
        </span>
      )
    }
  </span>
)

OperationsTitle.propTypes = {
  count: PropTypes.number,
  date: PropTypes.shape({
    end: isMomentPropValidation,
    start: isMomentPropValidation,
  }).isRequired,
  isTodayPreset: PropTypes.bool,
  labels: PropTypes.shape({
    results: PropTypes.string.isRequired,
    totalOf: PropTypes.string.isRequired,
  }).isRequired,
}

OperationsTitle.defaultProps = {
  count: null,
  isTodayPreset: false,
}

export default OperationsTitle
