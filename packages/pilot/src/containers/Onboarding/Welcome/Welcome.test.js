import React from 'react'
import { render } from '@testing-library/react'
import Welcome from '.'

test('Welcome should render', () => {
  const { container } = render(
    <Welcome
      t={value => value}
      userName="Name"
    />
  )

  expect(container).toMatchSnapshot()
})
