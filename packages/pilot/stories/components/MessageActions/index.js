import React from 'react'
import { Button } from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import ErrorIcon from '../../../src/components/TransferError/ErrorIcon.svg'

import {
  Message,
  MessageActions,
} from '../../../src/components/Message'

const MessageActionsExample = () => (
  <Section>
    <Message
      image={<ErrorIcon />}
      message={
        <span>Você deseja prosseguir?</span>
      }
      title="Atenção"
    >
      <MessageActions>
        <Button
          fill="outline"
          onClick={action('exit')}
        >
          Sair
        </Button>
        <Button
          fill="gradient"
          onClick={action('agree')}
          relevance="normal"
        >
          Concordar
        </Button>
      </MessageActions>
    </Message>
  </Section>
)

export default MessageActionsExample
