import moment from 'moment'
import { shouldSkipOnboarding } from './reducer'

describe('shouldSkipOnboarding', () => {
  test('Company with type default skip onboarding', () => {
    const company = {
      alreadyTransacted: true,
      date_created: moment(),
      type: 'default',
    }
    const welcome = {
      error: null,
      onboardingAnswers: {},
    }
    const isSkipped = shouldSkipOnboarding({ company, welcome })
    expect(isSkipped).toBe(true)
  })

  test('Company with type payment_link_app skip onboarding', () => {
    const company = {
      alreadyTransacted: true,
      date_created: moment(),
      type: 'payment_link_app',
    }
    const welcome = {
      error: null,
      onboardingAnswers: {},
    }
    const isSkipped = shouldSkipOnboarding({ company, welcome })
    expect(isSkipped).toBe(true)
  })

  test('Company with type self_register should answer onboarding', () => {
    const company = {
      alreadyTransacted: false,
      date_created: moment(),
      type: 'self_register',
    }
    const welcome = {
      error: null,
      onboardingAnswers: {},
    }
    const isSkipped = shouldSkipOnboarding({ company, welcome })
    expect(isSkipped).toBe(false)
  })

  test('Company registered more than month ago should skip onboarding and not transacted', () => {
    const company = {
      alreadyTransacted: false,
      date_created: '2019-08-11T20:31:51.118Z',
      type: 'self_register',
    }
    const welcome = {
      error: null,
      onboardingAnswers: {},
    }
    const isSkipped = shouldSkipOnboarding({ company, welcome })
    expect(isSkipped).toBe(false)
  })

  test('Company that completed onboarding should skip', () => {
    const company = {
      alreadyTransacted: true,
      date_created: moment(),
      type: 'self_register',
    }
    const welcome = {
      error: true,
      onboardingAnswers: {
        companyStatus: 'no',
        expectedRevenue: '10K',
        integrationType: 'platform',
        platform: 'desenvolvimento_proprio',
        segment: 'accessories',
        siteStatus: 'notYet',
      },
    }
    const isSkipped = shouldSkipOnboarding({ company, welcome })
    expect(isSkipped).toBe(true)
  })
})
