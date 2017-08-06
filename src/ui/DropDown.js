import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'
import styles from './DropDown.styl'
class DropDown extends React.Component {
  static propTypes = {
    activeIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    children: PropTypes.node.isRequired
  }
  state = {
    isOpened: false
  }
  toggle = () => {
    this.setState({ isOpened: !this.state.isOpened })
  }
  render () {
    return (
      <div className={styles.container} onClick={this.toggle}>
        <div className={styles.display}>
          {this.props.activeIndex >= 0
            ? this.props.children[this.props.activeIndex]
            : this.props.placeholder
          }
        </div>
        <div className={styles.arrow}>
          ▼
        </div>
        {this.state.isOpened ? (
          <div className={styles.options}>
            {this.props.children.map((option, i) => (
              React.cloneElement(option, {
                active: this.props.activeIndex === i
              })
            ))}
          </div>
        ) : null}
      </div>
    )
  }
}

const Option = ({ children, active, onClick }) => (
  <div className={cx(styles.option, { [styles.active]: active })} onClick={onClick}>
    {children}
  </div>
)
Option.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

DropDown.Option = Option
export default DropDown
