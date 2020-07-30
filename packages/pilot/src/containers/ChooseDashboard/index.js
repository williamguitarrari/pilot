import React from 'react'
import PropTypes from 'prop-types'
import ChooseDashboardCard from './Card'
import ChooseDashboardContainer from './Container'
import styles from './styles.css'

import newDashImg from './ilustrations/new_dash.png'
import oldDashImg from './ilustrations/old_dash.png'

const ChooseDashboard = ({ onLegacyDashboard, onNewDashboard, t }) => (
  <ChooseDashboardContainer>
    <h1 className={styles.title}>
      {t('pages.choose_dashboard.title')}
    </h1>
    <div className={styles.dashboardCards}>
      <ChooseDashboardCard
        imgAlt={t('pages.choose_dashboard.new.img_alt')}
        imgSrc={newDashImg}
        message={t('pages.choose_dashboard.new.message')}
        onClick={onNewDashboard}
        recommended
        t={t}
        title={t('pages.choose_dashboard.new.title')}
      />
      <ChooseDashboardCard
        imgAlt={t('pages.choose_dashboard.old.img_alt')}
        imgSrc={oldDashImg}
        onClick={onLegacyDashboard}
        title={t('pages.choose_dashboard.old.title')}
        t={t}
        message={t('pages.choose_dashboard.old.message')}
      />
    </div>
  </ChooseDashboardContainer>
)

ChooseDashboard.propTypes = {
  onLegacyDashboard: PropTypes.func,
  onNewDashboard: PropTypes.func,
  t: PropTypes.func.isRequired,
}

ChooseDashboard.defaultProps = {
  onLegacyDashboard: () => {},
  onNewDashboard: () => {},
}

export default ChooseDashboard
