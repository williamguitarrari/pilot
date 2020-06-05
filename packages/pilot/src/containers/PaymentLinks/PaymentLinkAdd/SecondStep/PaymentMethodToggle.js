import React from 'react'
import PropTypes from 'prop-types'
import {
  always, equals, F, ifElse, pipe, T,
} from 'ramda'
import {
  SegmentedSwitch,
} from 'former-kit'
import styles from './style.css'

const boolToSwitchValue = ifElse(
  equals(true),
  always('on'),
  always('off')
)

const switchValueToBool = ifElse(
  equals('on'),
  T,
  F
)

const PaymentMethodToggle = ({
  Icon, label, name, onChange, t, value,
}) => {
  const internalOnChange = pipe(
    switchValueToBool,
    onChange
  )

  return (
    <div className={styles.toggleRow}>
      <Icon />
      <span>{label}</span>
      <SegmentedSwitch
        className={styles.segmentedSwitch}
        name={name}
        onChange={internalOnChange}
        options={[
          {
            title: t('no'),
            value: 'off',
          },
          {
            title: t('yes'),
            value: 'on',
          },
        ]}
        value={boolToSwitchValue(value)}
      />
    </div>
  )
}

PaymentMethodToggle.propTypes = {
  Icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default PaymentMethodToggle
