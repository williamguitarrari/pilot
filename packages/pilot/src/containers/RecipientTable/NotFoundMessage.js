import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Flexbox,
} from 'former-kit'
import { Message } from '../../components/Message'

import style from './style.css'
import EmptyStateIcon from '../Home/icons/empty-state-global.svg'

const NotFoundMessage = ({
  onFilterClear,
  t,
}) => (
  <Flexbox
    alignItems="center"
    className={style.marginTop}
    direction="column"
  >
    <Message
      image={<EmptyStateIcon width={365} height={148} />}
      message={(
        <Flexbox
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <div>
            {t('pages.recipient_detail.no_results_title')}
          </div>
          <div>
            {t('pages.recipient_detail.no_results_message')}
          </div>
          <div className={style.marginTop}>
            <Button
              type="button"
              onClick={onFilterClear}
            >
              {t('components.filter.reset')}
            </Button>
          </div>
        </Flexbox>
      )}
    />
  </Flexbox>
)

NotFoundMessage.propTypes = {
  onFilterClear: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default NotFoundMessage
