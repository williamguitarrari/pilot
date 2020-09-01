import React from 'react'
import { action } from '@storybook/addon-actions'
import Section from '../../Section'
import OnboardingContainer from '../../../src/containers/Onboarding'
import Segments from '../../../src/containers/Onboarding/SegmentOptions/Segments'
import mocks from './mocks'

const WhenDeadEnd = () => (
  <OnboardingContainer
    {...mocks.whenDeadEnd}
    t={t => t}
  />
)

const WhenLoading = () => (
  <OnboardingContainer
    {...mocks.whenLoading}
    t={t => t}
  />
)

const WithCardIconAndSubtitle = () => (
  <OnboardingContainer
    {...mocks.withCardIconAndSubtitle}
    t={t => t}
  />
)

const WithCardIconAndWithoutSubtitle = () => (
  <OnboardingContainer
    {...mocks.withCardIconAndWithoutSubtitle}
    t={t => t}
  />
)

const WithCardWithoutIconAndSubtitle = () => (
  <OnboardingContainer
    {...mocks.withCardWithoutIconAndSubtitle}
    t={t => t}
  />
)

const WithDropdown = () => (
  <OnboardingContainer
    {...mocks.withDropdown}
    t={t => t}
  />
)

const Welcome = () => (
  <OnboardingContainer
    {...mocks.welcome}
    t={t => t}
  />
)

const WithSegments = () => (
  <OnboardingContainer
    {...mocks.withSegments}
    t={t => t}
  />
)

const SegmentOptions = () => (
  <Section>
    <div style={{ width: '374px' }}>
      <Segments
        handleReturn={action('handleReturn')}
        handleSubmit={action('handleSubmit')}
        subtitle="Serviços e cursos"
        options={mocks.segmentOptions}
      />
    </div>
  </Section>
)

export default {
  SegmentOptions,
  Welcome,
  WhenDeadEnd,
  WhenLoading,
  WithCardIconAndSubtitle,
  WithCardIconAndWithoutSubtitle,
  WithCardWithoutIconAndSubtitle,
  WithDropdown,
  WithSegments,
}
