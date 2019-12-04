import fetch from 'isomorphic-fetch'

import buildResult from './result'

const all = () => fetch('https://api.openbank.stone.com.br/api/v1/institutions')
  .then(res => res.json())
  .then(buildResult)

export default all
