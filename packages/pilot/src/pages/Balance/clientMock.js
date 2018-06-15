import mock from '../../containers/Balance/mock.json'

export default {
  balance: {
    search: query => new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock, query)
      }, 1000)
    }),
  },
}
