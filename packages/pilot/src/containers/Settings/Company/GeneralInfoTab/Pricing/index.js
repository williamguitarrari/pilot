import PropTypes from 'prop-types'
import React from 'react'

import {
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconPercent from 'emblematic-icons/svg/Percent32.svg'

import FeesDetails from '../../../../../components/FeesDetails'

class Pricing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pricingCollapsed: true,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
  }

  handleSectionTitleClick () {
    this.setState(({ pricingCollapsed }) => ({
      pricingCollapsed: !pricingCollapsed,
    }))
  }

  render () {
    const {
      fees,
      isMDRzao,
      t,
    } = this.props
    const { pricingCollapsed } = this.state

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={pricingCollapsed}
          icon={<IconPercent height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={t('pages.settings.company.card.general.subtitle.rate')}
          title={t('pages.settings.company.card.general.title.rate')}
        />
        {!pricingCollapsed
          && (
          <CardContent>
            <FeesDetails isMDRzao={isMDRzao} fees={fees} t={t} />
          </CardContent>
          )
        }
      </CardSection>
    )
  }
}

Pricing.propTypes = {
  fees: PropTypes.shape({
    anticipation: PropTypes.number,
    antifraud: PropTypes.number,
    boleto: PropTypes.number,
    gateway: PropTypes.number,
    installments: PropTypes.arrayOf(PropTypes.shape({
      installment: PropTypes.number.isRequired,
      mdr: PropTypes.number.isRequired,
    })),
    transfer: PropTypes.number,
  }).isRequired,
  isMDRzao: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default Pricing
