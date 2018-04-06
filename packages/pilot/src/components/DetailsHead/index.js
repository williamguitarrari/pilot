import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
} from 'former-kit'
import { Textfit } from 'react-textfit'

import style from './style.css'

const DetailsHead = ({
  actions,
  identifier,
  properties,
  title,
}) => (
  <Card>
    <CardContent className={style.content}>
      <div>
        <div className={style.item}>
          <span>{title}</span>
          <Textfit
            mode="single"
            min={10}
            className={style.identifier}
          >
            {identifier}
          </Textfit>
        </div>

        {properties.map(property => (
          <div key={property.title} className={style.item}>
            <span>{property.title}</span>
            <div>{property.children}</div>
          </div>
        ))}
      </div>

      <div className={style.actions}>
        {actions.map(action => (
          <Button
            fill="outline"
            icon={action.icon}
            key={action.title}
            onClick={action.onClick}
            size="default"
            disabled={action.disabled}
          >
            {action.title}
          </Button>
        ))}
      </div>
    </CardContent>
  </Card>
)

DetailsHead.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.element,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),
  identifier: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
}

DetailsHead.defaultProps = {
  actions: [],
}

export default DetailsHead
