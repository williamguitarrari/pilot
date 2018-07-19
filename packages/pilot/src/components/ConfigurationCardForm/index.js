import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

const ConfigurationCardForm = ({
  children,
  collapsed,
  data,
  icon,
  onCancel,
  onClick,
  onSubmit,
  subtitle,
  title,
  t,
  validation,
}) => (
  <Card>
    <CardSection>
      <CardSectionDoubleLineTitle
        title={title}
        subtitle={subtitle}
        collapsed={collapsed}
        onClick={onClick}
        icon={icon}
      />
      {!collapsed &&
        <Form
          data={data}
          validation={validation}
          validateOn="blur"
          onSubmit={onSubmit}
        >
          <CardContent>{children}</CardContent>

          <CardActions>
            <Button
              fill="outline"
              onClick={onCancel}
              type="reset"
            >
              {t('configurations.card_form.cancel')}
            </Button>
            <Button
              fill="gradient"
              type="submit"
            >
              {t('configurations.card_form.confirm')}
            </Button>
          </CardActions>
        </Form>
      }
    </CardSection>
  </Card>
)

ConfigurationCardForm.propTypes = {
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  data: PropTypes.shape({}).isRequired,
  icon: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  validation: PropTypes.shape({}),
}

ConfigurationCardForm.defaultProps = {
  collapsed: false,
  validation: null,
}

export default ConfigurationCardForm
