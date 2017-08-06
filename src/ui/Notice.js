import PropTypes from 'prop-types'
import React from 'react'
import styles from './Notice.styl'

const Notice = ({ children, onCloseButtonClick }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
    <div className={styles.closeButton} onClick={onCloseButtonClick}>
      ×
    </div>
  </div>
)
Notice.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired
}

export default Notice
