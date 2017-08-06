import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'
import styles from './Select.styl'

const Select = ({ children, inline, className, ...props }) => (
  <div
    className={cx(styles.container, {
      [styles.inline]: inline,
      [className]: className
    })}
    {...props}
  >
    {children}
  </div>
)
Select.propTypes = {
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
  className: PropTypes.string
}

const Option = ({ children, active, className, ...props }) => (
  <div
    className={cx(styles.option, {
      [styles.active]: active,
      [className]: className
    })}
    {...props}
  >
    {children}
  </div>
)
Option.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  className: PropTypes.string
}

const Label = ({ children }) => (
  <div className={styles.label}>
    <span>
      {children}
    </span>
  </div>
)
Label.propTypes = {
  children: PropTypes.node.isRequired
}

Select.Option = Option
Select.Label = Label
export default Select
