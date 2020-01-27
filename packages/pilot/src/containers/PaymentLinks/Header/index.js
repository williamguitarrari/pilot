import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  Grid,
  Row,
  Col,
} from 'former-kit'

import style from './style.css'

const PaymentLinkHeader = ({
  onAddPaymentLink,
  t,
}) => (
  <Card>
    <CardContent>
      <Grid>
        <Row className={style.verticalAlign}>
          <Col
            desk={3}
            palm={12}
            tablet={12}
            tv={3}
          >
            <h2 className={style.title}>
              {t('pages.payment_links.receive_payments')}
            </h2>
            <span className={style.subtitle}>
              {t('pages.payment_links.share_payment_links')}
            </span>
          </Col>
          <Col
            align="end"
            desk={9}
            palm={12}
            tablet={12}
            tv={9}
          >
            <div className={style.createLink}>
              <Button onClick={onAddPaymentLink}>
                {t('pages.payment_links.create_payment_link')}
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </CardContent>
  </Card>
)

PaymentLinkHeader.propTypes = {
  onAddPaymentLink: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default PaymentLinkHeader
