import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  DateInput,
  Dropdown,
  Input,
} from 'former-kit'
import moment from 'moment'
import Calendar32 from 'emblematic-icons/svg/Calendar32.svg'
import Search32 from 'emblematic-icons/svg/Search32.svg'
import style from './style.css'

const findByLabel = 'Filtre pelo nome do relatório'

const options = [
  {
    value: '00',
    name: 'Todos os status',
  },
  {
    value: '01',
    name: 'teste1',
  },
  {
    value: '02',
    name: 'teste2',
  },
  {
    value: '03',
    name: 'teste3',
  },
]

// const statusLabel = 'Selecione um status'

// const ReportFilter = () => (
// Isso é uma função pura.
// )

// Renderizando componentes
// Não esquecer do return()
// renderCard() {
//   return()
// }

class ReportFilter extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        start: props.dates.start,
        end: props.dates.end,
      },
    }

    this.datePresets = [
      {
        title: 'Últimos:',
        items: [
          {
            key: 'last-7',
            title: '7 dias',
            date: () => -7,
          },
          {
            key: 'last-15',
            title: '15 dias',
            date: () => -15,
          },
          {
            key: 'last-30',
            title: '30 dias',
            date: () => -30,
          },
          {
            key: 'last-60',
            title: '60 dias',
            date: () => -60,
          },
        ],
      },
    ]

    this.handleDatesChange = this.handleDatesChange.bind(this)

    // Precisamos de um reset?
    // this.handleReset = this.handleReset.bind(this)
  }

  // componentWillReceiveProps ({ start, end }) {
  //   this.setState({ dates: { start, end } })
  // }

  // O reset seria o Cancel?
  // handleReset () {
  //   const { start, end } = this.props
  //   this.setState({ dates: { start, end } })
  // }

  handleDatesChange (dates) {
    this.setState({ dates })
  }

  render () {
    const { dates } = this.state

    return (
      <Card className={style.reportFilter}>
        <form action="/" method="post">
          <CardContent className={style.filterContent}>
            <div className={style.inputs}>
              <DateInput
                className={style.dateField}
                presets={this.datePresets}
                dates={dates}
                onChange={this.handleDatesChange}
                active={dates.start && dates.end && true}
                limits={{
                lower: moment('01-01-2013', 'DD-MM-YYYY'),
                upper: moment('01-01-2025', 'DD-MM-YYYY'),
                }}
                icon={<Calendar32 width={16} height={16} />}
                // strings={strings}
              />
              <Input
                className={style.searchField}
                icon={
                  <Search32
                    width={16}
                    height={16}
                  />
                }
                placeholder={findByLabel}
              />
              <Dropdown
                className={style.statusField}
                options={options}
                value="teste2"
              />
            </div>
            <div className={style.buttons}>
              <Button
                fill="outline"
                onClick=""
              >
                Limpar Filtros
              </Button>
              <Button
                fill="gradient"
                onClick=""
              >
                Filtrar
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    )
  }
}

ReportFilter.propTypes = {
  dates: PropTypes.shape({
    start: PropTypes.instanceOf(moment),
    end: PropTypes.instanceOf(moment),
  }),
}

ReportFilter.defaultProps = {
  // atentar-se a maneira como estão vindo os objetos
  // se trago dentro de dates, recebo dentro de dates
  dates: {
    start: '',
    end: '',
  },
}

export default ReportFilter
