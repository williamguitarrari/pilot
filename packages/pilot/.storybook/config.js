import './themeDecorator'
import './percyIntegration'
import { setOptions } from '@storybook/addon-options'

setOptions({
  name: 'Pilot',
  url: 'https://github.com/pagarme/pilot',
  hierarchyRootSeparator: /\|/,
})
