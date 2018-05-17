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
import reportStatus from './reportStatus.js'
import reportStatusLegend from './reportStatusLegend.js'
import TrashIcon from 'emblematic-icons/svg/Trash32.svg'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import { action } from '@storybook/addon-actions'
import moment from 'moment'

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

const reports = [
  {
    "object": "report",
    "id": "rep_cjh9e4bpi00001uo73cmoxwur",
    "status": "waiting",
    "type": "plans",
    "data": {
      "company_id": "58ebcf091173c91400a0b05d",
      "created_at": "2018-03-11T00:00:00.000Z",
      "updated_at": "2018-03-11T00:00:00.000Z"
    },
    "url": null,
    "created_at": "2018-05-16T17:38:49.544Z",
    "updated_at": "2018-05-16T17:38:49.891Z"
  },
  {
    "object": "report",
    "id": "rep_cjh9e4bpi00001uo73cmoxwur",
    "status": "waiting",
    "type": "plans",
    "data": {
      "company_id": "58ebcf091173c91400a0b05d",
      "created_at": "2018-03-11T00:00:00.000Z",
      "updated_at": "2018-03-11T00:00:00.000Z"
    },
    "url": null,
    "created_at": "2018-05-16T17:38:49.544Z",
    "updated_at": "2018-05-16T17:38:49.891Z"
  },
  {
    "object": "report",
    "id": "rep_cjh9e4bpi00001uo73cmoxwur",
    "status": "waiting",
    "type": "plans",
    "data": {
      "company_id": "58ebcf091173c91400a0b05d",
      "created_at": "2018-03-11T00:00:00.000Z",
      "updated_at": "2018-03-11T00:00:00.000Z"
    },
    "url": null,
    "created_at": "2018-05-16T17:38:49.544Z",
    "updated_at": "2018-05-16T17:38:49.891Z"
  },
  {
    "object": "report",
    "id": "rep_cjg42vnma00840qqk9j3jhra6",
    "status": "ready",
    "type": "plans",
    "data": {
      "company_id": "58ebcf091173c91400a0b05d",
      "created_at": "2018-03-11T00:00:00.000Z",
      "updated_at": "2018-03-11T00:00:00.000Z"
    },
    "url": "http://s3.amazonaws.com/tractor-bucket/public/plans_cjg43qugq000j0wluzdr2rtxj.json?AWSAccessKeyId=AKIAJ5I56BZT2LHB75KQ&Expires=1525278318&Signature=pNDsGG8gEcYawzMjNPrbXkq5DbU%3D",
    "created_at": "2018-04-17T19:45:36.082Z",
    "updated_at": "2018-04-17T20:09:51.418Z"
  },
  {
    "object": "report",
    "id": "rep_cjh9eevpv00031uo7st5nscqc",
    "status": "ready",
    "type": "plans",
    "data": {
      "company_id": "58ebcf091173c91400a0b05d",
      "created_at": "2018-03-11T00:00:00.000Z",
      "updated_at": "2018-03-11T00:00:00.000Z"
    },
    "url": "http://s3.amazonaws.com/tract-live/public/plans_cjh9eew06000012rxte25jpkr.json?AWSAccessKeyId=AKIAIUD2DGLYBPF7X3FA&Expires=1526493233&Signature=ce4THQeQV%2Ft%2BDPUnbTHSYo51mCI%3D",
    "created_at": "2018-05-16T17:47:02.035Z",
    "updated_at": "2018-05-16T17:47:02.596Z"
  }
]

// changeStatus = () => {
//   if (reportStatus.items[0].value = 'waiting') {
//     console.log('to esperando')
//     return <span> teste </span>

//   } else if (reportStatus.items[1].value = 'processing') {
//     console.log('to processando')

//   } else if (reportStatus.items[2].value = 'ready') {
//     console.log('to pronto')

//   } else if (reportStatus.items[3].value = 'canceled') {
//     console.log('fui cancelado :(')

//   }
// }

console.log(reportStatus.items[0].label)

export default class ReportListState extends React.Component {
  constructor() {
    super()
    this.state = { collapsed: true }
  }

  render() {
    return (
      <Card>
        <CardTitle
          title="Relatórios - Total de 75"
        />
        {reports.map(report => (
          <CardContent>

            <CardSection >
              <CardSectionDoubleLineTitle
                title={report.type}
                subtitle={`Data: ${moment(report.data.created_at).format('DD/MM/YYYY')} até ${moment(report.data.updated_at).format('DD/MM/YYYY')} | Criado: ${moment(report.created_at).format('DD/MM/YYYY')}`}
                collapsed={this.state.collapsed}
                icon={<Legend color="#4ca9d7" acronym="ZK" hideLabel>Teste</Legend>}
                onClick={
                  collapsed => this.setState({ collapsed: !collapsed })
                }
              />

              {!this.state.collapsed &&
                <Fragment>
                  <CardContent>
                    Status: {report.status}
                  {/* <Popover
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
                    <Button>Click Me</Button>
                  </Popover> */}
                  </CardContent>

                  <CardActions>
                    <Button  fill='outline' icon={<DownloadIcon width={12} height={12} />}>Exportar</Button>
                  </CardActions>
                </Fragment>
              }
            </CardSection>
          </CardContent>
        ))}
      </Card>
    )
  }
}

// const ReportListState = () => (
//   <div>
//     <Card>
//       <CardTitle
//         title="Relatórios - Total de 75"
//       />
//       <CardContent>
//         <CardSection >
//           <CardSectionDoubleLineTitle
//             title="Carta"
//             subtitle="Verifique ou edite as informações da sua empresa"
//             collapsed={false}          
//             icon={<Legend color="#4ca9d7" acronym="ZK"></Legend>}

//           >
//           <CardContent children="asfgerghhethrtrtjrjrtjrjwj">
//           </CardContent>

//           </CardSectionDoubleLineTitle>          
//         </CardSection>
//       </CardContent>
//     </Card>
//   </div>
// )

// export default ReportListState

