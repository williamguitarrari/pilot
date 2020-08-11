import React from 'react'
import { values } from 'ramda'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import Sidebar from './Sidebar'

import buildRoutes from './routes'

test('should not show recipient tab when companyCanCreateRecipient is false', () => {
  const company = {
    marketplace: { test: { can_create_recipient: false } },
  }

  const routes = buildRoutes({ company, environment: 'test' })

  const { container, queryByText } = render(
    <Sidebar
      balance={{
        available: 10,
      }}
      t={v => v}
      routes={values(routes)}
    />,
    { wrapper: MemoryRouter }
  )

  expect(queryByText(/pages.recipients.title/i)).not.toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

test('should show recipient tab when companyCanCreateRecipient is true', () => {
  const company = {
    marketplace: { test: { can_create_recipient: true } },
  }

  const routes = buildRoutes({ company, environment: 'test' })

  const { container, getByText } = render(
    <Sidebar
      balance={{
        available: 10,
      }}
      routes={values(routes)}
      t={v => v}
    />,
    { wrapper: MemoryRouter }
  )

  getByText(/pages.recipients.title/i)
  expect(container).toMatchSnapshot()
})

test('should not show recipient tab when companyType is paymentLink', () => {
  const company = {
    marketplace: { test: { can_create_recipient: true } },
    type: 'payment_link_app',
  }

  const routes = buildRoutes({ company, environment: 'test' })

  const { container, queryByText } = render(
    <Sidebar
      balance={{
        available: 10,
      }}
      routes={values(routes)}
      t={v => v}
    />,
    { wrapper: MemoryRouter }
  )

  expect(queryByText(/pages.recipients.title/i)).not.toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

