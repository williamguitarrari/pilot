import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import Card from '../Card'
import ArrowBack from '../arrow-back.svg'
import styles from './styles.css'

const Segments = ({
  handleReturn,
  handleSubmit,
  options,
  subtitle,
}) => (
  <div>
    <div className={styles.segmentReturn}>
      <Button
        icon={<ArrowBack width={16} height={16} />}
        fill="clean"
        onClick={handleReturn}
      />
      <span>{subtitle}</span>
    </div>
    <div className={styles.segmentCardsWrapper}>
      {options.map(option => (
        <Card
          key={option.value}
          onSubmit={() => handleSubmit(option.value)}
        >
          <p className={styles.segmentCardContent}>
            {option.label}
          </p>
        </Card>
      ))}
    </div>
  </div>
)

Segments.propTypes = {
  handleReturn: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default Segments
