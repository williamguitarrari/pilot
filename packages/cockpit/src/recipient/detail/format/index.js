import { pathOr } from 'ramda'
import {
  formatHeaderData,
  formatAnticipationData,
} from './formatRecipient'
import { formatBankAccount } from '../../account/formatBankAccount'

const mountPartners = (previousState, partner, index) => ({
  ...previousState,
  [`partner${index}`]: {
    cpf: partner.document_number,
    name: partner.name,
    email: partner.email,
  },
})

const getPartnersData = partners => partners.reduce(mountPartners, {})

function formatAntecipationAndTransferConfiguration (data) {
  const companyData = formatHeaderData(data)
  let identification = {
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
    documentType: data.bank_account.document_type,
  }

  let phoneNumber
  const register = data.register_information
  const { ddd, number } = pathOr({}, ['phone_numbers', 0], register)

  if (register !== null) {
    phoneNumber = `(${ddd}) ${number}`
  }

  if (data.bank_account.document_type === 'cpf') {
    if (register) {
      identification = {
        ...identification,
        cpf: data.bank_account.document_number,
        cpfEmail: register.email,
        cpfInformation: true,
        cpfName: register.name,
        cpfPhone: phoneNumber,
        cpfUrl: register.site_url,
        documentType: 'cpf',
        cnpj: '',
      }
    } else {
      identification = {
        ...identification,
        cpf: data.bank_account.document_number,
        cpfInformation: false,
        cnpj: '',
      }
    }
  } else if (data.bank_account.document_type === 'cnpj') {
    if (register) {
      const partners = data.register_information.managing_partners || []
      const partnersData = getPartnersData(partners)
      identification = {
        ...identification,
        cnpj: data.bank_account.document_number,
        cnpjEmail: register.email,
        cnpjInformation: true,
        cnpjName: register.company_name,
        cnpjPhone: phoneNumber,
        cnpjUrl: register.site_url,
        documentType: 'cnpj',
        partnerNumber: partners.length.toString(),
        ...partnersData,
        cpf: '',
      }
    } else {
      identification = {
        ...identification,
        cnpj: data.bank_account.document_number,
        cnpjInformation: false,
        cpf: '',
      }
    }
  }

  const transferDay = (data.transfer_day) ? data.transfer_day.toString() : ''

  const configuration = {
    anticipationModel: data.automatic_anticipation_type,
    anticipationVolumePercentage: data
      .anticipatable_volume_percentage.toString(),
    anticipationDays: data.automatic_anticipation_days,
    transferEnabled: data.transfer_enabled,
    transferInterval: data.transfer_interval,
    transferDay,
  }

  const transfer = {
    transferDay,
    transferEnabled: data.transfer_enabled,
    transferInterval: data.transfer_interval,
  }

  if (data.transfer_interval === 'daily') {
    configuration.transferDay = '0'
    transfer.transferDay = '0'
  }
  if (data.transfer_interval === 'weekly') {
    configuration.transferDay = transferDay
    transfer.transferDay = transferDay
  }

  const informationData = {
    identification,
    configuration,
    bankAccount: {
      agency_digit: data.bank_account.agencia_dv,
      agency: data.bank_account.agencia,
      bank: data.bank_account.bank_code,
      name: data.bank_account.legal_name,
      number_digit: data.bank_account.conta_dv,
      number: data.bank_account.conta,
      type: data.bank_account.type,
    },
    metadata: data.metadata,
  }

  const anticipation = formatAnticipationData(data)

  const configurationData = {
    anticipation,
    transfer,
    bankAccount: formatBankAccount(data.bank_account),
  }

  const formattedData = {
    companyData,
    informationData,
    configurationData,
  }

  return formattedData
}

export default formatAntecipationAndTransferConfiguration
