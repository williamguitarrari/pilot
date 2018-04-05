import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'

import style from './style.css'

const BalanceTotalDisplay = ({
  action,
  amount,
  detail,
  title,
}) => (
  <Card>
    <CardTitle
      title={title}
      className={style.title}
    />
    <CardContent>
      <h2 className={style.amount}>{amount}</h2>
      <div className={style.detail}>
        {detail}
      </div>
      {
        action &&
        <Button
          size="default"
          fill="gradient"
          onClick={action.onClick}
        >
          {action.title}
        </Button>
      }
    </CardContent>
  </Card>
)

BalanceTotalDisplay.propTypes = {
  action: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }),
  amount: PropTypes.string.isRequired,
  detail: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

BalanceTotalDisplay.defaultProps = {
  action: null,
}

export default BalanceTotalDisplay
