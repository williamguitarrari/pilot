import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

const basePath = process.env.PUBLIC_URL || ''

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'pt',

    ns: ['translations'],
    defaultNS: 'translations',

    debug: true,

    interpolation: {
      escapeValue: false,
    },

    react: {
      wait: true,
    },

    backend: {
      loadPath: `${basePath}/locales/{{lng}}/{{ns}}.json`,
    },
  })

export default i18n
