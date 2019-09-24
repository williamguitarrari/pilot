import React from 'react'
import WarningIcon from 'emblematic-icons/svg/Warning32.svg'

import DescriptionAlert from '../../../src/components/DescriptionAlert'

import styles from './style.css'

const content = 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra massa luctus, laoreet lacus sit amet, rhoncus odio. Integer mollis tempus aliquam. Duis mattis tincidunt erat, non iaculis lorem dignissim in. Cras ullamcorper a felis non faucibus. Vivamus nec vehicula diam, ut mollis ante. Praesent nec rhoncus velit. Suspendisse vitae lectus sed nulla vestibulum dapibus. Cras venenatis in quam at suscipit. In hac habitasse platea dictumst.'

const DescriptionAlertExample = () => (
  <div className={styles.margin}>
    <DescriptionAlert
      content={content}
      icon={<WarningIcon height={32} width={32} />}
      title="Atenção!"
      type="error"
    />
  </div>
)

export default DescriptionAlertExample
