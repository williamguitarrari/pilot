import {
  assoc,
  propEq,
  when,
} from 'ramda'

const formatConversion = when(
  propEq('total', 0),
  assoc('conversion', 0)
)

const buildResult = ([cardResult, boletoResult]) => ({
  card: formatConversion(cardResult),
  boleto: formatConversion(boletoResult),
})

export default buildResult
