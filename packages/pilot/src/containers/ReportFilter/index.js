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

class ReportFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dates: {
        start: props.dates.start,
        end: props.dates.end,
      },
      statusSelected: props.statusSelected,
      // statusSelected: 'all',
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
    this.handleCleanFilter = this.handleCleanFilter.bind(this)
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

  handleCleanFilter (dates, statusSelected) {
    this.setState({
      dates,
      statusSelected,
    })
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
                value={this.state.statusSelected}
                options={this.props.items}

              />
            </div>
            <div className={style.buttons}>
              <Button
                fill="outline"
                onClick={this.handleCleanFilter}
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
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  statusSelected: PropTypes.string,
  inputWrited: PropTypes.string,
  strings: PropTypes.arrayOf(
    PropTypes.shape({
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
    start: 'Escolha uma Data',
  },
  statusSelected: 'all',
  inputWrited: '',
}

export default ReportFilter
