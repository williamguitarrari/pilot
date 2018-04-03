import buildResult from './result'
import fromRequest from './mocks/fromRequests.json'
import expectedResult from './mocks/expectedResultMock'
import fromRequestBoleto from './mocks/fromRequestsBoleto.json'
import expectedResultBoleto from './mocks/expectedResultBoleto.json'

describe('Transaction details', () => {
  it('should work when transaction, gatewayOperations, chargebackOperations, payables, company and status are returned', () => {
    expect(buildResult(fromRequest)).toEqual(expectedResult)
  })

  it('should work when boleto has no payable', () => {
    expect(buildResult(fromRequestBoleto)).toEqual(expectedResultBoleto)
  })
})
