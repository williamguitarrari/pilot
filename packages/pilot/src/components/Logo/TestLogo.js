import React from 'react'

import IconTest from 'emblematic-icons/svg/TestAmbientOn24.svg'

import Logo from './logo.svg'

import style from './style.css'

const TestLogo = () => (
  <div className={style.container}>
    <div>
      <IconTest width={76} height={88} />
    </div>
    <div className={style.text}>
      <Logo width={160} height={47} />
      <span className={style.title}>Área de <strong>teste</strong></span>
    </div>
  </div>
)

export default TestLogo
