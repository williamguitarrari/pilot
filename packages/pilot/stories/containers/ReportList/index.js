import React, { Fragment } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardTitle,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  Dropdown,
  Legend,
  Pagination,
  Popover,
  PopoverMenu,
} from 'former-kit'
import reports from './reports.js'
import reportStatus from './reportStatus.js'
import reportStatusLegend from './reportStatusLegend.js'
import TrashIcon from 'emblematic-icons/svg/Trash32.svg'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import AddIcon from 'emblematic-icons/svg/Add32.svg'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import { contains } from 'ramda'

import style from './style.css'

//variável para preencher o Popover
const items = [
  {
    title: 'Minha Conta',
    action: () => action('account'),
  },
  {
    title: 'Logout',
    action: () => action('logout'),
  },
]

// variável para preencher o Dropdown
const options = [
  {
    name: '5 itens por página',
    value: 'five',
  },
  {
    name: '10 itens por página',
    value: 'ten',
  },
  {
    name: '50 itens por página',
    value: 'fifty',
  },
  {
    name: '100 itens por página',
    value: 'hundred',
  },
]

// variável para conversar com o reportStatusLegend
// para trazer o component Legend com seus 
// parametros preenchidos corretamente
const statusReports = [
  {
    status: 'ready'
  },
  {
    status: 'waiting'
  },
  {
    status: 'processing'
  },
  {
    status: 'canceled'
  },
]

export default class ReportListState extends React.Component {
  constructor(props) {
    super(props)

    //Dropdown
    const { value } = this.props

    //Pagination
    const {
      currentPage,
      totalPages,
    } = props

    this.state = {
      expandedCard: [],
      selected: value,
      currentPage: currentPage || 1,
      totalPages: totalPages || 10,
    }

    this.handleClick = this.handleClick.bind(this)
    this.pageChanged = this.pageChanged.bind(this)
  }

  handleClick(id) {
    if (contains(id, this.state.expandedCard)) {
      this.setState({
        expandedCard: this.state.expandedCard.filter(cardId => cardId !== id)
      })
    } else {
      this.setState({
        expandedCard: [...this.state.expandedCard, id]
      })
    }
  }

  pageChanged(page) {
    this.setState({
      currentPage: page,
    })
  }

  render() {
    // const para Paginator
    const { currentPage, totalPages } = this.state
    const { disabled } = this.props
    const error = totalPages < currentPage || currentPage === 0

    return (
      <Card>
        <CardTitle
          title="Relatórios - Total de 75"
          subtitle={
            <div className={style.cardComponent}>
              <Button size="default" relevance="low" fill="outline" icon={<AddIcon width={12} height={12} />}>Novo Relatório</Button>
              <Dropdown
                name={'dropdown'}
                options={options}
                onChange={event => this.setState({ selected: event.target.value })}
                value={this.state.selected}
                placeholder={'Itens por página'}
                error={''}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this.pageChanged}
                strings={this.props.strings}
                disabled={disabled}
              />
              {error &&
                <p>Epic fail!</p>
              }
            </div>
          }
        />
        {reports.reports.map(report => (
          <CardContent key={report.id}>
            <CardSection>
              <CardSectionDoubleLineTitle
                title={report.type}
                subtitle={`Período: ${moment(report.data.created_at).format('DD/MM/YYYY')} até ${moment(report.data.updated_at).format('DD/MM/YYYY')} | Criado: ${moment(report.created_at).format('DD/MM/YYYY')}`}
                collapsed={!contains(report.id, this.state.expandedCard)}
                // usar path do ramda aqui no Legend
                icon={<Legend color={reportStatusLegend[report.status].color} acronym={reportStatusLegend[report.status].acronym} hideLabel>{reportStatusLegend[report.status].text}</Legend>}
                onClick={
                  () => this.handleClick(report.id)
                }
              />
              {contains(report.id, this.state.expandedCard) &&
                <div>
                  <CardContent>
                    Filtros
                    <p>Status: {reportStatus[statusReports.status].item.label}</p>
                  </CardContent>
                  <CardActions>
                    <Popover
                      placement="bottomEnd"
                      content={
                        <Fragment>
                          <div>
                            <strong>teste@email.com</strong>
                            <small>Administrador</small>
                          </div>
                          <PopoverMenu items={items} />
                        </Fragment>
                      }
                    >
                      <Button fill='outline' icon={<DownloadIcon width={12} height={12} />}>Exportar</Button>
                    </Popover>
                  </CardActions>
                </div>
              }
            </CardSection>
          </CardContent>
        ))}
      </Card>
    )
  }
}