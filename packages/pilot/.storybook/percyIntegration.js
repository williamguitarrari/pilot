import { configure } from '@storybook/react'
import mockDate from 'mockdate'
import inPercy from '@percy-io/in-percy'

if (inPercy()) {
  mockDate.set(1506815400000)
}

const req = require.context('../stories', true, /\.js$/)
function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
