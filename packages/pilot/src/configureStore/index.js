let store

const getStore = () => {
  /* eslint-disable global-require */
  if (process.env.NODE_ENV === 'production') {
    store = store || require('./production').default
  } else {
    store = store || require('./development').default
  }

  return store
}

export default getStore()
