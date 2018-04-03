import React from 'react'
import {
  cond,
  equals,
} from 'ramda'

import IconVisa from 'emblematic-icons/svg/VisaCard16.svg'
import IconMaster from 'emblematic-icons/svg/MasterCard16.svg'
import IconDiners from 'emblematic-icons/svg/DinersCard16.svg'
import IconAmex from 'emblematic-icons/svg/AmexCard16.svg'
import IconJcb from 'emblematic-icons/svg/JCBCard16.svg'

const renderBrandIcon = cond([
  [equals('amex'), () => <IconAmex width={32} height={32} />],
  [equals('diners'), () => <IconDiners width={32} height={32} />],
  [equals('jcb'), () => <IconJcb width={32} height={32} />],
  [equals('mastercard'), () => <IconMaster width={32} height={32} />],
  [equals('visa'), () => <IconVisa width={32} height={32} />],
])

export default renderBrandIcon

