import fetch from 'isomorphic-fetch'

const requestBusinessCalendar = year => (
  fetch(`https://pagarme.github.io/business-calendar/data/brazil/${year}.json`)
    .then(res => res.json())
)


export default requestBusinessCalendar
