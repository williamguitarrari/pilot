import React from 'react'
import {
  Card,
  CardTitle,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

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

const ReportListState = () => (
  <div>
    <Card>
      <CardTitle
        title="Relatórios - Total de 75"
      />
      <CardContent>
        <CardSection>
          <CardSectionDoubleLineTitle
            title="Carta"
            subtitle="Verifique ou edite as informações da sua empresa"
            collapsed="false"
          />
        </CardSection>
      </CardContent>
    </Card>
  </div>
)

export default ReportListState

