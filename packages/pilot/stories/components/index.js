import React from 'react'
import { storiesOf } from '@storybook/react'

import CustomerCard from './CustomerCard'
import EventList from './EventList'
import PaymentCards from './PaymentCards'
import RecipientSectionState from './RecipientSection'
import TotalDisplay from './TotalDisplay'
import TransactionDetailsCard from './TransactionDetailsCard'
import TransactionHead from './TransactionHead'
import TreeView from './TreeView'

storiesOf('Components', module)
  .add('Customer card', () => (
    <CustomerCard />
  ))
  .add('Recipient section', () => (
    <RecipientSectionState />
  ))
  .add('Transaction details card', () => (
    <TransactionDetailsCard />
  ))
  .add('Transaction header', () => (
    <TransactionHead />
  ))
  .add('Event list', () => (
    <EventList />
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

