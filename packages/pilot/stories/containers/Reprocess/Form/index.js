import React from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'
import { path } from 'ramda'
import {
  Modal,
  ModalContent,
} from 'former-kit'
import ReprocessForm from '../../../../src/containers/Reprocess/Form'

const translations = {
  attention: 'Atenção!',
  pages: {
    reprocess: {
      reprocess: 'Reprocessar',
      reprocess_with_antifraud: 'Reprocessar com antifraude',
      reprocess_without_antifraud: 'Reprocessar sem antifraude',
      success_reprocess_disclaimer: 'Se você utiliza algum serviço ou plataforma, lembre-se de atualizar o status dessa transação.',
      without_antifraud_disclaimer_1: 'Ao prosseguir com a opção ',
      without_antifraud_disclaimer_2: 'sem antifraude',
      without_antifraud_disclaimer_3: ', você reprocessará uma transação com potencial risco de fraude e as consequências decorrentes da decisão serão de sua integral responsabilidade. Leia mais sobre reprocessamento na ',
      without_antifraud_disclaimer_4: 'nossa documentação.',
      without_antifraud_documentation_link: 'https://docs.pagar.me/page/reprocessamento-sem-antifraude',
    },
  },
}

const ReprocessFormState = ({
  allowReprocessWithoutAntifraud,
  disableWithoutAntifraudReprocess,
  lockReason,
}) => (
  <Modal isOpen>
    <ModalContent>
      <ReprocessForm
        allowReprocessWithoutAntifraud={allowReprocessWithoutAntifraud}
        amount={2000000}
        disableWithoutAntifraudReprocess={disableWithoutAntifraudReprocess}
        holderName="Lorem Ipsum de Consectetuer e Amet"
        lockReason={lockReason}
        onReprocessWithAntifraud={action('onReprocessWithAntifraud')}
        onReprocessWithoutAntifraud={action('onReprocessWithoutAntifraud')}
        t={translation => path(translation.split('.'), translations) || translation}
        transactionId={123456789}
      />
    </ModalContent>
  </Modal>
)

ReprocessFormState.propTypes = {
  allowReprocessWithoutAntifraud: PropTypes.bool,
  disableWithoutAntifraudReprocess: PropTypes.bool,
  lockReason: PropTypes.string,
}

ReprocessFormState.defaultProps = {
  allowReprocessWithoutAntifraud: false,
  disableWithoutAntifraudReprocess: false,
  lockReason: null,
}

export default ReprocessFormState
