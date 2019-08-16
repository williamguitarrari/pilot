import React from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  Row,
} from 'former-kit'

const RenderChildren = ({ children }) => ( // eslint-disable-line react/prop-types
  <Col>
    {children}
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
