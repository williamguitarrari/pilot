import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MacroSegments from './MacroSegments'

test('MacroSegments should render', () => {
  const notFoundText = 'Não encontrei o segmento do meu negócio'
  const options = ['Alimentos', 'Outros']
  const handleSubmit = jest.fn()
  const handleNotFound = jest.fn()
  const svg = () => <svg />

  const { container, getByText } = render(
    <MacroSegments
      notFoundText={notFoundText}
      images={[svg, svg]}
      options={options}
      handleNotFound={handleNotFound}
      handleSubmit={handleSubmit}
    />
  )

  userEvent.click(getByText('Alimentos'))
  expect(handleSubmit).toHaveBeenCalledTimes(1)

  userEvent.click(getByText('Outros'))
  expect(handleSubmit).toHaveBeenCalledTimes(2)

  userEvent.click(getByText(notFoundText))
  expect(handleNotFound).toHaveBeenCalledTimes(1)

  expect(container).toMatchSnapshot()
})
