import './themeDecorator'
import './percyIntegration'
import { withOptions } from '@storybook/addon-options'

withOptions({
  brandTitle: 'Pilot',
  brandUrl: 'https://github.com/pagarme/pilot',
  hierarchyRootSeparator: /\|/,
})
