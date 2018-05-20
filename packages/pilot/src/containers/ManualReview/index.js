import React from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  Modal,
  ModalContent,
  ModalTitle,
  Steps,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import Form from './Form'
import Result from './Result'

const ManualReview = ({
  action,
  errorMessage,
  isOpen,
  onCancel,
  onConfirm,
  onRetry,
  onViewTransaction,
  stepStatus,
  t,
  transactionId,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onCancel}
  >
    <ModalTitle
      closeIcon={<IconClose height={16} width={16} />}
      onClose={onCancel}
      title={
        action === 'approve'
        ? t('pages.manual_review.model_approve_title')
        : t('pages.manual_review.model_refuse_title')
      }
    />
    <ModalContent>
      <CardSection>
        <Steps
          status={[
            {
              id: 'confirmation',
              status: stepStatus.confirmation,
            },
            {
              id: 'result',
              status: stepStatus.result,
            },
          ]}
          steps={[
            {
              id: 'confirmation',
              title: t('pages.manual_review.step_title_confirmation'),
            },
            {
              id: 'result',
              title: t('pages.manual_review.step_title_result'),
            },
          ]}
        />
      </CardSection>
    </ModalContent>
    {
      stepStatus.result === 'pending'
      ?
        <Form
          action={action}
          errorMessage={errorMessage}
          onConfirm={onConfirm}
          t={t}
          transactionId={transactionId}
        />
      :
        <Result
          action={action}
          errorMessage={errorMessage}
          onRetry={onRetry}
          onViewTransaction={onViewTransaction}
          status={stepStatus.result}
          stepStatusResult={stepStatus.result}
          t={t}
        />
    }
  </Modal>
)

ManualReview.propTypes = {
  action: PropTypes.oneOf(['approve', 'refuse']).isRequired,
  errorMessage: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  onViewTransaction: PropTypes.func.isRequired,
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.oneOf(['current', 'error', 'success']).isRequired,
    result: PropTypes.oneOf(['current', 'error', 'pending']).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  transactionId: PropTypes.number.isRequired,
}

ManualReview.defaultProps = {
  errorMessage: null,
}

export default ManualReview
