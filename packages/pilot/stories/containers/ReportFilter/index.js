import React from 'react'
import legendStatus from '../../../src/models/reportStatus'
import ReportFilter from '../../../src/containers/ReportFilter'

const ReportFilterCard = () => (
  // montar um state aqui
  <ReportFilter
    items={legendStatus.items}
    // acesso através do props no src
    value="string"
  />
)

export default ReportFilterCard
