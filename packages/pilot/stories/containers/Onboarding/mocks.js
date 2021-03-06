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
  macroSegmentOptions: {
    images: [
      FoodIcon,
      PlusIcon,
    ],
    options: ['Alimentos', 'Outros'],
  },
  segmentOptions: [
    { label: 'Gráficas', value: 'graficas' },
    { label: 'Consultoria', value: 'consultoria' },
    { label: 'Educação', value: 'educacao' },
    { label: 'Transporte', value: 'transporte' },
    { label: 'Software', value: 'software' },
    { label: 'Certificados', value: 'certificados' },
    { label: 'Plataforma ERP', value: 'plataforma_erp' },
    { label: 'Telefonia', value: 'telefonia' },
    { label: 'Saúde', value: 'saude' },
  ],
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
          label: 'Alimentos',
          value: [
            { label: 'Bebidas', value: 'beverages' },
            { label: 'Comidas', value: 'food' },
            { label: 'Suplementos alimentares', value: 'supplements' },
          ],
        },
        {
          label: 'Beleza e acessórios',
          value: [
            { label: 'Óticas', value: 'eyewear' },
            { label: 'Acessórios', value: 'accessories' },
            { label: 'Jóias', value: 'jewelries' },
            { label: 'Cosméticos', value: 'cosmetics' },
          ],
        },
        {
          label: 'Casa e escritório',
          value: [
            { label: 'Móveis', value: 'furnitures' },
            { label: 'Petshop', value: 'petshot' },
            { label: 'Utensílios domésticos', value: 'housewares' },
            { label: 'Papelaria e livros', value: 'books_office_supplies' },
            { label: 'Floricultura', value: 'flowers' },
            { label: 'Loja de departamentos', value: 'wholesale' },
          ],
        },
        {
          label: 'Eletrônicos e jogos',
          value: [
            { label: 'Eletrônicos', value: 'eletronics' },
            { label: 'Videogames', value: 'videogames' },
            { label: 'Brinquedos', value: 'toys' },
          ],
        },
        {
          label: 'Equipamentos',
          value: [
            { label: 'Equipamentos e máquinas', value: 'equipment_and_machinery' },
            { label: 'Material de construção', value: 'construction_material' },
            { label: 'Peças automotivas', value: 'automobile_autoparts' },
          ],
        },
        {
          label: 'Roupas e calçados',
          value: [
            { label: 'Calçados', value: 'footwear' },
            { label: 'Esportes', value: 'sports' },
            { label: 'Vestuário', value: 'clothing_apparel' },
            { label: 'Roupas em atacado', value: 'Vestuario_Alto_Risco' },
            { label: 'Sexshop', value: 'sexshop' },
          ],
        },
        {
          label: 'Turismo e eventos',
          value: [
            { label: 'Ingressos', value: 'tickets' },
            { label: 'Desconto coletivo', value: 'collective_discount' },
            { label: 'Eventos', value: 'events' },
            { label: 'Turismo', value: 'tourism' },
          ],
        },
        {
          label: 'Serviços e cursos',
          value: [
            { label: 'Gráficas', value: 'graphic_printing' },
            { label: 'Consultoria', value: 'consulting' },
            { label: 'Educação', value: 'courses' },
            { label: 'Software', value: 'software' },
            { label: 'Plataforma ERP', value: 'erp_agency' },
            { label: 'Certificados', value: 'certificates' },
            { label: 'Transporte', value: 'transport' },
            { label: 'Saúde', value: 'health' },
            { label: 'Telefonia', value: 'telephony' },
          ],
        },
        {
          label: 'Outros',
          value: [
            { label: 'Tabacaria', value: 'tobacco_products' },
            { label: 'Artigos religiosos', value: 'religious_products' },
            { label: 'Instrumentos musicais', value: 'musical_instruments' },
            { label: 'Doações', value: 'donations' },
          ],
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
      notFoundText: 'Não encontrei o segmento do meu negócio',
      progressPercent: 70,
      type: 'segments',
    },
    status: 'boarding',
    userName: 'Eduardo',
  },
}
