import React from 'react'
import { path, split } from 'ramda'
import IconError from 'emblematic-icons/svg/CloseCircle32.svg'
import IconCheck from 'emblematic-icons/svg/CheckCircle32.svg'
import Alert from '../../../src/containers/Account/Alert'
import translations from '../../../public/locales/pt/translations.json'

const t = (sentence = '') => path(split('.', sentence), translations)

const errors = {
  inactive: {
    code: 'inactive',
    message: 'A conta associada à este email está inativa',
  },
  pendingAnalysis: {
    code: 'pending_analysis',
    message: 'Sua conta está sendo analisada pelo nosso time',
  },
  pendingConfirmation: {
    code: 'pending_confirmation',
    message: 'Confirme o seu email para acessar a dashboard',
  },
}

const allStatus = {
  error: {
    icon: <IconError height={16} width={16} />,
    name: 'error',
    type: 'error',
  },
  initial: {
    icon: <IconError height={16} width={16} />,
    name: 'initial',
    type: 'error',
  },
  success: {
    icon: <IconCheck height={16} width={16} />,
    name: 'success',
    type: 'success',
  },
}

const InactiveStatus = () => (
  <Alert
    error={errors.inactive}
    status={allStatus.initial}
    t={t}
  />
)

const PendingAnalysisStatus = () => (
  <Alert
    error={errors.pendingAnalysis}
    status={allStatus.initial}
    t={t}
  />
)

const PendingConfirmationStatus = () => (
  <Alert
    error={errors.pendingConfirmation}
    status={allStatus.initial}
    t={t}
  />
)

const PendingConfirmationStatusRequestSuccess = () => (
  <Alert
    error={errors.pendingConfirmation}
    status={allStatus.success}
    t={t}
  />
)

const PendingConfirmationStatusRequestFailed = () => (
  <Alert
    error={errors.pendingConfirmation}
    status={allStatus.error}
    t={t}
  />
)

const UnknownStatus = () => (
  <Alert
    status={allStatus.initial}
    t={t}
  />
)

export default {
  InactiveStatus,
  PendingAnalysisStatus,
  PendingConfirmationStatus,
  PendingConfirmationStatusRequestFailed,
  PendingConfirmationStatusRequestSuccess,
  UnknownStatus,
}
