import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox } from 'former-kit'
import formatPercent from '../../formatters/percent'
import formatCurrency from '../../formatters/currency'
import styles from './styles.css'

const formatterByType = {
  currency: formatCurrency,
  percent: formatPercent,
}

const FeeTitleAndValues = ({ t, title, values }) => (
  <div>
    <p className={styles.title}>{title}</p>
    <Flexbox className={styles.feeValuesWrapper}>
      {values.map(({
        translationPath, type, value, valueSuffixPath,
      }) => {
        const formatter = formatterByType[type]
        const formattedValue = formatter(value) || 'N/A'

        return (
          <div key={translationPath}>
            <p>{t(translationPath)}</p>
            <p>
              <strong>
                {formattedValue} {t(valueSuffixPath)}
              </strong>
            </p>
          </div>
        )
      })}
    </Flexbox>
  </div>
)

FeeTitleAndValues.propTypes = {
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    translationPath: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number,
  })).isRequired,
}

export default FeeTitleAndValues
