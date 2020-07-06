import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverMenu,
} from 'former-kit'
import style from './style.css'

const ExportData = ({
  disabled,
  exportOptions,
  icon,
  loading,
  placement,
  relevance,
  size,
  subtitle,
  title,
}) => {
  const button = (
    <Button
      disabled={disabled}
      fill="outline"
      icon={icon}
      loading={loading}
      relevance={relevance}
      size={size}
      displayChildrenWhenLoading
    >
      {title}
    </Button>
  )

  return (!loading && !disabled
    ? (
      <Popover
        content={(
          <div className={style.exportPopover}>
            <PopoverContent>
              <strong>{subtitle}</strong>
            </PopoverContent>
            <PopoverMenu items={exportOptions} />
          </div>
      )}
        placement={placement}
      >
        {button}
      </Popover>
    ) : (
      <>
        {button}
      </>
    )
  )
}

ExportData.propTypes = {
  disabled: PropTypes.bool,
  exportOptions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  icon: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  placement: PropTypes.string.isRequired,
  relevance: PropTypes.oneOf([
    'high', 'normal', 'low',
  ]),
  size: PropTypes.oneOf([
    'tiny', 'default', 'huge',
  ]),
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string,
}

ExportData.defaultProps = {
  disabled: false,
  loading: false,
  relevance: 'normal',
  size: 'default',
  title: null,
}

export default ExportData

