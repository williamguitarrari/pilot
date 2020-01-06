import React from 'react'
import PropTypes from 'prop-types'

import {
  CardContent,
  CardSection,
  Row,
  Col,
  CheckboxGroup,
} from 'former-kit'

import style from './style.css'

const getCheckboxGroupColumns = length => (
  length > 6
    ? 2
    : 1
)

const optionsGroup = ({
  disabled,
  isOptionsEmptyOrCollapsed,
  options,
  selectedFilters,
}) => {
  if (isOptionsEmptyOrCollapsed) {
    return null
  }

  return (
    <CardContent>
      <CardSection>
        <CardContent>
          <fieldset name="filters">
            <Row flex>
              {options.map(({ items, key, name }) => (
                <Col key={name}>
                  <div className={style.filtersTitle}>
                    {name}
                  </div>
                  <CheckboxGroup
                    columns={getCheckboxGroupColumns(items.length)}
                    disabled={disabled}
                    name={key}
                    options={items}
                    value={selectedFilters}
                  />
                </Col>
              ))}
            </Row>
          </fieldset>
        </CardContent>
      </CardSection>
    </CardContent>
  )
}

optionsGroup.propTypes = {
  disabled: PropTypes.bool,
  isOptionsEmptyOrCollapsed: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
}

optionsGroup.defaultProps = {
  disabled: false,
}

export default optionsGroup
