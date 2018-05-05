import React from 'react'
import { storiesOf } from '@storybook/react'

import DataDisplay from './DataDisplay'
import CopyButton from './CopyButton'
import CustomerCard from './CustomerCard'
import DetailsHead from './DetailsHead'
import EventList from './EventList'
import PaymentCards from './PaymentCards'
import Property from './Property'
import RecipientSectionState from './RecipientSection'
import TotalDisplay from './TotalDisplay'
import TransactionDetailsCard from './TransactionDetailsCard'
import TreeView from './TreeView'

storiesOf('Components', module)
  .add('Copy button', () => (
    <CopyButton />
  ))
  .add('Customer card', () => (
    <CustomerCard />
  ))
  .add('Details head', () => (
    <DetailsHead />
  ))
  .add('Recipient section', () => (
    <RecipientSectionState />
  ))
  .add('Transaction details card', () => (
    <TransactionDetailsCard />
  ))
  .add('Event list', () => (
    <EventList />
  ))
  .add('DataDisplay', () => (
    <DataDisplay />
  ))
  .add('TotalDisplay', () => (
    <TotalDisplay />
  ))
  .add('Payment card', () => (
    <PaymentCards />
  ))
  .add('TreeView', () => (
    <TreeView />
  ))
  .add('Property', () => (
    <Property />
  ))

