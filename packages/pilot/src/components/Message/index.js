import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Grid,
  Row,
} from 'former-kit'

import style from './style.css'

const isText = node => typeof node === 'string'

const Message = ({ image, title, message }) => (
  <div
    aria-live="polite"
    role="status"
  >
    <Grid>
      <Row flex>
        <Col align="center">
          <div className={style.image}>
            {image}
          </div>
          { title &&
            <div className={style.title}>
              {(isText(title)) ? (
                <h2>{title}</h2>
              ) : (
                title
              )}
            </div>
          }
          { message &&
            <div className={style.message}>
              {(isText(message)) ? (
                <span>{message}</span>
              ) : (
                message
              )}
            </div>
          }
        </Col>
      </Row>
    </Grid>
  </div>
)

Message.propTypes = {
  image: PropTypes.element.isRequired,
  message: PropTypes.node,
  title: PropTypes.node,
}

Message.defaultProps = {
  message: null,
  title: null,
}

export default Message
