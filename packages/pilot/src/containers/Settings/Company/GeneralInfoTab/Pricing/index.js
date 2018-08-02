import PropTypes from 'prop-types'
import React from 'react'

import {
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
  Col,
  Grid,
  Table,
  Row,
} from 'former-kit'

import IconPercent from 'emblematic-icons/svg/Percent32.svg'

import decimalCurrencyFormatter
  from '../../../../../formatters/decimalCurrency'

const getColumns = t => [
  {
    accessor: ['title'],
    orderable: true,
    title: t('pages.settings.company.pricing.service'),
  },
  {
    accessor: ['description'],
    orderable: true,
    title: t('pages.settings.company.pricing.description'),
  },
  {
    accessor: ['cost'],
    orderable: true,
    title: t('pages.settings.company.pricing.cost'),
    renderer: (item) => {
      if (item.unit === '%') {
        return item.cost + item.unit
      }
      return item.unit + decimalCurrencyFormatter(item.cost)
    },
  },
]

class Pricing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pricingCollapsed: true,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.renderContent = this.renderContent.bind(this)
  }

  handleSectionTitleClick () {
    this.setState({
      pricingCollapsed: !this.state.pricingCollapsed,
    })
  }

  renderContent () {
    const {
      onOrderChange,
      pricing,
      t,
    } = this.props

    return (
      <CardContent>
        <Grid>
          <Row>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              {t('pages.settings.company.card.general.headline.rate')}
            </Col>
          </Row>
          <Row>
            <Col>
              <Table
                columns={getColumns(t)}
                rows={pricing}
                onOrderChange={onOrderChange}
              />
            </Col>
          </Row>
        </Grid>
      </CardContent>
    )
  }

  render () {
    const {
      t,
    } = this.props

    return (
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={this.state.pricingCollapsed}
          icon={<IconPercent height={16} width={16} />}
          onClick={this.handleSectionTitleClick}
          subtitle={t('pages.settings.company.card.general.subtitle.rate')}
          title={t('pages.settings.company.card.general.title.rate')}
        />
        {!this.state.pricingCollapsed
          && this.renderContent()
        }
      </CardSection>
    )
  }
}

Pricing.propTypes = {
  onOrderChange: PropTypes.func.isRequired,
  pricing: PropTypes.arrayOf(PropTypes.shape({
    cost: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
}

export default Pricing
