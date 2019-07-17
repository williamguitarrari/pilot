import React from 'react'
import { Tooltip } from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

import MetricList from '../../../src/components/MetricList'

import Section from '../../Section'
import VisaIcon from './visa-icon.svg'
import MastercardIcon from './mastercard-icon.svg'
import GenericBrand from './generic-brand.svg'

import styles from './style.css'

const items = [
  {
    icon: <VisaIcon />,
    title: 'Visa',
    value: '60%',
  },
  {
    icon: <MastercardIcon />,
    title: 'Mastercard',
    value: '30%',
  },
  {
    icon: <GenericBrand />,
    title: (
      <span className={styles.tooltipBrand}>
        <span className={styles.title}>Outros</span>
        <Tooltip
          content={
            <span>American Express - 10%</span>
          }
          placement="rightMiddle"
        >
          <IconInfo width={16} height={16} />
        </Tooltip>
      </span>
    ),
    value: '10%',
  },
]

const MetricListExample = () => (
  <Section>
    <MetricList
      items={items}
      title="Bandeiras mais utilizadas"
    />
  </Section>
)

export default MetricListExample
