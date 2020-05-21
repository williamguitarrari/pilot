import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  CardActions,
  CardContent,
  Col,
  Grid,
  Row,
  Spacing,
} from 'former-kit'

import EditButton from './EditButton'
import ReceiverInfo from './ReceiverInfo'
import PartnerInfo from './PartnerInfo'
import styles from './style.css'
import bankCodes from '../../../models/banks'

import { accountProps, accountDefaultProps } from '../BankAccountStep'
import { virtualPageView } from '../../../vendor/googleTagManager'

import {
  BANK_ACCOUNT,
  CONFIGURATION,
  IDENTIFICATION,
} from '../stepIds'

const hasBankCode = code => !!bankCodes.find(bank => bank === code)

const renderSingleColumn = (title, data) => (
  <Col>
    <span className={styles.infoTitle}>
      {title}
    </span>
    {data && (
      <span className={styles.info}>
        {data}
      </span>
    )}
  </Col>
)

const renderPartnerInfo = (identification, action, t) => {
  if (identification.documentType === 'cpf') return null
  return (
    <Fragment>
      <Row>
        <Col>
          <span className={styles.title}>{t('pages.add_recipient.partner_data')}</span>
        </Col>
        <Col className={styles.editButtonCol}>
          <EditButton
            onClick={() => action(IDENTIFICATION)}
            t={t}
          />
        </Col>
      </Row>
      <PartnerInfo
        identification={identification}
        t={t}
      />
      <hr className={styles.line} />
    </Fragment>
  )
}

const renderReceiverInfo = (identification, action, t) => {
  const cpfTitle = t('pages.add_recipient.recipient_data')
  const cnpjTitle = t('pages.add_recipient.company_data')

  const documentTitle = identification.documentType === 'cpf'
    ? cpfTitle
    : cnpjTitle

  return (
    <Fragment>
      <Row>
        {renderSingleColumn(documentTitle)}
        <Col className={styles.editButtonCol}>
          <EditButton
            onClick={() => action(IDENTIFICATION)}
            t={t}
          />
        </Col>
      </Row>
      <ReceiverInfo
        t={t}
        identification={identification}
      />
      <hr className={styles.line} />
    </Fragment>
  )
}

const renderBankAccount = (bankAccount, action, t) => (
  <Fragment>
    <Row>
      {renderSingleColumn(t('pages.add_recipient.bank_account'))}
      <Col className={styles.editButtonCol}>
        <EditButton
          onClick={() => action(BANK_ACCOUNT)}
          t={t}
        />
      </Col>
    </Row>
    <Row>
      {renderSingleColumn(
        t('pages.add_recipient.account_name'),
        bankAccount.name
      )}
      {renderSingleColumn(
        t('pages.add_recipient.bank'),
        hasBankCode(bankAccount.bank)
          ? t(`models.bank_code.${bankAccount.bank}`)
          : bankAccount.bank
      )}
      {renderSingleColumn(
        t('pages.add_recipient.agency'),
        (bankAccount.agency_digit)
          ? `${bankAccount.agency}-${bankAccount.agency_digit}`
          : bankAccount.agency
      )}
      {renderSingleColumn(
        t('pages.add_recipient.account'),
        `${bankAccount.number}-${bankAccount.number_digit}`
      )}
      {renderSingleColumn(
        t('pages.add_recipient.account_type'),
        t(`models.account_type.${bankAccount.type}`)
      )}
    </Row>
    <hr className={styles.line} />
  </Fragment>
)

const renderAnticipationConfig = (configuration, action, t) => {
  const {
    anticipationDays,
    anticipationDelay,
    anticipationModel,
  } = configuration
  const anticipationTranslations = {
    automatic_1025: t('pages.add_recipient.automatic_1025'),
    automatic_dx: t('pages.add_recipient.automatic_dx'),
    automatic_volume: t('pages.add_recipient.automatic_volume'),
    custom: t('pages.add_recipient.custom_anticipation'),
    manual: t('pages.add_recipient.manual_volume'),
  }
  const anticipationType = anticipationTranslations[anticipationModel]

  return (
    <Fragment>
      <Row>
        <Col>
          <span className={styles.title}>{t('pages.add_recipient.anticipation_configuration')}</span>
        </Col>
        <Col className={styles.editButtonCol}>
          <EditButton
            onClick={() => action(CONFIGURATION)}
            t={t}
          />
        </Col>
      </Row>
      {(anticipationModel === 'manual' || anticipationModel === 'automatic_volume')
        && (
        <Row>
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_model'),
            anticipationType
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_volume_percentage'),
            configuration.anticipationVolumePercentage
          )}
        </Row>
        )
      }
      {anticipationModel === 'automatic_1025'
        && (
        <Row>
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_model'),
            anticipationType
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_delay'),
            '15'
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_days'),
            '10,25'
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_volume_percentage'),
            '100'
          )}
        </Row>
        )
      }
      {anticipationModel === 'automatic_dx'
        && (
        <Row>
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_model'),
            anticipationType
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_delay'),
            anticipationDelay
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_days'),
            t('pages.add_recipient.automatic_dx_days')
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_volume_percentage'),
            '100'
          )}
        </Row>
        )
      }
      {anticipationModel === 'custom'
        && (
        <Row>
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_model'),
            anticipationType
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_days'),
            anticipationDelay
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_days'),
            anticipationDays
          )}
          {renderSingleColumn(
            t('pages.add_recipient.anticipation_volume_percentage'),
            '100'
          )}
        </Row>
        )
      }
      <hr className={styles.line} />
    </Fragment>
  )
}

const renderTransferInterval = (configuration, t) => {
  const {
    transferDay,
    transferEnabled,
    transferInterval,
  } = configuration

  const transferTypes = {
    daily: t('pages.add_recipient.daily'),
    monthly: t('pages.add_recipient.monthly'),
    weekly: t('pages.add_recipient.weekly'),
  }

  const weekDaysMap = {
    1: t('pages.add_recipient.monday'),
    2: t('pages.add_recipient.tuesday'),
    3: t('pages.add_recipient.wednesday'),
    4: t('pages.add_recipient.thursday'),
    5: t('pages.add_recipient.friday'),
  }

  if (transferEnabled) {
    return (
      <Fragment>
        {renderSingleColumn(
          t('pages.add_recipient.automatic_transfer_interval'),
          transferTypes[transferInterval]
        )}
        {transferInterval !== 'daily' && renderSingleColumn(
          t('pages.add_recipient.transfer_day'),
          transferInterval === 'weekly' ? weekDaysMap[transferDay] : transferDay
        )}
      </Fragment>
    )
  }

  return null
}

const renderTransferConfig = (configuration, action, t) => {
  const enableTransfer = (configuration.transferEnabled)
    ? 'Habilitada'
    : ('Desabilitada')
  return (
    <Fragment>
      <Row>
        <Col>
          <span className={styles.title}>{t('pages.add_recipient.transfer_configuration')}</span>
        </Col>
        <Col className={styles.editButtonCol}>
          <EditButton
            onClick={() => action(CONFIGURATION)}
            t={t}
          />
        </Col>
      </Row>
      <Row>
        <Col tv={2} desk={2} tablet={2} palm={2}>
          <span className={styles.infoTitle}>{t('pages.add_recipient.automatic_transfer')}</span>
          <span className={styles.info}>{enableTransfer}</span>
        </Col>
        {renderTransferInterval(configuration, t)}
      </Row>
      <hr className={styles.line} />
    </Fragment>
  )
}

class ConfirmStep extends Component {
  componentDidMount () {
    virtualPageView({
      path: '/virtual/recipient/add/confirm',
      title: 'Add Recipient - Confirm',
    })
  }

  render () {
    const {
      data,
      onBack,
      onCancel,
      onContinue,
      onEdit,
      t,
    } = this.props

    return (
      <Fragment>
        <CardContent className={styles.paddingBottom}>
          <h3 className={styles.title}>{t('pages.add_recipient.confirm_recipient_registration')}</h3>
          <h4 className={styles.subtitle}>
            {t('pages.add_recipient.confirm_and_finish')}
          </h4>
          <Grid className={styles.paddingBottom}>
            <hr className={styles.line} />
            {renderReceiverInfo(data[IDENTIFICATION], onEdit, t)}
            {renderPartnerInfo(data[IDENTIFICATION], onEdit, t)}
            {renderBankAccount(data[BANK_ACCOUNT], onEdit, t)}
            {renderAnticipationConfig(data[CONFIGURATION], onEdit, t)}
            {renderTransferConfig(data[CONFIGURATION], onEdit, t)}
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            type="button"
            relevance="low"
            onClick={onCancel}
            fill="outline"
          >
            {t('pages.add_recipient.cancel')}
          </Button>
          <Spacing />
          <Button
            type="button"
            onClick={onBack}
            fill="outline"
          >
            {t('pages.add_recipient.back')}
          </Button>
          <Spacing size="medium" />
          <Button
            type="submit"
            onClick={() => onContinue()}
          >
            {t('pages.add_recipient.create_recipient')}
          </Button>
        </CardActions>
      </Fragment>
    )
  }
}

const partnerPropTypes = PropTypes.shape({
  cpf: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
})

const partnerDefaultTypes = {
  cpf: '',
  name: '',
  phone: '',
}

ConfirmStep.propTypes = {
  data: PropTypes.shape({
    [BANK_ACCOUNT]: accountProps,
    [CONFIGURATION]: PropTypes.shape({
      anticipationDays: PropTypes.string,
      anticipationModel: PropTypes.string,
      anticipationVolumePercentage: PropTypes.string,
      transferDay: PropTypes.string,
      transferEnabled: PropTypes.bool,
      transferInterval: PropTypes.string,
    }).isRequired,
    [IDENTIFICATION]: PropTypes.shape({
      cnpj: PropTypes.string,
      cnpjEmail: PropTypes.string,
      cnpjInformation: PropTypes.bool,
      cnpjName: PropTypes.string,
      cnpjPhone: PropTypes.string,
      cnpjUrl: PropTypes.string,
      cpf: PropTypes.string,
      cpfEmail: PropTypes.string,
      cpfInformation: PropTypes.bool,
      cpfName: PropTypes.string,
      cpfPhone: PropTypes.string,
      cpfUrl: PropTypes.string,
      documentType: PropTypes.string,
      partner0: partnerPropTypes,
      partner1: partnerPropTypes,
      partner2: partnerPropTypes,
      partner3: partnerPropTypes,
      partner4: partnerPropTypes,
      partnerNumber: PropTypes.string,
    }).isRequired,
  }),
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ConfirmStep.defaultProps = {
  data: {
    [BANK_ACCOUNT]: accountDefaultProps,
    [CONFIGURATION]: {
      anticipationDays: '',
      anticipationModel: '',
      anticipationVolumePercentage: '',
      transferDay: '',
      transferEnabled: false,
      transferInterval: '',
    },
    [IDENTIFICATION]: {
      cnpj: '',
      cnpjEmail: '',
      cnpjInformation: false,
      cnpjName: '',
      cnpjPhone: '',
      cnpjUrl: '',
      cpf: '',
      cpfEmail: '',
      cpfInformation: false,
      cpfName: '',
      cpfPhone: '',
      cpfUrl: '',
      documentType: '',
      partner0: partnerDefaultTypes,
      partner1: partnerDefaultTypes,
      partner2: partnerDefaultTypes,
      partner3: partnerDefaultTypes,
      partner4: partnerDefaultTypes,
      partnerNumber: '',
    },
  },
}

export default ConfirmStep
