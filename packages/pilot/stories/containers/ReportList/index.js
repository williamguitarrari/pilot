import React, { Fragment } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardTitle,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  Legend,
  Popover,
  PopoverMenu,
} from 'former-kit'
import reports from './reports.js'
import reportStatus from './reportStatus.js'
import reportStatusLegend from './reportStatusLegend.js'
import TrashIcon from 'emblematic-icons/svg/Trash32.svg'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import { contains } from 'ramda'

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

export default class ReportListState extends React.Component {
  constructor() {
    super()
    this.state = { expandedCard: [] }

    this.handleClick = this.handleClick.bind(this)
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

  render() {
    return (
      <Card>
        <CardTitle
          title="Relatórios - Total de 75"
        />
        {reports.reports.map(report => (
          <CardContent key={report.id}>
            <CardSection>
              <CardSectionDoubleLineTitle
                title={report.type}
                subtitle={`Data: ${moment(report.data.created_at).format('DD/MM/YYYY')} até ${moment(report.data.updated_at).format('DD/MM/YYYY')} | Criado: ${moment(report.created_at).format('DD/MM/YYYY')}`}

                collapsed={!contains(report.id, this.state.expandedCard)}
                icon={<Legend color="#4ca9d7" acronym="ZK" hideLabel>Teste</Legend>}

                onClick={
                  () => this.handleClick(report.id)
                }
              />
              {contains(report.id, this.state.expandedCard) &&
                <div>
                  <CardContent>
                    Status: {report.status}
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
