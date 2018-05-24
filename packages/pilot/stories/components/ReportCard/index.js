import React, { Fragment } from 'react'
import {
  Button,
  Card,
  Popover,
  PopoverContent,
  PopoverMenu,
} from 'former-kit'
import { action } from '@storybook/addon-actions'

import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import TrashIcon from 'emblematic-icons/svg/Trash32.svg'
import ReprocessIcon from 'emblematic-icons/svg/Reprocess32.svg'
import ReportCard from '../../../src/components/ReportCard'
import style from './style.css'
import Section from '../../Section'

const items = [
  {
    action: action('csv'),
    title: 'csv',
  },
  {
    action: action('excel'),
    title: 'Excel',
  },
  {
    action: action('pdf'),
    title: 'PDF',
  },
]

const renderActions = (report) => {
  if (report === 'canceled') {
    return (
      <Fragment>
        <Button
          fill="outline"
          icon={<TrashIcon width={16} height={16} />}
          onClick={action('delete')}
          size="default"
        />

        <Button
          fill="outline"
          icon={<ReprocessIcon width={16} height={16} />}
          onClick={action('reprocess')}
          size="default"
        />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Button
        fill="outline"
        icon={<TrashIcon width={16} height={16} />}
        onClick={action('delete')}
        size="default"
      />
      <Popover
        content={
          <div className={style.exportPopover}>
            <PopoverContent>
              <strong>Exportar para:</strong>
            </PopoverContent>
            <PopoverMenu items={items} />
          </div>
        }
        placement="bottomEnd"
      >
        <Button
          fill="outline"
          icon={<DownloadIcon width={16} height={16} />}
          onClick={action('download')}
          size="default"
        />
      </Popover>
    </Fragment>
  )
}

const ReportCardState = () => (
  <Section>
    <Card>
      <ReportCard
        actions={renderActions('ready')}
        filterLabel="Filtros"
        status="ready"
        subtitle="Período: 01/01/2017 a 01/06/2017   |   Criado em 10/05/2018"
        t={t => t}
        title="Carta de circularização 2017"
      />
      <ReportCard
        actions={renderActions('canceled')}
        filterLabel="Filtros"
        status="canceled"
        subtitle="Período: 01/01/2017 a 01/06/2017   |   Criado em 10/05/2018"
        t={t => t}
        title="Carta de circularização 2017"
      />
      <ReportCard
        actions={renderActions('processing')}
        filterLabel="Filtros"
        status="processing"
        subtitle="Período: 01/01/2017 a 01/06/2017   |   Criado em 10/05/2018"
        t={t => t}
        title="Carta de circularização 2017"
      />
    </Card>
  </Section>
)

export default ReportCardState
