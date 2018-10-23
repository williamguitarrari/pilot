import formatPhone from './index'

describe('Phone Formatter', () => {
  const phone = '(11) 22222-222_'
  const expectedResult = '+551122222222'
  const result = formatPhone(phone)

  it('should format a given phone number', () => {
    expect(result).toEqual(expectedResult)
  })
})
