import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  Legend,
} from 'former-kit'
import reportStatusLegend from '../../models/reportStatusLegend'
import style from './style.css'

class ReportCard extends Component {
  constructor () {
    super()
    this.state = {
      collapsed: true,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    const {
      actions,
      filterLabel,
      status,
      subtitle,
      t,
      title,
    } = this.props
    return (
      <CardContent>
        <CardSection>
          <CardSectionDoubleLineTitle
            actions={actions}
            collapsed={this.state.collapsed}
            icon={
              <Legend
                acronym={t(`models.report.status_acronym_of.${status}`)}
                color={reportStatusLegend[status].color}
                hideLabel
              >
                {t(`models.report.status_acronym_of.${status}`)}
              </Legend>
            }
            onClick={this.handleClick}
            subtitle={subtitle}
            title={title}
          />
          {!this.state.collapsed &&
            <CardContent className={style.reportDetails}>
              <span>{filterLabel}</span>
              <span>{t('pages.report.status')}: {t(`models.report.status_of.${status}`)} </span>
            </CardContent>
          }
        </CardSection>
      </CardContent>
    )
  }
}

ReportCard.propTypes = {
  actions: PropTypes.node.isRequired,
  filterLabel: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  subtitle: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
}

export default ReportCard

