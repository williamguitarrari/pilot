/* eslint-disable */
import moment from 'moment'

const transaction = {
  "amount": 985172498,  
  "id": 3082517,
  "created_at": "2018-03-14T13:40:28.465Z",
  "updated_at": "2018-03-14T16:11:52.057Z",
  "soft_descriptor": null,
  "external_id": null,
  "status": "chargedback",
  "status_reason": "acquirer",
  "boleto": null,
  "payment": {
    "method": "credit_card",
    "paid_amount": 985172498,
    "net_amount": 985172498,
    "cost_amount": 0,
    "refund_amount": 0,
    "installments": 12
  },
  "acquirer": {
    "name": "pagarme",
    "response_code": "0000",
    "sequence_number": 3082517,
    "transaction_id": 3082517
  },
  "antifraud": null,
  "customer": {
    "name": "Lalala",
    "document_number": null,
    "document_type": "cpf",
    "email": "joaonoleto@gmail.com",
    "birth_date": "1999-01-01",
    "country": "us",
    "phones": [
      "+5599993333"
    ]
  },
  "card": {
    "brand_name": "visa",
    "first_digits": "411111",
    "holder_name": "João Noleto",
    "international": true,
    "last_digits": "1111",
    "pin_mode": null
  },
  "metadata": {
    "card": {
      "brand_name": "visa",
      "first_digits": "411111",
      "holder_name": "João Noleto",
      "international": true,
      "last_digits": "1111",
      "pin_mode": null
    },
  },
  "operations": [
    {
      "date_created": "2016-01-14T16:07:16.000Z",
      "type": "chargeback",
      "status": "success",
      "cycle": 1
    },
    {
      "date_created": "2017-01-14T16:07:16.000Z",
      "type": "chargeback_refund",
      "status": "success",
      "cycle": 1
    },
    {
      "id": "go_cjer4v5045rae493sgz2fnv0s",
      "date_created": "2018-03-14T13:40:28.564Z",
      "type": "capture",
      "status": "success"
    },
    {
      "id": "go_cjer4v50j5rag493sjr317z7v",
      "date_created": "2018-03-14T13:40:28.579Z",
      "type": "authorize",
      "status": "success"
    }
  ],
  "recipients": [
    {
      "name": "JONATHAN LIMA",
      "amount": 394068999,
      "net_amount": 354662099,
      "liabilities": [
        "mdr"
      ],
      "installments": [
        {
          "number": 1,
          "payment_date": moment("2018-04-16T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.948Z"),
          "amount": 32839075,
          "net_amount": 29555174,
          "costs": {
            "mdr": 3283901,
            "anticipation": 0
          }
        },
        {
          "number": 2,
          "payment_date": moment("2018-05-15T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.949Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 3,
          "payment_date": moment("2018-06-13T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.949Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 4,
          "payment_date": moment("2018-07-13T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.949Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 5,
          "payment_date": moment("2018-08-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.950Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 6,
          "payment_date": moment("2018-09-11T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.950Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 7,
          "payment_date": moment("2018-10-11T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.951Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 8,
          "payment_date": moment("2018-11-12T02:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.951Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 9,
          "payment_date": moment("2018-12-11T02:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.951Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 10,
          "payment_date": moment("2019-01-09T02:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.958Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 11,
          "payment_date": moment("2019-02-08T02:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.958Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        },
        {
          "number": 12,
          "payment_date": moment("2019-03-12T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.959Z"),
          "amount": 32839084,
          "net_amount": 29555175,
          "costs": {
            "mdr": 3283909,
            "anticipation": 0
          }
        }
      ]
    },
    {
      "name": "JONATHAN LIMA",
      "amount": -394069000,
      "net_amount": -354662100,
      "liabilities": [
        "chargeback"
      ],
      "installments": [
        {
          "number": 1,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:52.402Z"),
          "amount": -32839076,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283901,
            "anticipation": 0
          }
        },
        {
          "number": 2,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:52.511Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 3,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:52.611Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 4,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:52.710Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 5,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:52.770Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 6,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:52.826Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 7,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:52.881Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 8,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:52.952Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 9,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:53.003Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 10,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:53.045Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 11,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:53.086Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        },
        {
          "number": 12,
          "payment_date": moment("2018-03-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T16:11:53.121Z"),
          "amount": -32839084,
          "net_amount": -29555175,
          "costs": {
            "mdr": -3283909,
            "anticipation": 0
          }
        }
      ]
    },
    {
      "name": "Marceneiro",
      "amount": 295551750,
      "net_amount": 295551750,
      "liabilities": [],
      "installments": [
        {
          "number": 1,
          "payment_date": moment("2018-04-16T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.939Z"),
          "amount": 24629307,
          "net_amount": 24629307,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 2,
          "payment_date": moment("2018-05-15T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.940Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 3,
          "payment_date": moment("2018-06-13T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.940Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 4,
          "payment_date": moment("2018-07-13T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.940Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 5,
          "payment_date": moment("2018-08-14T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.941Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 6,
          "payment_date": moment("2018-09-11T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.941Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 7,
          "payment_date": moment("2018-10-11T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.942Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 8,
          "payment_date": moment("2018-11-12T02:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.942Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 9,
          "payment_date": moment("2018-12-11T02:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.942Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 10,
          "payment_date": moment("2019-01-09T02:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.943Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 11,
          "payment_date": moment("2019-02-08T02:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.943Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        },
        {
          "number": 12,
          "payment_date": moment("2019-03-12T03:00:00.000Z"),
          "original_payment_date": null,
          "date_created": moment("2018-03-14T13:40:28.943Z"),
          "amount": 24629313,
          "net_amount": 24629313,
          "costs": {
            "mdr": 0,
            "anticipation": 0
          }
        }
      ]
    }
  ]
}


export default transaction
