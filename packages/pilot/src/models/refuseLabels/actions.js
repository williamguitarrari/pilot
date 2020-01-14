import buildErrorsMessage from './buildErrorsMessage'

const actions = {
  ...buildErrorsMessage('refuse.action.contact_acquirer',
    [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008,
      1009, 1012, 1017, 1019, 1020, 1021, 1022, 1023, 1024,
      1025, 1027, 1049, 2000, 2001, 2002, 2003, 2004, 2005,
      2006, 2007, 2008, 2009, 5062, 5088, 9102, 9103, 9107,
      9112]),
  ...buildErrorsMessage('refuse.action.remake_transaction',
    [5003, 5006, 5054, 5089, 5095, 5097,
      9108, 9109, 9111, 9999, 'internal_error']),
  ...buildErrorsMessage('refuse.action.invalid_operation', [1010, 1015]),
  ...buildErrorsMessage('refuse.action.nonexistent_account', [1014, 1042, 5086]),
  ...buildErrorsMessage('refuse.action.incorrect_cvv', [1045, 9124]),
  1011: 'refuse.action.invalid_card',
  1016: 'refuse.action.credit_limit',
  5025: 'refuse.action.checkout_cvv',
  5092: 'refuse.action.check_capture_value',
  9113: 'refuse.action.duplicated_payment',
  acquirer_timeout: 'refuse.action.acquirer_timeout',
  antifraud: 'refuse.action.antifraud',
  capture_timeout: 'refuse.action.capture_timeout',
  fraud_reimbursed: 'fraud_reimbursed.action',
  invalid_capture_amount: 'refuse.action.invalid_capture_amount',
  manual_review: 'refuse.action.manual_review',
  manual_review_timeout: 'refuse.action.manual_review_timeout',
  no_acquirer: 'refuse.action.no_acquirer',
  unknown: 'refuse.action.unknown_error',
}

export default actions
