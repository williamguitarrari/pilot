const platforms = [
  'bizcommerce',
  'core',
  'ezcommerce',
  'iset',
  'loja_integrada',
  'magento',
  'opencart',
  'prestashop',
  'signativa',
  'vtex',
  'woocommerce',
  'xtech',
]

const documentSettings = {}

platforms.forEach((platform) => {
  documentSettings[platform] = {
    link: `pages.empty_state.access_docs_platform.platforms.${platform}.link`,
    platformLabel: `pages.empty_state.access_docs_platform.platforms.${platform}.label`,
  }
})

export default documentSettings
