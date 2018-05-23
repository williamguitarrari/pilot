import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardActions,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  Legend,
  Popover,
  PopoverMenu,
} from 'former-kit'
import moment from 'moment'
import { path } from 'ramda'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import reportStatusLegend from '../../../models/reportStatusLegend'


const items = [
  {
    title: 'PDF',
  },
  {
    title: 'Excel',
  },
  {
    title: 'csv',
  },
]

class ReportItem extends Component {
  constructor (props) {
    super(props)
    this.handleClickItem = this.handleClickItem.bind(this)
  }

  handleClickItem () {
    const {
      report,
      onClick,
    } = this.props
    onClick(report.id)
  }

  render () {
    const {
      report,
      cardExpanded,
    } = this.props
    return (
      <CardContent key={report.id}>
        <CardSection>
          <CardSectionDoubleLineTitle
            title={report.type}
            subtitle={`Período: ${moment(report.data.created_at).format('DD/MM/YYYY')} até ${moment(report.data.updated_at).format('DD/MM/YYYY')} | Criado: ${moment(report.created_at).format('DD/MM/YYYY')}`}
            collapsed={!cardExpanded}
            icon={
              <Legend
                color={path([report.status, 'color'], reportStatusLegend)}
                acronym={path([report.status, 'acronym'], reportStatusLegend)}
                hideLabel
              />
            }
            onClick={this.handleClickItem}
          />
          {cardExpanded &&
            <div>
              <CardContent>
                Filtros
                <p>Status: {path([report.status, 'text'], reportStatusLegend)}</p>
              </CardContent>
              <CardActions>
                <Popover
                  placement="bottomEnd"
                  content={
                    <Fragment>
                      <div>
                        <strong>Exportar para:</strong>
                      </div>
                      <PopoverMenu items={items} />
                    </Fragment>
                  }
                >
                  <Button
                    fill="outline"
                    icon={<DownloadIcon width={12} height={12} />}
                  >
                      Exportar
                  </Button>
                </Popover>
              </CardActions>
            </div>
            }
        </CardSection>
      </CardContent>
    )
  }
}

ReportItem.propTypes = {
  report: PropTypes.shape({
    data: PropTypes.shape({
      company_id: PropTypes.string,
      created_at: PropTypes.instanceOf(moment),
      updated_at: PropTypes.instanceOf(moment),
    }).isRequired,
    object: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    created_at: PropTypes.instanceOf(moment),
    updated_at: PropTypes.instanceOf(moment),
  }).isRequired,
  cardExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ReportItem
