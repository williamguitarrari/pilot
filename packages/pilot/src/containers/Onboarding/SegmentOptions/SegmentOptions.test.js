import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SegmentOptions from '.'

test('SegmentOptions should render', () => {
  const handleSubmit = jest.fn()
  const svg = () => <svg />
  const notFound = 'Não encontrei o segmento do meu negócio'
  const options = [
    {
      label: 'Alimentos',
      value: [
        { label: 'Bebidas', value: 'beverages' },
        { label: 'Comidas', value: 'food' },
        { label: 'Suplementos alimentares', value: 'supplements' },
      ],
    },
    {
      label: 'Outros',
      value: [
        { label: 'Tabacaria', value: 'tobacco_products' },
        { label: 'Artigos religiosos', value: 'religious_products' },
        { label: 'Doações', value: 'donations' },
      ],
    },
  ]
  const t = v => v

  const { container, getByText } = render(
    <SegmentOptions
      handleSubmit={handleSubmit}
      images={[svg, svg]}
      notFoundText={notFound}
      options={options}
      t={t}
    />
  )

  userEvent.click(getByText('Alimentos'))
  userEvent.click(getByText('Bebidas'))
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  userEvent.click(container.querySelector('button'))

  userEvent.click(getByText('Outros'))
  userEvent.click(getByText('Tabacaria'))
  expect(handleSubmit).toHaveBeenCalledTimes(2)
  userEvent.click(container.querySelector('button'))

  userEvent.click(getByText('Não encontrei o segmento do meu negócio'))
  expect(handleSubmit).toHaveBeenCalledTimes(3)

  expect(container).toMatchSnapshot()
})
