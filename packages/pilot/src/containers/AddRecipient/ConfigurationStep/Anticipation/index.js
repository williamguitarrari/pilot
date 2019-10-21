import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  FormInput,
  RadioGroup,
  Row,
} from 'former-kit'

import {
  either,
  equals,
} from 'ramda'

import style from '../style.css'

const anticipationModelOptions = ({
  canConfigureAnticipation,
  maximumAnticipationDays,
  t,
}) => {
  const manualByVolume = {
    name: t('pages.add_recipient.manual_volume'),
    value: 'manual',
  }

  const automaticByVolume = {
    name: t('pages.add_recipient.automatic_volume'),
    value: 'automatic_volume',
  }

  const automaticAtDays10And25 = {
    name: t('pages.add_recipient.automatic_1025'),
    value: 'automatic_1025',
  }

  const automaticDX = {
    name: t('pages.add_recipient.automatic_dx'),
    value: 'automatic_dx',
  }

  const custom = {
    name: 'Customizado',
    value: 'custom',
  }

  const availableOptions = [
    manualByVolume,
    automaticByVolume,
  ]

  if (!canConfigureAnticipation) {
    availableOptions.push(automaticAtDays10And25)
    availableOptions.push(automaticDX)
    availableOptions.push(custom)
  }

  if (canConfigureAnticipation && maximumAnticipationDays >= 31) {
    availableOptions.push(automaticDX)
  }

  return availableOptions
}

const renderAnticipationInput = (data, t) => {
  const { anticipationModel } = data
  const volumePercentage = either(
    equals('automatic_volume'),
    equals('manual')
  )

  let inputProps

  if (volumePercentage(anticipationModel) || anticipationModel === 'custom') {
    inputProps = {
      label: t('pages.add_recipient.anticipation_volume_percentage'),
      name: 'anticipationVolumePercentage',
    }
  } else {
    inputProps = {
      disabled: true,
      label: t('pages.add_recipient.anticipation_volume_percentage'),
      value: '100',
    }
  }

  return (
    <Row>
      {!volumePercentage(anticipationModel) && anticipationModel === 'automatic_1025'
        && (
        <Fragment>
          <Col>
            <FormInput
              disabled
              label="Delay (em dias)"
              className={style.marginBottom}
              type="number"
              value="15"
            />
          </Col>
          <Col>
            <FormInput
              disabled
              label="Dias de Antecipação"
              className={style.marginBottom}
              type="text"
              name="anticipationDays"
            />
          </Col>
        </Fragment>
        )
      }
      {!volumePercentage(anticipationModel) && anticipationModel === 'automatic_dx'
        && (
        <Fragment>
          <Col>
            <FormInput
              label="Delay (em dias)"
              className={style.marginBottom}
              type="number"
              name="anticipationDelay"
            />
          </Col>
          <Col>
            <FormInput
              disabled
              label="Dias de Antecipação"
              className={style.marginBottom}
              type="text"
              value="todos os dias"
            />
          </Col>
        </Fragment>
        )
      }
      {!volumePercentage(anticipationModel) && anticipationModel === 'custom'
        && (
        <Fragment>
          <Col>
            <FormInput
              label="Delay (em dias)"
              className={style.marginBottom}
              type="number"
              name="anticipationDelay"
            />
          </Col>
          <Col>
            <FormInput
              label="Dias de Antecipação"
              className={style.marginBottom}
              type="text"
              name="anticipationDays"
            />
          </Col>
        </Fragment>
        )
      }
      <Col>
        <FormInput
          {...inputProps}
          className={style.marginBottom}
          type="number"
        />
      </Col>
      <div className={style.heightMedium} />
    </Row>
  )
}

const Anticipation = ({
  canConfigureAnticipation,
  data,
  maximumAnticipationDays,
  t,
}) => console.log(canConfigureAnticipation, data) || (
  <Fragment>
    <Col tv={12} desk={12} tablet={12} palm={12}>
      <span className={style.label}>
        {t('pages.add_recipient.anticipation_model')}
      </span>
      <RadioGroup
        name="anticipationModel"
        options={anticipationModelOptions({
          canConfigureAnticipation,
          maximumAnticipationDays,
          t,
        })}
      />
    </Col>
    {renderAnticipationInput(data, t)}
  </Fragment>
)

Anticipation.propTypes = {
  canConfigureAnticipation: PropTypes.bool,
  data: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
  }),
  maximumAnticipationDays: PropTypes.number,
  t: PropTypes.func.isRequired,
}

Anticipation.defaultProps = {
  canConfigureAnticipation: true,
  data: {},
  maximumAnticipationDays: 31,
}

export default Anticipation
