import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardTitle,
  Dropdown,
  Pagination,
} from 'former-kit'
import AddIcon from 'emblematic-icons/svg/Add32.svg'
import moment from 'moment'
import { contains } from 'ramda'
import style from './style.css'
import ReportCard from '../../components/ReportCard'

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

class ReportList extends Component {
  constructor (props) {
    super(props)
    const {
      currentPage,
      totalPages,
    } = props
    this.state = {
      selected: 'ten',
      currentPage: currentPage || 1,
      totalPages: totalPages || 10,
    }

    this.pageChanged = this.pageChanged.bind(this)
  }


  pageChanged (page) {
    this.setState({
      currentPage: page,
    })
  }

  renderReportList () {
    const {
      reports,
    } = this.props
    return reports.map(report => (
      <ReportCard
        actions={() => null}
        report={report}
        subtitle="teste"
        title="teste"
      />
    ))
  }

  render () {
    const { currentPage, totalPages } = this.state
    const { disabled } = this.props
    const error = totalPages < currentPage || currentPage === 0

    return (
      <Card>
        <CardTitle
          title="Relatórios - Total de 75"
          subtitle={
            <div className={style.cardComponent}>
              <Button
                size="default"
                relevance="low"
                fill="outline"
                icon={<AddIcon width={12} height={12} />}
              >
              Novo Relatório
              </Button>
              <Dropdown
                name="dropdown"
                options={options}
                onChange={event => this.setState({ selected: event.target.value })}
                value={this.state.selected}
                placeholder="Itens por página"
                error=""
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this.pageChanged}
                strings={this.props.strings.of}
                disabled={disabled}
              />
              {error &&
                <p>Epic fail!</p>
              }
            </div>
          }
        />
        {this.renderReportList()}
      </Card>
    )
  }
}

ReportList.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.shape({
    object: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.shape({
      company_id: PropTypes.string,
      created_at: PropTypes.instanceOf(moment),
      updated_at: PropTypes.instanceOf(moment),
    }).isRequired,
    created_at: PropTypes.instanceOf(moment),
    updated_at: PropTypes.instanceOf(moment),
  })).isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  disabled: PropTypes.bool,
  strings: PropTypes.shape({
    of: PropTypes.string,
  }),
  // size: PropTypes.string,
  // relevance: PropTypes.string,
  // fill: PropTypes.string,
  // icon: PropTypes.string,
}

ReportList.defaultProps = {
  currentPage: 1,
  totalPages: 10,
  disabled: false,
  strings: {
    of: '',
  },
}

export default ReportList
