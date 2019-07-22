import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info32.svg'
import PasswordRedefinitionForm from './passwordRedefinitionForm'

class UserSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passwordInfoSectionCollapsed: false,
    }
  }

  handleSectionTitleClick (cardSectionStateProp) {
    return () => {
      const {
        [cardSectionStateProp]: currentCollapseState,
      } = this.state

      this.setState({
        [cardSectionStateProp]: !currentCollapseState,
      })
    }
  }

  render () {
    const {
      handlePasswordFormSubmit,
      passwordFormStatus,
      t,
    } = this.props

    const { passwordInfoSectionCollapsed } = this.state

    return (
      <Card>
        <CardTitle
          title={t('pages.settings.user.card.header')}
        />

        <CardContent>
          <CardSection>
            <CardSectionDoubleLineTitle
              collapsed={passwordInfoSectionCollapsed}
              icon={<IconInfo height={16} width={16} />}
              onClick={this.handleSectionTitleClick('passwordInfoSectionCollapsed')}
              subtitle={t('pages.settings.user.card.access.subtitle')}
              title={t('pages.settings.user.card.access.title')}
            />
            {!passwordInfoSectionCollapsed
              && (
                <PasswordRedefinitionForm
                  onSubmit={handlePasswordFormSubmit}
                  status={passwordFormStatus}
                  t={t}
                />
              )
            }
          </CardSection>
        </CardContent>
      </Card>
    )
  }
}

UserSettings.propTypes = {
  handlePasswordFormSubmit: PropTypes.func.isRequired,
  passwordFormStatus: PropTypes.shape({
    error: PropTypes.string,
    success: PropTypes.bool,
  }),
  t: PropTypes.func,
}

UserSettings.defaultProps = {
  passwordFormStatus: {
    error: null,
    success: false,
  },
  t: t => t,
}

export default UserSettings
