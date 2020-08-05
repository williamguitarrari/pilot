import React from 'react'
import { path, split } from 'ramda'
import { action } from '@storybook/addon-actions'
import Section from '../../../Section'
import Card from '../../../../src/containers/ChooseDashboard/Card'
import dashboardImg from './dashboard.png'

import translations from '../../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const LegacyDashboardCard = () => (
  <Section>
    <Card
      imgAlt="dashboard legada"
      imgSrc={dashboardImg}
      onClick={action('onClick')}
      title="Dashboard legada"
      message="Indicada para clientes que utilizam o Pagar.me para gerenciar recorrências, a Dashboard legada já não recebe mais atualizações e melhorias."
      t={t}
    />
  </Section>
)

const NewDashboard = () => (
  <Section>
    <Card
      imgAlt="nova dashboard"
      imgSrc={dashboardImg}
      onClick={action('onClick')}
      title="Nova Dashboard"
      message="A Nova Dashboard é a mais indicada para nosso clientes, ela oferece uma usabilidade mais agradável e eficiente para o dia a dia do seu negócio, também está constantemente recebendo atualizações e melhorias."
      recommended
      t={t}
    />
  </Section>
)

export default { LegacyDashboardCard, NewDashboard }
