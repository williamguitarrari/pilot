import React from 'react'

import Section from '../../Section'
import CopyButton from '../../../src/components/CopyButton'

const handleCopy = (content) => {
  const textarea = document.createElement('textarea')
  textarea.textContent = content

  textarea.style.opacity = 0
  textarea.style.position = 'absolute'

  document.body.appendChild(textarea)
  textarea.select()

  const copy = document.execCommand('copy')
  document.body.removeChild(textarea)

  return copy
}

const CopyButtonExample = () => (
  <Section>
    <CopyButton
      feedbackText="Copiado!"
      feedbackTimeout={2000}
      onClick={() => handleCopy('hello world!')}
      title="Copiar"
    />
  </Section>
)

export default CopyButtonExample
