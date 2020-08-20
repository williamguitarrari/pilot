import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import Sidebar from './Sidebar'

test('should not show recipient tab when companyCanCreateRecipient is false', () => {
  const { container, queryByText } = render(
    <Sidebar
      balance={{
        available: 10,
      }}
      companyCanCreateRecipient={false}
      t={v => v}
    />,
    { wrapper: MemoryRouter }
  )

  expect(queryByText(/pages.recipients.title/i)).not.toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

test('should show recipient tab when companyCanCreateRecipient is true', () => {
  const { container, getByText } = render(
    <Sidebar
      balance={{
        available: 10,
      }}
      companyCanCreateRecipient
      t={v => v}
    />,
    { wrapper: MemoryRouter }
  )

  getByText(/pages.recipients.title/i)
  expect(container).toMatchSnapshot()
})

test('should show recipient tab when companyType is paymentLink', () => {
  const { container, queryByText } = render(
    <Sidebar
      balance={{
        available: 10,
      }}
      companyCanCreateRecipient
      companyType="payment_link_app"
      t={v => v}
    />,
    { wrapper: MemoryRouter }
  )

  expect(queryByText(/pages.recipients.title/i)).not.toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

