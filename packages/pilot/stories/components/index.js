import React from 'react'
import { storiesOf } from '@storybook/react'

import CopyButton from './CopyButton'
import CurrencyInput from './CurrencyInput'
import CustomerCard from './CustomerCard'
import DataDisplay from './DataDisplay'
import DetailsHead from './DetailsHead'
import EventList from './EventList'
import PaymentCards from './PaymentCards'
import Property from './Property'
import RecipientSectionState from './RecipientSection'
import RiskLevel from './RiskLevel'
import TotalDisplay from './TotalDisplay'
import TransactionDetailsCard from './TransactionDetailsCard'
import TreeView from './TreeView'

storiesOf('Components', module)
  .add('Copy button', () => (
    <CopyButton />
  ))
  .add('Currency Input', () => (
    <CurrencyInput />
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
  .add('RiskLevel', () => (
    <RiskLevel />
  ))
  .add('TreeView', () => (
    <TreeView />
  ))
  .add('Property', () => (
    <Property />
  ))

