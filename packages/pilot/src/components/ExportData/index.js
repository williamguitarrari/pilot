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
  exportOptions,
  icon,
  loading,
  placement,
  relevance,
  size,
  subtitle,
  title,
}) => (!loading
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
      <Button
        fill="outline"
        icon={icon}
        loading={loading}
        relevance={relevance}
        size={size}
        displayChildrenWhenLoading
      >
        {title}
      </Button>
    </Popover>
  ) : (
    <Button
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
)

ExportData.propTypes = {
  exportOptions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  icon: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
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
  relevance: 'normal',
  size: 'default',
  title: null,
}

export default ExportData

