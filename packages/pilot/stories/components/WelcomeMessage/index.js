import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import WelcomeMessage from '../../../src/components/WelcomeMessage'

const WelcomeMessageSample = () => (
  <Section>
    <WelcomeMessage onDisableWelcome={action('disable welcome')} t={t => t} userName="José" />
  </Section>
)

export default WelcomeMessageSample
