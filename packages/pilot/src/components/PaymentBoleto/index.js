import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  CardContent,

  Button,
} from 'former-kit'

import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import IconBarCode from 'emblematic-icons/svg/BarCode24.svg'

import style from './style.css'

const PaymentBoleto = ({
  barcode,
  copyBarcodeLabel,
  dueDate,
  dueDateLabel,
  onCopy,
  onShow,
  showBoletoLabel,
  title,
}) => (
  <Card className={style.card}>
    <CardContent className={style.cardContent}>
      <CardTitle
        title={title}
        subtitle={
          <Button
            fill="clean"
            size="tiny"
            onClick={onShow}
          >
            {showBoletoLabel}
          </Button>
        }
      />

      <div className={style.cardBarCode}>
        <IconBarCode width={25} height={25} />
        <strong>{barcode}</strong>
      </div>

      <div className={style.cardDueDate}>
        <p>{dueDateLabel} {dueDate}</p>
        <Button
          fill="clean"
          size="tiny"
          icon={<IconCopy width="12px" height="12px" />}
          onClick={() => onCopy(barcode)}
        >
          {copyBarcodeLabel}
        </Button>
      </div>
    </CardContent>
  </Card>
)

PaymentBoleto.propTypes = {
  barcode: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  dueDateLabel: PropTypes.string.isRequired,
  showBoletoLabel: PropTypes.string.isRequired,
  copyBarcodeLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default PaymentBoleto

