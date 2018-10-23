import { dissoc } from 'ramda'

import buildParameters from './buildParameters'
import registerData from './mocks/registerData.json'
import getTimestampFromDate from '../../formatters/date'

describe('Company register build parameters', () => {
  const result = buildParameters(registerData)

  describe('Company template token', () => {
    it('should be equal to token from self register template', () => {
      const selfRegisterToken = 'cjkifh2ja0000y0739q5odyyt'

      expect(result.company_template_token).toEqual(selfRegisterToken)
    })
  })

  describe('Company agreement term version', () => {
    it('should be equal to 1', () => {
      const expectedAgreementTermVersion = 1

      expect(result.agreement_term_version)
        .toEqual(expectedAgreementTermVersion)
    })
  })

  describe('User data', () => {
    it('should have email', () => {
      expect(result.email).toBeDefined()
      expect(result.email).toEqual(registerData.email)
    })

    it('should have password', () => {
      expect(result.password).toBeDefined()
      expect(result.password).toEqual(registerData.password)
    })
  })

  describe('Company data', () => {
    it('should have document_number', () => {
      expect(result.document_number).toBeDefined()
      expect(result.document_number).toEqual(registerData.cnpj)
    })

    it('should have name', () => {
      expect(result.name).toBeDefined()
      expect(result.name).toEqual(registerData.tradeName)
    })

    it('should have full_name', () => {
      expect(result.full_name).toBeDefined()
      expect(result.full_name).toEqual(registerData.legalName)
    })

    it('should have primary_phone', () => {
      const expectedPhoneNumber = '+551122222222'
      expect(result.primary_phone).toBeDefined()
      expect(result.primary_phone).toEqual(expectedPhoneNumber)
    })

    it('should have site_url', () => {
      expect(result.site_url).toBeDefined()
      expect(result.site_url).toEqual(registerData.site)
    })

    it('should have document_type', () => {
      const expectedDocumentType = 'cnpj'
      expect(result.document_type).toBeDefined()
      expect(result.document_type).toEqual(expectedDocumentType)
    })

    describe('without site', () => {
      const registerDataWithoutSite = dissoc('site', registerData)
      const resultWithoutSite = buildParameters(registerDataWithoutSite)

      it('should not have site_url', () => {
        expect(resultWithoutSite.site_url).toEqual(undefined)
      })
    })
  })

  describe('Partner data', () => {
    it('should have partner_name', () => {
      expect(result.partner_name).toBeDefined()
      expect(result.partner_name).toEqual(registerData.partnerName)
    })

    it('should have partner_cpf', () => {
      expect(result.partner_cpf).toBeDefined()
      expect(result.partner_cpf).toEqual(registerData.cpf)
    })

    it('should have partner_birthday', () => {
      const expectedBirthdate =
        getTimestampFromDate(registerData.birthDate)
      expect(result.partner_birthday).toBeDefined()
      expect(result.partner_birthday).toEqual(expectedBirthdate)
    })

    it('should have partner_phone', () => {
      const expectedPhoneNumber = '+551123232323'
      expect(result.partner_phone).toBeDefined()
      expect(result.partner_phone).toEqual(expectedPhoneNumber)
    })

    it('should have partner_mother_name', () => {
      expect(result.partner_mother_name).toBeDefined()
      expect(result.partner_mother_name).toEqual(registerData.montherName)
    })
  })

  describe('Partner Address Data', () => {
    it('should have partner_zipcode', () => {
      expect(result.partner_zipcode).toBeDefined()
      expect(result.partner_zipcode).toEqual(registerData.cep)
    })

    it('should have partner_street', () => {
      expect(result.partner_street).toBeDefined()
      expect(result.partner_street).toEqual(registerData.street)
    })

    it('should have partner_street_number', () => {
      expect(result.partner_street_number).toBeDefined()
      expect(result.partner_street_number).toEqual(registerData.number)
    })

    it('should have partner_complementary', () => {
      expect(result.partner_complementary).toBeDefined()
      expect(result.partner_complementary).toEqual(registerData.complement)
    })

    describe('without complement', () => {
      const registerDataWithoutComplement = dissoc('complement', registerData)

      it('should not have partner_complementary', () => {
        expect(registerDataWithoutComplement.partner_complementary)
          .toEqual(undefined)
      })
    })

    it('should have partner_neighborhood', () => {
      expect(result.partner_neighborhood).toBeDefined()
      expect(result.partner_neighborhood).toEqual(registerData.neighborhood)
    })

    it('should have partner_city', () => {
      expect(result.partner_city).toBeDefined()
      expect(result.partner_city).toEqual(registerData.city)
    })

    it('should have partner_state', () => {
      expect(result.partner_state).toBeDefined()
      expect(result.partner_state).toEqual(registerData.state)
    })
  })

  describe('MQL', () => {
    it('should have answers', () => {
      expect(result.mql.answers).toEqual({
        sales_starts: 'now',
        tpv: '19000',
        platform: 'vtex',
        segment: 'education',
      })
    })
  })
})
