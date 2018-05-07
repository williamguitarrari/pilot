import { configure, setAddon, getStorybook } from '@storybook/react'
import createPercyAddon from '@percy-io/percy-storybook'
import mockDate from 'mockdate'
import inPercy from '@percy-io/in-percy'

if (inPercy()) {
  mockDate.set(1506815400000)
}

const { percyAddon, serializeStories } = createPercyAddon()

const req = require.context('../stories', true, /\.js$/)
function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
setAddon(percyAddon)

serializeStories(getStorybook)

