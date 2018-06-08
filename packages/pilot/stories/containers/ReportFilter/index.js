import React from 'react'
import legendStatus from '../../../src/models/reportStatus'
import ReportFilter from '../../../src/containers/ReportFilter'

const ReportFilterCard = () => (
  <ReportFilter
    reportStatus={legendStatus}
  />
)

export default ReportFilterCard
