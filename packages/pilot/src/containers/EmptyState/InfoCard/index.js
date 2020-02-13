import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  Flexbox,
} from 'former-kit'
import styles from './styles.css'

const InfoCard = ({
  buttonLabel,
  buttonLink,
  subtitle,
  title,
}) => (
  <Card>
    <CardContent>
      <Flexbox
        alignItems="center"
        className={styles.infoCard}
        justifyContent="space-between"
      >
        <div>
          <p>{title}</p>
          <span>{subtitle}</span>
        </div>
        <a href={buttonLink} target="_blank" rel="noreferrer noopener">
          <Button>{buttonLabel}</Button>
        </a>
      </Flexbox>
    </CardContent>
  </Card>
)

InfoCard.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default InfoCard
