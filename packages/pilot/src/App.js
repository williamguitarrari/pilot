import React, { Fragment } from 'react'
import { ThemeProvider } from 'former-kit'
import theme from 'former-kit-skin-pagarme'
import { HashRouter } from 'react-router-dom'
import { Provider as StateProvider } from 'react-redux'

import store from './configureStore'
import Root from './pages/Root'

const DevTools = process.env.NODE_ENV !== 'production'
  ? require('./DevTools').default /* eslint-disable-line global-require */
  : Fragment

const App = () => (
  <ThemeProvider theme={theme}>
    <StateProvider store={store}>
      <HashRouter>
        <Fragment>
          <Root />
          <DevTools />
        </Fragment>
      </HashRouter>
    </StateProvider>
  </ThemeProvider>
)

export default App
