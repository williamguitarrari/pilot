import React from 'react'
import PropTypes from 'prop-types'
import ClickableDiv from '../../../components/ClickableDiv'
import styles from './styles.css'

const RecommendedBadge = ({ t }) => (
  <div className={styles.recommendedBadge}>
    {t('recommended')}
  </div>
)

RecommendedBadge.propTypes = {
  t: PropTypes.func.isRequired,
}

const Card = ({
  imgAlt, imgSrc, message, onClick, recommended, t, title,
}) => (
  <ClickableDiv
    className={styles.dashboardCard}
    onClick={onClick}
    onKeyPress={onClick}
  >
    {recommended && <RecommendedBadge t={t} />}
    <img src={imgSrc} alt={imgAlt} />
    <h1>{title}</h1>
    <p>{message}</p>
  </ClickableDiv>
)

Card.propTypes = {
  imgAlt: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  recommended: PropTypes.bool,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

Card.defaultProps = {
  recommended: false,
}

export default Card
