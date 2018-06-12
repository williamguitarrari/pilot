import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardTitle,
} from 'former-kit'
import CompanyGeneral from './CompanyGeneral'
import CompanyAddress from './CompanyAddress'
import CompanyAccountManager from './CompanyAccountManager'

const RegisterInfoTab = ({
  address,
  general,
  managingPartner,
  t,
}) => (
  <Fragment>
    <CardContent>
      <p>{t('settings.company.card.register.cardTitle')}</p>
    </CardContent>

    <CardTitle
      title={t('settings.company.card.register.cardCompany')}
    />

    <CardContent>
      <CompanyGeneral
        t={t}
        general={general}
      />
    </CardContent>

    <CardContent>
      <CompanyAddress
        t={t}
        address={address}
      />
    </CardContent>

    <CardTitle
      title={t('settings.company.card.register.accountManager')}
    />

    <CardContent>
      <CompanyAccountManager
        t={t}
        managingPartner={managingPartner}
      />
    </CardContent>
  </Fragment>
)

RegisterInfoTab.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string,
    complementary: PropTypes.string,
    neighborhood: PropTypes.string,
    street: PropTypes.string,
    streetNumber: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
  }).isRequired,
  general: PropTypes.shape({
    cnpj: PropTypes.string,
    fullName: PropTypes.string,
    name: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  managingPartner: PropTypes.shape({
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default RegisterInfoTab
