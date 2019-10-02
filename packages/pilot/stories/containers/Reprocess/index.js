import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  always,
  cond,
  equals,
  path,
} from 'ramda'
import { action } from '@storybook/addon-actions'
import Reprocess from '../../../src/containers/Reprocess'

const translations = {
  attention: 'Atenção!',
  pages: {
    reprocess: {
      confirm: 'Confirmar',
      confirm_with_antifraud: 'Confirmar reprocessamento com antifraude',
      confirm_without_antifraud: 'Confirmar reprocessamento sem antifraude',
      confirmation: 'Confirmação',
      go_back: 'Voltar',
      identification: 'Identificação',
      reprocess: 'Reprocessar',
      reprocess_with_antifraud: 'Reprocessar com antifraude',
      reprocess_without_antifraud: 'Reprocessar sem antifraude',
      result: 'Resultado',
      success_reprocess_disclaimer: 'Se você utiliza algum serviço ou plataforma, lembre-se de atualizar o status dessa transação.',
      without_antifraud_disclaimer_1: 'Atenção! Ao prosseguir com a opção ',
      without_antifraud_disclaimer_2: 'sem antifraude',
      without_antifraud_disclaimer_3: ', você reprocessará uma transação com potencial risco de fraude e as consequências decorrentes da decisão serão de sua integral responsabilidade. Leia mais sobre reprocessamento na ',
      without_antifraud_disclaimer_4: 'nossa documentação.',
      without_antifraud_documentation_link: 'https://docs.pagar.me/page/reprocessamento-sem-antifraude',
    },
  },
}

const getNextStep = cond([
  [equals('identification'), always('confirmation')],
  [equals('confirmation'), always('result')],
])

const getPreviousStep = cond([
  [equals('confirmation'), always('identification')],
  [equals('result'), always('confirmation')],
])

const ReprocessState = ({
  allowReprocessWithoutAntifraud,
  currentStep: step,
  lockReason,
  statusMessage,
  stepStatus,
}) => {
  const [currentStep, setCurrentStep] = useState(step || 'identification')
  const [steps, setSteps] = useState(stepStatus)
  const [loading, setLoading] = useState(false)

  const handleNextStep = () => {
    const nextStep = getNextStep(currentStep)

    setSteps({
      [currentStep]: 'success',
      [nextStep]: 'current',
    })
    setCurrentStep(nextStep)
  }

  const handlePreviousStep = () => {
    const previousStep = getPreviousStep(currentStep)

    setSteps({
      [currentStep]: 'pending',
      [previousStep]: 'current',
    })
    setCurrentStep(previousStep)
  }

  const handleRestart = () => setSteps({
    confirmation: 'pending',
    identification: 'current',
    result: 'pending',
  })

  const handleReprocess = (reprocessOptions) => {
    const reprocessAction = action('onReprocess')
    reprocessAction(reprocessOptions)

    setLoading(true)

    setTimeout(() => {
      setSteps({
        confirmation: 'success',
        identification: 'success',
        result: 'success',
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <Reprocess
      allowReprocessWithoutAntifraud={allowReprocessWithoutAntifraud}
      isOpen
      loading={loading}
      lockReason={lockReason}
      onCancel={action('cancel')}
      onCopyId={action('copy id')}
      onBack={handlePreviousStep}
      onForward={handleNextStep}
      onReprocess={handleReprocess}
      onRestart={handleRestart}
      onViewTransaction={action('view transaction')}
      statusMessage={statusMessage}
      stepStatus={steps}
      transaction={{
        amount: 2000000,
        card: {
          holder_name: 'Lorem Ipsum de Consectetuer e Amet',
        },
        id: 1,
      }}
      t={translation => path(translation.split('.'), translations) || translation}
    />
  )
}

ReprocessState.propTypes = {
  allowReprocessWithoutAntifraud: PropTypes.bool,
  currentStep: PropTypes.string,
  lockReason: PropTypes.string,
  statusMessage: PropTypes.string,
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.string,
    result: PropTypes.string,
  }),
}

ReprocessState.defaultProps = {
  allowReprocessWithoutAntifraud: false,
  currentStep: null,
  lockReason: null,
  statusMessage: '',
  stepStatus: {
    confirmation: 'current',
    result: null,
  },
}

export default ReprocessState
