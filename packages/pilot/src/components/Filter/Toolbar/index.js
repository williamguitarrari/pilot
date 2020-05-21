import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'

import {
  CardActions,
  Button,
} from 'former-kit'

import {
  unless,
  is,
  of,
} from 'ramda'

import ChevronDown32 from 'emblematic-icons/svg/ChevronDown32.svg'
import ChevronUp32 from 'emblematic-icons/svg/ChevronUp32.svg'

import style from './style.css'

const ensureArray = unless(
  is(Array),
  of
)

const renderChildrenInput = ({
  disabled,
  index,
  input,
  styled,
}) => cloneElement(input, {
  className: styled.search,
  disabled,
  key: `${input.props.name}-${index}`,
})

const Toolbar = ({
  children,
  collapsed,
  confirmDisabled,
  disabled,
  handleToogleMoreFilters,
  isClearFilterDisabled,
  isEmptyOptions,
  onClear,
  t,
}) => (
  <CardActions>
    {ensureArray(children)
      .map((input, index) => renderChildrenInput({
        disabled,
        index,
        input,
        styled: style,
      }))
    }
    {isEmptyOptions
      && (
        <Button
          disabled={disabled}
          relevance="low"
          fill="outline"
          iconAlignment="end"
          icon={collapsed
            ? <ChevronDown32 width={16} height={16} />
            : <ChevronUp32 width={16} height={16} />
          }
          onClick={handleToogleMoreFilters}
        >
          {t('components.filter.more')}
        </Button>
      )
    }
    <Button
      relevance="normal"
      onClick={onClear}
      fill="outline"
      disabled={isClearFilterDisabled}
    >
      {t('components.filter.reset')}
    </Button>

    <Button
      relevance="normal"
      disabled={confirmDisabled}
      type="submit"
      fill="gradient"
    >
      {t('components.filter.apply')}
    </Button>
  </CardActions>
)

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  confirmDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  handleToogleMoreFilters: PropTypes.func.isRequired,
  isClearFilterDisabled: PropTypes.bool,
  isEmptyOptions: PropTypes.bool,
  onClear: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

Toolbar.defaultProps = {
  collapsed: false,
  confirmDisabled: true,
  disabled: false,
  isClearFilterDisabled: true,
  isEmptyOptions: true,
}

export default Toolbar
