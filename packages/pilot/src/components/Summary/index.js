import React from 'react'
import PropTypes from 'prop-types'

import {
  CardSection,
  Col,
  Row,
} from 'former-kit'

import style from './style.css'

const RenderChildren = ({ children }) => ( // eslint-disable-line react/prop-types
  <Col>
    <CardSection>
      <div className={style.content}>
        {children}
      </div>
    </CardSection>
  </Col>
)

const Summary = ({
  children,
}) => (
  <Row stretch flex>
    {
      Array.isArray(children)
        ? children.map((child, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <RenderChildren key={index}>
            {child}
          </RenderChildren>
        ))
        : (
          <RenderChildren>
            {children}
          </RenderChildren>
        )
    }
  </Row>
)

Summary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Summary
