import React from 'react'
import { render } from '@testing-library/react'
import OnboardingBackground from '.'

test('OnboardingBackground should render', () => {
  const { container } = render(
    <OnboardingBackground>
      <p>Indiana Jones</p>
    </OnboardingBackground>
  )

  expect(container).toMatchSnapshot()
})
