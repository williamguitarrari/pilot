import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  DateInput,
  Input,
  Dropdown,
} from 'former-kit'
import Search32 from 'emblematic-icons/svg/Search32.svg'
import style from './style.css'

const findByLabel = 'Filtre pelo nome do relatório'

const options = [
  {
    value: '01',
    name: 'teste',
  },
  {
    value: '02',
    name: 'teste',
  },
  {
    value: '03',
    name: 'teste',
  }
]

const statusLabel = 'Todos os status'

const fillButton = [
  'outline',
  'gradient',
]

function limparFiltro(){
  for (i=0; i < length; i++){
    options.options[i]=null
  }
}

const ReportFilter = () => (
  <Card className={style.reportFilter}>
    <form action="/" method="post">
      <CardContent className={style.filterContent}>
        <Input className={style.searchField} icon={<Search32 width={16} height={16} />} placeholder={findByLabel} />
        <Dropdown options={options} placeholder={statusLabel} />
        <CardActions>
        <Button fill={fillButton[0]} onClick={limparFiltro}>
            Limpar Filtros
        </Button>
          <Button fill={fillButton[1]} onClick=''>
            Filtrar
        </Button>
        </CardActions>
      </CardContent>
    </form>
  </Card>
)

export default ReportFilter
