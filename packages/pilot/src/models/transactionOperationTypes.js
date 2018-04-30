const types = {
  capture: {
    status: {
      success: {
        color: '#53be76',
        title: 'Capturada',
      },
      failed: {
        color: '#e00403',
        title: 'Captura falhou',
      },
    },
  },
  authorize: {
    status: {
      success: {
        color: '#fcb20a',
        title: 'Autorizada',
      },
      failed: {
        color: '#e00403',
        title: 'Autorização falhou',
      },
    },
  },
  refund: {
    status: {
      success: {
        color: '#5b2886',
        title: 'Estornada',
      },
      failed: {
        color: '#e00403',
        title: 'Estorno falhou',
      },
    },
  },
  chargeback_refund: {
    status: {
      success: {
        color: '#bf5316',
        title: 'Chargeback reapresentado',
      },
      failed: {
        color: '#e00403',
        title: 'Reapresentação do chargedback falhou',
      },
    },
  },
  chargeback: {
    status: {
      success: {
        color: '#f16518',
        title: 'Chargeback',
      },
      failed: {
        color: '#e00403',
        title: 'Chargeback falhou',
      },
    },
  },
  issue: {
    status: {
      success: {
        color: '#8c68d4',
        title: 'Emitido',
      },
      failed: {
        color: '#e00403',
        title: 'Emissão falhou',
      },
    },
  },
  analyze: {
    status: {
      success: {
        color: '#4ca9d7',
        title: 'Analisada',
      },
      failed: {
        color: '#e00403',
        title: 'Análise falhou',
      },
    },
  },
  conciliate: {
    status: {
      success: {
        color: '#53be76',
        title: 'Boleto pago',
      },
      failed: {
        color: '#e00403',
        title: 'Pagamento falhou',
      },
    },
  },
  validate: {
    status: {
      success: {
        color: '#951d3c',
        title: 'Validado',
      },
      failed: {
        color: '#e00403',
        title: 'Validação falhou',
      },
    },
  },
}

export default types
