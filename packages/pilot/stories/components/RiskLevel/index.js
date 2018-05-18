import React from 'react'

import Section from '../../Section'
import RiskLevel from '../../../src/components/RiskLevel'

const RiskLevelExample = () => (
  <Section>
    <RiskLevel level="very_low" />
    <br />
    <RiskLevel level="low" />
    <br />
    <RiskLevel level="moderated" />
    <br />
    <RiskLevel level="high" />
    <br />
    <RiskLevel level="very_high" />
  </Section>
)

export default RiskLevelExample
