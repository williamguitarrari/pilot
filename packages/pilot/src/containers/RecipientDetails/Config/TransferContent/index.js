import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardActions,
  CardContent,
  Col,
  Grid,
  Row,
  Spacing,
} from 'former-kit'

import Transfer from '../../../AddRecipient/ConfigurationStep/Transfer'
import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import styles from '../style.css'
import { TRANSFER } from '../contentIds'

const TransferContent = ({
  data,
  onCancel,
  onChange,
  onIntervalChange,
  onSave,
  onToggle,
  t,
}) => {
  const required = createRequiredValidation(t('pages.recipient_detail.required'))
  const number = createNumberValidation(t('pages.recipient_detail.number'))
  return (
    <Form
      data={data}
      validation={{
        transferDay: [required, number],
        transferEnabled: [required],
        transferInterval: [required],
      }}
      onChange={onChange}
      onSubmit={onSave}
    >
      <CardContent>
        <Grid>
          <Row>
            <Col>
              {Transfer({
                data,
                onIntervalChange,
                t,
                transferHandler: onToggle,
              })}
            </Col>
          </Row>
        </Grid>
      </CardContent>
      <div className={styles.paddingTop}>
        <CardActions>
          <Button
            fill="outline"
            onClick={() => onCancel(TRANSFER)}
            type="button"
          >
            {t('pages.recipient_detail.cancel')}
          </Button>
          <Spacing size="medium" />
          <Button
            type="submit"
          >
            {t('pages.recipient_detail.save')}
          </Button>
        </CardActions>
      </div>
    </Form>
  )
}

TransferContent.propTypes = {
  data: PropTypes.shape({
    transferDay: PropTypes.string,
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onIntervalChange: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

TransferContent.defaultProps = {
  data: {},
  onIntervalChange: null,
}

export default TransferContent

