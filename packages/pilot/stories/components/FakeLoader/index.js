import React from 'react'
import {
  always,
  cond,
  equals,
} from 'ramda'

import FakeLoader from '../../../src/components/FakeLoader'

const translations = cond([
  [equals('components.fake_loader.title'), always('Preparando o seu painel')],
  [equals('components.fake_loader.steps_info'), (...[, { currentStep, finalStep }]) => `Passo ${currentStep} de ${finalStep}:`],
  [equals('components.fake_loader.step_1'), always('Gerando a sua chave de API')],
  [equals('components.fake_loader.step_2'), always('Organizando as documentações')],
  [equals('components.fake_loader.step_3'), always('Customizando a sua interface')],
])

const FakeLoaderExample = () => (
  <FakeLoader t={translations} />
)

export default FakeLoaderExample
