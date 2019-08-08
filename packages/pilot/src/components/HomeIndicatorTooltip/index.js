import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import styles from './style.css'

const IndicatorTooltip = ({
  indicatorsTitles,
  label,
}) => (
  <span className={styles.content}>
    <span className={styles.label}>{label}</span>
    <Tooltip
      content={(
        <span className={styles.tooltip}>
          {indicatorsTitles}
        </span>
      )}
      placement="rightMiddle"
    >
      <IconInfo width={16} height={16} />
    </Tooltip>
  </span>
)

IndicatorTooltip.propTypes = {
  indicatorsTitles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  label: PropTypes.string,
}

IndicatorTooltip.defaultProps = {
  indicatorsTitles: null,
  label: null,
}

export default IndicatorTooltip
