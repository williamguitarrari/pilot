import React from 'react'
import { storiesOf } from '@storybook/react'

import CustomerCard from './CustomerCard'
import DetailsHead from './DetailsHead'
import EventList from './EventList'
import PaymentCards from './PaymentCards'
import Property from './Property'
import Operations from './Operations'
import RecipientSectionState from './RecipientSection'
import TotalDisplay from './TotalDisplay'
import TransactionDetailsCard from './TransactionDetailsCard'
import TreeView from './TreeView'
import PendingRequests from './PendingRequests'
import BalanceTotalDisplay from './BalanceTotalDisplay'
import BalanceSummary from './BalanceSummary'

storiesOf('Components', module)
  .add('Details head', () => <DetailsHead />)
  .add('Customer card', () => (
    <CustomerCard />
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
  .add('Pending Requests', () => (
    <PendingRequests />
  ))
  .add('Operations', () => (
    <Operations />
  ))
  .add('Balance total display', () => (
    <BalanceTotalDisplay />
  ))
  .add('Balance summary', () => (
    <BalanceSummary />
  ))
