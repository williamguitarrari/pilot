import React from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  CardContent,
  CardSection,
  Row,
} from 'former-kit'

const BASE_DARK = 'dark'
const BASE_LIGHT = 'light'

const RenderChildren = ({ base, children }) => ( // eslint-disable-line react/prop-types
  <Col>
    <CardSection>
      { base === BASE_DARK && (
        <CardContent>
          {children}
        </CardContent>
      )}
      { base === BASE_LIGHT && children }
    </CardSection>
  </Col>
)

const Summary = ({
  base,
  children,
}) => (
  <Row stretch flex>
    {
      Array.isArray(children)
        ? children.map((child, index) => (
          <RenderChildren
            base={base}
            key={index} // eslint-disable-line react/no-array-index-key
          >
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
  base: PropTypes.oneOf([BASE_DARK, BASE_LIGHT]),
  children: PropTypes.node.isRequired,
}

Summary.defaultProps = {
  base: BASE_DARK,
}

export default Summary
