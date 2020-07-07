import {
  map,
  pipe,
  values,
} from 'ramda'
import moment from 'moment-timezone'
import XLSX from 'xlsx'

const handleCSVExportDownloadingClick = (data, filename) => {
  /* eslint-disable no-undef */
  const downloadLink = document.createElement('a')
  downloadLink.target = '_blank'
  downloadLink.download = filename.concat('.csv')

  const blob = new Blob([data], { type: 'application/vnd.ms-excel' })

  const URL = window.URL || window.webkitURL
  const downloadUrl = URL.createObjectURL(blob)

  downloadLink.href = downloadUrl

  document.body.append(downloadLink)

  downloadLink.click()

  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(downloadUrl)
  /* eslint-enable no-undef */
}

const handleXLSExportDownloadingClick = (data, filename) => {
  const workSheetName = 'sheetJS'
  const newWorkSheet = XLSX.utils.book_new()
  const dataWorkSheet = XLSX.utils.aoa_to_sheet(data)
  XLSX.utils.book_append_sheet(newWorkSheet, dataWorkSheet, workSheetName)

  XLSX.writeFile(newWorkSheet, filename.concat('.xls'))
}

const csvHeaders = headers => headers.map(value => `"${value}"`).join(',')

const csvFormatter = exportData => values(exportData).map(value => `"${value}"`).join(',')
const xlsFormatter = exportData => values(exportData)

const buildDataParser = ({
  exportHeaders,
  exportParser,
}) => ({ exportData, exportType }) => {
  const formatter = exportType === 'csv'
    ? csvFormatter
    : xlsFormatter

  const formatLines = map(pipe(
    exportParser,
    formatter
  ))

  if (exportType === 'csv') {
    return [csvHeaders(exportHeaders)].concat(formatLines(exportData)).join('\r\n')
  }

  return [exportHeaders].concat(formatLines(exportData))
}

const useFileExporter = ({
  exportHeaders,
  exportParser,
  exportPrefix,
}) => {
  const dataParser = buildDataParser({ exportHeaders, exportParser })

  const handleExport = (exportData, exportType) => {
    const fileData = dataParser({ exportData, exportType })
    const filename = `${exportPrefix}-${moment().format('YYYY-MM-DD_HH-mm-ss')}`
    const fileExporter = exportType === 'csv'
      ? handleCSVExportDownloadingClick
      : handleXLSExportDownloadingClick

    return fileExporter(fileData, filename)
  }

  return handleExport
}

export default useFileExporter
