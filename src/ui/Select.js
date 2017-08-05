import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'
import styles from './Select.styl'

const Select = ({ children, inline, ...props }) => (
  <div
    className={cx(styles.container, {
      [styles.inline]: inline
    })}
    {...props}
  >
    {children}
  </div>
)
Select.propTypes = {
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool
}
const Option = ({ children, active, ...props }) => (
  <div
    className={cx(styles.option, {
      [styles.active]: active
    })}
    {...props}
  >
    {children}
  </div>
)
Option.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool
}

Select.Option = Option
export default Select
