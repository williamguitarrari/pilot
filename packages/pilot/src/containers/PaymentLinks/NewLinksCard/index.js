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

const NewLinksCard = ({
  onAddPaymentLink,
  t,
}) => (
  <Card>
    <CardContent>
      <Grid>
        <Row className={style.verticalAlign}>
          <Col
            desk={5}
            palm={12}
            tablet={12}
            tv={5}
          >
            <h2 className={style.title}>
              {t('pages.payment_links.receive_payments')}
            </h2>
            <span className={style.subtitle}>
              {t('pages.payment_links.share_payment_links_1')}<br />
              {t('pages.payment_links.share_payment_links_2')}
            </span>
          </Col>
          <Col
            align="end"
            desk={7}
            palm={12}
            tablet={12}
            tv={7}
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

NewLinksCard.propTypes = {
  onAddPaymentLink: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default NewLinksCard
