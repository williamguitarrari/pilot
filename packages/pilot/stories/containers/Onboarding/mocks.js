import FoodIcon from 'emblematic-icons/svg/Food32.svg'
import WatchIcon from 'emblematic-icons/svg/Watch32.svg'
import HomeIcon from 'emblematic-icons/svg/Home32.svg'
import PhoneIcon from 'emblematic-icons/svg/Phone32.svg'
import WrenchIcon from 'emblematic-icons/svg/Wrench32.svg'
import PlusIcon from 'emblematic-icons/svg/Plus32.svg'
import ShortsIcon from 'emblematic-icons/svg/Shorts32.svg'
import CalendarIcon from 'emblematic-icons/svg/Calendar32.svg'
import MedalIcon from 'emblematic-icons/svg/Medal32.svg'
import SampleDeadEnd from './SampleDeadEnd'
import BoxIcon from './box.svg'

export default {
  welcome: {
    loading: false,
    onboardingStarted: false,
    question: {},
    questionSettings: {},
    status: 'starting',
    userName: 'Eduardo',
  },
  whenDeadEnd: {
    loading: false,
    onboardingStarted: true,
    question: {},
    questionSettings: {
      deadEnd: SampleDeadEnd,
    },
    status: 'boarding',
    userName: 'Eduardo',
  },
  whenLoading: {
    loading: true,
    question: {},
    questionSettings: {},
    status: 'boarding',
    userName: 'Eduardo',
  },
  withCardIconAndSubtitle: {
    loading: false,
    onboardingStarted: true,
    question: {
      label: 'integration',
      options: [
        {
          description: 'Sem a necessidade de desenvolver código.',
          label: 'Com uma plataforma',
          value: 'plataform',
        },
        {
          description: 'Você precisará desenvolver o código da integração.',
          label: 'Com a API Pagar.me',
          value: 'api',
        },
      ],
      others: [
        {
          label: 'Sou o desenvolvedor do site.',
          type: 'checkbox',
          value: 'is_developer',
        },
      ],
      title: 'Como você pretende integrar com o Pagar.me?',
    },
    questionSettings: {
      images: [BoxIcon, BoxIcon],
      progressPercent: 25,
      type: 'card',
    },
    status: 'starting',
    userName: 'Eduardo',
  },
  withCardIconAndWithoutSubtitle: {
    loading: false,
    onboardingStarted: true,
    question: {
      label: 'already_selling',
      options: [
        {
          label: 'Sim, já estou vendendo',
          value: 'yes',
        },
        {
          label: 'Ainda não comecei a vender',
          value: 'no',
        },
        {
          label: 'Estou apenas testando o Pagar.me',
          value: 'testing',
        },
      ],
      others: [],
      title: 'Você está vendendo online?',

    },
    questionSettings: {
      images: [BoxIcon, BoxIcon, BoxIcon],
      progressPercent: 50,
      type: 'card',
    },
    status: 'boarding',
    userName: 'Eduardo',
  },
  withCardWithoutIconAndSubtitle: {
    loading: false,
    onboardingStarted: true,
    question: {
      label: 'is_site_ready',
      options: [
        {
          label: 'Sim, só falta integrar com o meio de pagamento.',
          value: 'yes',
        },
        {
          label: 'Não, ele ficará pronto nas próximas semanas.',
          value: 'soon',
        },
        {
          label: 'Não comecei o desenvolvimento do meu site.',
          value: 'no',
        },
        {
          label: 'Vou utilizar apenas o Link de Pagamentos.',
          value: 'link',
        },
      ],
      others: [],
      title: 'Seu site já está pronto?',

    },
    questionSettings: {
      images: [],
      progressPercent: 60,
      type: 'card',
    },
    status: 'boarding',
    userName: 'Eduardo',
  },
  withDropdown: {
    loading: false,
    onboardingStarted: true,
    question: {
      label: 'plataform',
      options: [
        {
          label: 'WooCommerce',
          value: 'woocommerce',
        },
        {
          label: 'Shopify',
          value: 'shopify',
        },
      ],
      others: [],
      title: 'E qual é a sua plataforma',
    },
    questionSettings: {
      placeholder: 'some.path',
      progressPercent: 75,
      type: 'drop-down',
    },
    status: 'finishing',
    userName: 'Eduardo',
  },
  withSegments: {
    loading: false,
    onboardingStarted: true,
    question: {
      label: 'antifraud',
      options: [
        {
          category: 'food',
          label: 'Alimentos',
        },
        {
          category: 'cosmetics',
          label: 'Beleza e acessórios',
        },
        {
          category: 'house',
          label: 'Casa e escritório',
        },
        {
          category: 'games',
          label: 'Eletrônicos e jogos',
        },
        {
          category: 'tools',
          label: 'Equipamentos',
        },
        {
          category: 'shorts',
          label: 'Roupas e calçados',
        },
        {
          category: 'travel',
          label: 'Turismo e eventos',
        },
        {
          category: 'services',
          label: 'Serviços e cursos',
        },
        {
          category: 'others',
          label: 'Outros',
        },
      ],
      others: [],
      title: 'Qual é o ramo de atuação do seu negócio?',
    },
    questionSettings: {
      images: [
        FoodIcon,
        WatchIcon,
        HomeIcon,
        PhoneIcon,
        WrenchIcon,
        ShortsIcon,
        CalendarIcon,
        MedalIcon,
        PlusIcon,
      ],
      progressPercent: 70,
      type: 'segments',
    },
    status: 'boarding',
    userName: 'Eduardo',
  },
}
