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
import Anticipation from '../../../AddRecipient/ConfigurationStep/Anticipation'
import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import greaterThan from '../../../../validation/greaterThan'
import createAnticipationDaysValidation from '../../../../validation/anticipationDays'
import styles from '../style.css'
import { ANTICIPATION } from '../contentIds'

const AnticipationContent = ({
  canConfigureAnticipation,
  data,
  onCancel,
  onChange,
  onSave,
  t,
}) => {
  const required = createRequiredValidation(t('pages.recipient_detail.required'))
  const number = createNumberValidation(t('pages.recipient_detail.number'))
  const greaterThan100 = greaterThan(100, t('pages.recipient_detail.greater_than'))

  const anticipationDaysMessage = t('pages.recipient_detail.invalid_anticipation_days_format')
  const validateAnticipationDays = createAnticipationDaysValidation(
    anticipationDaysMessage
  )

  return (
    <Form
      data={data}
      validation={{
        anticipationDays: [required, validateAnticipationDays],
        anticipationModel: [required],
        anticipationVolumePercentage: [required, number, greaterThan100],
      }}
      onChange={onChange}
      onSubmit={onSave}
    >
      <CardContent>
        <Grid>
          <Row>
            <Col>
              {Anticipation({
                canConfigureAnticipation,
                data,
                t,
              })}
            </Col>
          </Row>
        </Grid>
      </CardContent>
      <div className={styles.paddingTop}>
        <CardActions>
          <Button
            fill="outline"
            onClick={() => onCancel(ANTICIPATION)}
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

AnticipationContent.propTypes = {
  canConfigureAnticipation: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

AnticipationContent.defaultProps = {
  data: {},
}

export default AnticipationContent

