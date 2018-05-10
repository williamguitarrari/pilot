import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  DateInput,
  Input,
} from 'former-kit'

const ReportFilter = () => (
 <Card>
  <form action="/" method="post">
    <CardContent>
      <DateInput />
      <Input />
      <CardActions>
        <Button />
      </CardActions>
    </CardContent>
  </form>
 </Card>
)

export default ReportFilter
