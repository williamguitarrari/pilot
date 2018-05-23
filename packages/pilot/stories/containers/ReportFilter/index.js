import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  DateInput,
  Dropdown,
  Input,
} from 'former-kit'
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
  }
]

const statusLabel = 'Selecione um status'

const ReportFilter = () => (
  <Card className={style.reportFilter}>
    <form action="/" method="post">
      <CardContent className={style.filterContent}>
        <div className={style.inputs}>
          <DateInput
            className={style.dateField}
            icon={<Calendar32 width={16} height={16} />}
          />
          <Input
            className={style.searchField}
            icon={<Search32 width={16}
              height={16} />}
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
            fill='outline'
            onClick=""
          >
            Limpar Filtros
          </Button>
          <Button
            fill='gradient'
            onClick=""
          >
            Filtrar
          </Button>
        </div>
      </CardContent>
    </form>
  </Card>
)

export default ReportFilter
