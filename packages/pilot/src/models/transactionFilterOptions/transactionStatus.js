export default {
  key: 'status',
  name: 'Status de transação',
  items: [
    {
      label: 'Paga',
      value: 'paid',
    },
    {
      label: 'Recusada',
      value: 'refused',
    },
    {
      label: 'Estornada',
      value: 'reversed',
    },
    {
      label: 'Estorno pendente',
      value: 'pending_refund',
    },
    {
      label: 'Aguardando pagamento',
      value: 'waiting_payment',
    },
    {
      label: 'Processando',
      value: 'processing',
    },
    {
      label: 'Chargeback',
      value: 'chargedback',
    },
    {
      label: 'Autorizada',
      value: 'authorized',
    },
  ],
}
