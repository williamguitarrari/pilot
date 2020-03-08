import React from 'react'
import OnboardingContainer from '../../../src/containers/Onboarding'

const OnboardingExample = () => (
  <OnboardingContainer
    questionSettings={{
      progressPercent: 50,
    }}
    status="starting"
    t={t => t}
    userName="Eduardo"
  />
)

export default {
  OnboardingExample,
}
