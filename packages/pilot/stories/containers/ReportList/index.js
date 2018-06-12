import React from 'react'
import reportsModel from './reports'
import ReportList from '../../../src/containers/ReportList'


const ReportListState = () => (
  // montar um state aqui
  <ReportList
    reports={reportsModel}
  />
)

export default ReportListState
