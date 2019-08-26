import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardSectionDoubleLineTitle,
  CardContent,
} from 'former-kit'

const RecipientItem = ({
  children,
  icon,
  id,
  isOpen,
  onClick,
  subtitle,
  title,
}) => (
  <CardContent>
    <CardSection>
      <CardSectionDoubleLineTitle
        title={title}
        subtitle={subtitle}
        collapsed={!isOpen}
        icon={icon}
        onClick={() => onClick(id)}
      />
      {isOpen
      && (
        <Fragment>
          {children}
        </Fragment>
      )
    }
    </CardSection>
  </CardContent>
)

RecipientItem.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string,
}

RecipientItem.defaultProps = {
  id: '',
  isOpen: false,
  subtitle: '',
  title: '',
}

export default RecipientItem
