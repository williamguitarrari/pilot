/* eslint-disable sort-keys */
import PlatformNotFound from './data/deadEnds/PlatformNotFound'

import env from '../../../environment'

import Box from './data/icons/box.svg'
import Code from './data/icons/code.svg'
import Money from './data/icons/money.svg'
import Split from './data/icons/split.svg'
import Clock from './data/icons/clock.svg'
import Search from './data/icons/search.svg'
import Check from './data/icons/check.svg'
import supportedPlatforms from './data/supportedPlatforms'

const initialQuestion = 'integrationType'

const isDevelopmentStage = env !== 'live'

const settingsByQuestion = {
  integrationType: {
    images: [Box, Code],
    progressPercent: 0,
    questionId: isDevelopmentStage ? 'oq_ck897tba800010gmizskdu3p7' : 'oq_ck8a5tq7s005a0gmy3ehexylq',
    type: 'card',
    nextByAnswer: answer => (answer === 'api'
      ? 'objectiveAtPagarme'
      : 'platform'),
  },
  objectiveAtPagarme: {
    images: [Money, Split],
    progressPercent: 20,
    questionId: isDevelopmentStage ? 'oq_ck898b0rq00020gmithe770pk' : 'oq_ck8a5uvgd006q0grq6gsxu76e',
    type: 'card',
    nextByAnswer: () => 'companyStatus',
  },
  platform: {
    placeholder: 'pages.onboarding.placeholders.platform',
    progressPercent: 20,
    questionId: isDevelopmentStage ? 'oq_ck898abhm00050goahe90emwa' : 'oq_ck8a5ue9t006p0grqywqj3t8r',
    type: 'drop-down',
    nextByAnswer: (answer) => {
      if (supportedPlatforms.includes(answer)) {
        return 'companyStatus'
      }

      return 'platformNotFound'
    },
  },
  platformNotFound: {
    deadEnd: PlatformNotFound,
    finalStep: true,
  },
  companyStatus: {
    images: [Check, Clock, Search],
    progressPercent: 40,
    questionId: isDevelopmentStage ? 'oq_ck898bmfg00010hlirsd9o13m' : 'oq_ck8a5ve2t005b0gmy1a30ry6c',
    type: 'card',
    nextByAnswer: (answer) => {
      switch (answer) {
        case 'yes': {
          return 'paymentMethod'
        }

        default: {
          return 'siteStatus'
        }
      }
    },
  },
  siteStatus: {
    progressPercent: 60,
    questionId: isDevelopmentStage ? 'oq_ck898c4g800060goaehcpomrs' : 'oq_ck8a5vrhi006r0grqryz3l1t5',
    type: 'card',
    nextByAnswer: () => 'segment',
  },
  paymentMethod: {
    placeholder: 'pages.onboarding.placeholders.payment_method',
    progressPercent: 60,
    questionId: isDevelopmentStage ? 'oq_ck898cvuh00030gmiyi44mgco' : 'oq_ck8a5w6p7006s0grqp6zmupe7',
    type: 'drop-down',
    nextByAnswer: () => 'segment',
  },
  segment: {
    placeholder: 'pages.onboarding.placeholders.segment',
    progressPercent: 80,
    questionId: isDevelopmentStage ? 'oq_ck9e7wf6s00190mqltx5csvqw' : 'oq_ck9d8hb6500b30mqro60yudiq',
    type: 'drop-down',
    nextByAnswer: () => 'expectedRevenue',
  },
  expectedRevenue: {
    placeholder: 'pages.onboarding.placeholders.expected_revenue',
    progressPercent: 90,
    questionId: isDevelopmentStage ? 'oq_ck898doae00040gmiv5fj3gyy' : 'oq_ck8a5wlsp005c0gmyddqky5up',
    type: 'drop-down',
    finalStep: true,
  },
}

export {
  initialQuestion,
  settingsByQuestion,
}
