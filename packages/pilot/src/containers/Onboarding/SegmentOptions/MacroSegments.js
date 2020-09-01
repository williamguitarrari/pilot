import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Card from '../Card'
import styles from './styles.css'

const MacroSegments = ({
  handleNotFound,
  handleSubmit,
  images,
  notFoundText,
  options,
}) => (
  <div>
    <div className={styles.cards}>
      {options.map((option, index) => {
        const Image = images[index]
        const isLastCard = index === images.length - 1

        return (
          <Card
            className={classNames({
              [styles.lastCard]: isLastCard,
            })}
            key={option}
            onSubmit={() => handleSubmit(option)}
          >
            <div className={styles.cardContent}>
              <Image width={32} height={32} />
              <p className={styles.cardLabel}>
                {option}
              </p>
            </div>
          </Card>
        )
      })}
    </div>

    <div className={styles.notFound}>
      <button
        onClick={() => handleNotFound()}
        role="link"
        type="button"
      >
        {notFoundText}
      </button>
    </div>
  </div>
)

MacroSegments.propTypes = {
  handleNotFound: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.func),
  notFoundText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
}

MacroSegments.defaultProps = {
  images: [],
}

export default MacroSegments
