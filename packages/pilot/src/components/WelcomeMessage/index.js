import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox } from 'former-kit'
import WelcomeImage from './welcome.svg'
import styles from './styles.css'

const WelcomeMessage = ({ onDisableWelcome, t, userName }) => (
  <Flexbox
    alignItems="center"
    className={styles.welcomeMessage}
    direction="column"
  >
    <WelcomeImage />
    <h1>{t('pages.empty_state.welcome.title', { userName })}</h1>
    <p>
      {`${t('pages.empty_state.welcome.message')} `}
      <button onClick={onDisableWelcome} role="link" type="button">
        {t('pages.empty_state.welcome.turn_off')}
      </button>
    </p>
  </Flexbox>
)

WelcomeMessage.propTypes = {
  onDisableWelcome: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}

export default WelcomeMessage
