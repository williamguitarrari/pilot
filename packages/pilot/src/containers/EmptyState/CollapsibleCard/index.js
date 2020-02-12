import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'
import styles from './styles.css'

const CollapsibleCard = ({ children, subtitle, title }) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Card>
      <CardContent className={styles.collapsibleCard}>
        <CardSectionDoubleLineTitle
          collapsed={collapsed}
          onClick={() => setCollapsed(!collapsed)}
          subtitle={subtitle}
          title={title}
        />
        {!collapsed && children}
      </CardContent>
    </Card>
  )
}

CollapsibleCard.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default CollapsibleCard
