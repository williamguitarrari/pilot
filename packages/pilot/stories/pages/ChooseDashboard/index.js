import React from 'react'
import { path, split } from 'ramda'
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import ChooseDashboardPage from '../../../src/containers/ChooseDashboard'

import translations from '../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

storiesOf('Pages|Choose Dashboard', module)
  .addDecorator(withA11y)
  .add('main', () => <ChooseDashboardPage t={t} />)

