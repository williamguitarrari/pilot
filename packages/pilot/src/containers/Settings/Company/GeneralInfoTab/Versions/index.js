import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { find, propEq } from 'ramda'
import {
  Button,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  Col,
  FormDropdown,
  Grid,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Row,
  Spacing,
  Flexbox,
} from 'former-kit'
import IconLock from 'emblematic-icons/svg/Lock32.svg'
import style from './style.css'

const Versions = ({
  current,
  environment,
  onVersionChange,
  options,
  t,
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const [selected, setSelected] = useState(null)
  const [name, setVersionName] = useState('')
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (options.length && current) {
      const getCurrentVersionFromOptions = propEq('value', current)
      const apiVersion = find(getCurrentVersionFromOptions, options)

      setSelected(apiVersion.value)
      setVersionName(apiVersion.name)
    }
  }, [options, current])

  const openModalConfirmation = ({ target }) => {
    setSelected(target.value)
    setOpened(true)
  }

  const handleVersionChange = () => {
    onVersionChange(selected)
    setOpened(false)
  }

  const handleCancel = () => {
    setSelected(current)
    setOpened(false)
  }

  return (
    <Fragment>
      <CardSection>
        <CardSectionDoubleLineTitle
          collapsed={collapsed}
          icon={<IconLock height={16} width={16} />}
          onClick={() => setCollapsed(!collapsed)}
          subtitle={name}
          title={t('select_version_title')}
        />
        {!collapsed
          && (
            <CardContent>
              <Grid>
                <Row>
                  <Col desk={12} tv={12} palm={12}>
                    <p>
                      {t('select_version_description')}
                    </p>
                  </Col>

                  <Col desk={3} tv={4} palm={12}>
                    <FormDropdown
                      label={t('select_version_label')}
                      name="api-version"
                      onChange={openModalConfirmation}
                      options={options}
                      value={selected}
                    />
                  </Col>
                </Row>
              </Grid>
            </CardContent>
          )
        }
      </CardSection>

      <Modal isOpen={opened}>
        <ModalTitle
          onClose={() => setOpened(false)}
          title={t('select_version_confirm_title')}
        />
        <ModalContent>
          <p className={style.textCenter}>
            {`${t('select_version_confirm_text')}`}&nbsp;
            <a
              href="https://docs.pagar.me/docs/versionamento"
              rel="noopener noreferrer"
            >
              {t('select_version_confirm_link')}
            </a>

            <br />
            <br />

            {t('select_version_confirm_version', {
              env: environment.toUpperCase(),
              version: current,
            })}
          </p>
        </ModalContent>
        <ModalActions>
          <Flexbox
            alignItems="center"
            justifyContent="center"
          >
            <Button
              fill="outline"
              onClick={handleCancel}
            >
              {t('cancel')}
            </Button>
            <Spacing size="small" />
            <Button
              fill="gradient"
              onClick={handleVersionChange}
            >
              {t('confirm')}
            </Button>
          </Flexbox>
        </ModalActions>
      </Modal>
    </Fragment>
  )
}

Versions.propTypes = {
  current: PropTypes.string,
  environment: PropTypes.oneOf([
    'live',
    'test',
  ]).isRequired,
  onVersionChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
}

Versions.defaultProps = {
  current: '',
}

export default Versions
