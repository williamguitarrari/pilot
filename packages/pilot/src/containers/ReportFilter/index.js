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

// const statusLabel = 'Selecione um status'

// const ReportFilter = () => (
// Isso é uma função pura.
// )

// Renderizando componentes
// Não esquecer do return()
// renderCard() {
//   return()
// }

// props, quando você está recebendo valores, parametros
// state, quando você enviar valores, parametros
// Quando um component tem os dois é pq este component
// envia e recebe valores e parametros

class ReportFilter extends Component {
  constructor (props) {
    super(props)
    // Se começo a receber muitas props, monto a estrutura abaixo
    // São os valores que receberei através da props
    // const {
    //   label,
    //   value,
    // } = props
    // Que ai não preciso escrever props.statusSelected e etc
    this.state = {
      dates: {
        start: props.dates.start,
        end: props.dates.end,
      },
      // name (label) quem me da o name é o dropdown
      statusSelected: props.statusSelected,
      inputWrited: props.inputWrited,
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

    this.somethingWithButton = this.somethingWithButton.bind(this)
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

  somethingWithButton (dates) {
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
                strings={this.props.strings}
              />
              <Input
                className={style.searchField}
                icon={
                  <Search32
                    width={16}
                    height={16}
                  />
                }
                onChange={e => this.setState({
                  inputWrited: e.target.value,
                  })}
                value={this.state.inputWrited}
                placeholder={findByLabel}
              />
              <Dropdown
                className={style.statusField}
                name="filterDropdown"
                onChange={event => this.setState({
                  statusSelected: event.target.value,
                  })}
                // o value é a variável
                options={this.props.items} // pro options lista
                value={this.state.statusSelected}
                // this state pois estou enviando esse dado para recebê-lo
                // novamente e mudar o state da app
                // componente burro sem state interno
                // normalmente state só em containers e pages
              />
            </div>
            <div className={style.buttons}>
              <Button
                fill="outline"
                onClick={this.somethingWithButton}
              >
                Limpar Filtros
              </Button>
              <Button
                fill="gradient"
                onClick={this.somethingWithButton}
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // atneção todos all
      value: PropTypes.string.isRequired,
    })).isRequired,
  statusSelected: PropTypes.string,
  inputWrited: PropTypes.string,
  strings: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.string,
    dateInput: PropTypes.string,
    dateSelector: PropTypes.string,
    end: PropTypes.string,
    error: PropTypes.string,
    focused: PropTypes.string,
    icon: PropTypes.string,
    input: PropTypes.string,
    separator: PropTypes.string,
    start: PropTypes.string,
  })),
}

ReportFilter.defaultProps = {
  // atentar-se a maneira como estão vindo os objetos
  // se trago dentro de dates, recebo dentro de dates
  dates: {
    start: '',
    end: '',
  },
  strings: {
    active: '',
    dateInput: '',
    dateSelector: '',
    end: '',
    error: '',
    focused: '',
    icon: '',
    input: '',
    separator: '',
    start: '',
  },
  statusSelected: '',
  inputWrited: '',
}

export default ReportFilter
