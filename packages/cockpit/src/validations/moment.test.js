import moment from 'moment'

describe('it should consider daylight saving time', () => {
  const dayWithoutDST = moment('2018-11-03')
  const dayWithDST = moment('2018-11-04')

  it('03/11/2018 shouldnt be DST', () => {
    expect(dayWithoutDST.isDST()).toBe(false)
  })

  it('04/11/2018 should be DST', () => {
    expect(dayWithDST.isDST()).toBe(true)
  })
})
