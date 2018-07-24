import React from 'react'

import Section from '../../Section'
import ErrorIcon from '../../../src/components/TransferError/ErrorIcon.svg'
import { Message } from '../../../src/components/Message'

const MessageExample = () => (
  <Section>
    <Message
      image={<ErrorIcon />}
      message={
        <span>
          Algo inesperado aconteceu
        </span>
      }
      title="Erro!"
    />
  </Section>
)

export default MessageExample
