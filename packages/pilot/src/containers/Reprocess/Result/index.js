import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Flexbox,
  Grid,
  ModalActions,
  ModalContent,
  Row,
  Spacing,
} from 'former-kit'
import IconSupport from 'emblematic-icons/svg/Support32.svg'

import CopyButton from '../../../components/CopyButton'
import { Message } from '../../../components/Message'
import Success from './success.svg'
import Failure from './failure.svg'
import style from './style.css'

const validateOnRestart = ({ onRestart, status }, propName) => {
  if (
    propName === 'onRestart'
    && status === 'error'
    && !onRestart
  ) {
    throw new Error('The prop onRestart must be a function when hasError is true')
  }
}

const Result = ({
  onCopyIdClick,
  onRestart,
  onViewTransactionClick,
  status,
  statusMessage,
  t,
}) => (
  <Fragment>
    <ModalContent>
      <Grid>
        <Row stretch flex>
          <Col palm={12} tablet={12} desk={12} tv={12}>
            { status === 'error'
              ? <p className={style.title}>{t('pages.reprocess.failure')}</p>
              : <p className={style.title}>{t('pages.reprocess.success_reprocess')}</p>
            }
            <Message
              image={status === 'error'
                ? <Failure />
                : <Success />
              }
            />
            <div className={style.message}>
              <div className={style.icon}>
                <IconSupport width={16} height={16} />
              </div>
              {status === 'error'
                ? <span>{statusMessage}</span>
                : (
                  <span>
                    <b>{t('attention')}</b>
                    {' '}
                    {t('pages.reprocess.success_reprocess_disclaimer')}
                  </span>
                )
              }
            </div>
          </Col>
        </Row>
      </Grid>
    </ModalContent>
    <div className={style.actions}>
      <ModalActions>
        <Flexbox justifyContent="center">
          {status === 'error'
            ? (
              <Button
                fill="gradient"
                onClick={onRestart}
              >
                {t('try_again')}
              </Button>
            )
            : (
              <Fragment>
                <CopyButton
                  feedbackText={t('copied_to_clipboard')}
                  feedbackTimeout={1000}
                  fill="outline"
                  icon={null}
                  onClick={onCopyIdClick}
                  title={t('copy_id')}
                />
                <Spacing size="medium" />
                <Button
                  fill="gradient"
                  onClick={onViewTransactionClick}
                >
                  {t('view_transaction')}
                </Button>
              </Fragment>
            )
          }
        </Flexbox>
      </ModalActions>
    </div>
  </Fragment>
)

Result.propTypes = {
  onCopyIdClick: PropTypes.func.isRequired,
  onRestart: validateOnRestart,
  onViewTransactionClick: PropTypes.func.isRequired,
  status: PropTypes.oneOf([
    'error',
    'success',
  ]).isRequired,
  statusMessage: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

Result.defaultProps = {
  onRestart: null,
}

export default Result
