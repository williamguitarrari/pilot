import {
  keys,
  mergeRight,
  pick,
} from 'ramda'

import buildRoutes, {
  defaultRoutes,
} from './routes'

describe('When is link.me company', () => {
  const company = { type: 'payment_link_app' }

  it('should not allow access to recipients routes', () => {
    const routes = buildRoutes({
      company: mergeRight(company, {
        marketplace: { test: { can_create_recipient: true } },
      }),
      environment: 'test',
      user: { permission: 'admin' },
    })

    const result = pick([
      'recipients',
      'recipientsAdd',
      'recipientsDetail',
    ], routes)

    expect(result).toEqual({})
  })

  describe('And admin user', () => {
    it('should allow access to all default routes', () => {
      const payload = {
        company,
        user: { permission: 'admin' },
      }

      const routes = keys(buildRoutes(payload))

      expect(routes).toEqual(keys(defaultRoutes))
    })
  })

  describe('And not admin user', () => {
    it('should only allow access to transactions, paymentLinks and accountSettings', () => {
      const payload = {
        company,
        user: { permission: 'read_write' },
      }

      const routes = keys(buildRoutes(payload))

      const expected = [
        'transactions',
        'paymentLinks',
        'accountSettings',
      ]

      expect(routes).toEqual(expected)
    })
  })
})

describe('When is of any company type', () => {
  const company = { type: 'default' }

  describe('And has marketplace permissions', () => {
    it('should allow access to recipients routes', () => {
      const payload = {
        company: mergeRight(company, {
          marketplace: { test: { can_create_recipient: true } },
        }),
        environment: 'test',
        user: { permission: 'admin' },
      }

      const routes = keys(buildRoutes(payload))

      const expected = ['recipients', 'recipientsAdd', 'recipientsDetail']

      expect(routes).toEqual(expect.arrayContaining(expected))
    })
  })

  it('should allow access to all default routes', () => {
    const payload = {
      company,
      user: { permission: 'admin' },
    }

    const routes = buildRoutes(payload)

    const expected = keys(defaultRoutes)

    expect(keys(routes)).toEqual(expect.arrayContaining(expected))
  })
})
