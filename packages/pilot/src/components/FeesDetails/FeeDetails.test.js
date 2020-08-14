import React from 'react'
import { identity } from 'ramda'
import { render } from '@testing-library/react'
import FeesDetails from '.'

const feesBase = {
  anticipation: 3.14,
  antifraud: 70,
  boleto: 380,
  gateway: 50,
  transfer: 367,
}

test('render 1, 2 and 7 installments with all fees', () => {
  const fees = {
    ...feesBase,
    installments: [
      { installment: 1, mdr: 3.79 },
      { installment: 2, mdr: 4.19 },
      { installment: 7, mdr: 4.59 },
    ],
  }

  const {
    getByText,
    queryByText,
  } = render(<FeesDetails fees={fees} t={identity} />)

  getByText(/fees.one_installment/)
  getByText(/fees.two_to_six_installments/)
  getByText(/fees.seven_or_more_installments/)
  expect(queryByText(/fees.per_transaction/)).toBe(null)
})

test('render 1 installments with all fees and isMDRzao enabled', () => {
  const fees = {
    ...feesBase,
    installments: [
      { installment: 1, mdr: 3.79 },
    ],
  }

  const {
    getByText,
  } = render(<FeesDetails fees={fees} t={identity} isMDRzao />)

  getByText(/fees.mdrzao_installment/)
  getByText(/fees.per_transaction/)
})

test('render no installments are provided', () => {
  const fees = {
    ...feesBase,
    installments: [],
  }

  const {
    queryByText,
  } = render(<FeesDetails fees={fees} t={identity} />)

  expect(queryByText(/fees.one_installment/)).toBe(null)
  expect(queryByText(/fees.two_to_six_installments/)).toBe(null)
  expect(queryByText(/fees.seven_or_more_installments/)).toBe(null)
  expect(queryByText(/fees.per_transaction/)).toBe(null)
})
