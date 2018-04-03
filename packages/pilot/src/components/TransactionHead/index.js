import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Card,
  CardContent,
  Col,
  Grid,
  Legend,
  Row,
} from 'former-kit'

import style from './style.css'
import statusLegend from '../../models/statusLegends'

const TransactionHead = ({
  id,
  status,
  amount,
  amountLabel,
  installmentsLabel,
  installments,
  actions,
  title,
  statusLabel,
}) => (
  <Card>
    <CardContent>
      <Grid>
        <Row stretch>
          <Col
            desk={8}
            tv={8}
            tablet={12}
            palm={12}
          >
            <div className={style.transactionCard}>
              <div className={style.transactionItem}>
                <span className={style.transactionLabel}>{title}</span>
                <div>
                  <h2 className={style.transactionId}>#{id}</h2>
                </div>
              </div>

              <div className={style.transactionItem}>
                <span className={style.transactionLabel}>{statusLabel}</span>
                <div className={style.transactionStatus}>
                  <Legend
                    color={statusLegend[status].color}
                    acronym={statusLegend[status].text}
                    hideLabel
                  >
                    {statusLegend[status].acronym}
                  </Legend>
                </div>
              </div>

              <div className={style.transactionItem}>
                <span className={style.transactionLabel}>{installmentsLabel}</span>
                <div className={style.transactionValue}>{installments}</div>
              </div>

              <div className={style.transactionItem}>
                <span className={style.transactionLabel}>{amountLabel}</span>
                <div className={style.transactionAmount}>{amount}</div>
              </div>
            </div>

          </Col>
          <Col
            desk={4}
            tv={4}
            tablet={12}
            palm={12}
          >
            {
              actions.map(action => (
                <Button
                  key={action.title}
                  onClick={action.onClick}
                  fill="outline"
                  size="large"
                  icon={action.icon}
                >
                  {action.title}
                </Button>
              ))
            }
          </Col>
        </Row>
      </Grid>
    </CardContent>
  </Card>
)

TransactionHead.propTypes = {
  amount: PropTypes.string.isRequired,
  amountLabel: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.string.isRequired,
  installmentsLabel: PropTypes.string.isRequired,
  installments: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
  statusLabel: PropTypes.string.isRequired,
}

export default TransactionHead
