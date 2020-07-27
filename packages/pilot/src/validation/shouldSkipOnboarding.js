import { anyPass } from 'ramda'
import isRecentlyCreatedCompany from './recentCreatedCompany'

const isOnboardingSkipped = () => localStorage.getItem('skip-onboarding')
const userAlreadyTransacted = ({ company }) => company.alreadyTransacted
const longTimeUser = ({ company }) => !isRecentlyCreatedCompany({ company })

const skipOnboarding = anyPass([
  isOnboardingSkipped,
  userAlreadyTransacted,
  longTimeUser,
])

export default skipOnboarding
