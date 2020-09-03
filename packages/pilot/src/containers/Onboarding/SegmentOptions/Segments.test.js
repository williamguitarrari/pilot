import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Segments from './Segments'

test('Segments should render', () => {
  const subtitle = 'Turismo e eventos'
  const options = [
    {
      label: 'Ingressos',
      value: 'ticket',
    }, {
      label: 'Desconto coletivo',
      value: 'discount',
    },
  ]
  const handleSubmit = jest.fn()
  const handleReturn = jest.fn()

  const {
    container, getByText,
  } = render(
    <Segments
      handleReturn={handleReturn}
      handleSubmit={handleSubmit}
      options={options}
      subtitle={subtitle}
    />
  )
  userEvent.click(container.querySelector('button'))
  expect(handleReturn).toHaveBeenCalledTimes(1)

  userEvent.click(getByText(options[0].label))
  expect(handleSubmit).toHaveBeenCalledTimes(1)

  expect(container).toMatchSnapshot()
})
