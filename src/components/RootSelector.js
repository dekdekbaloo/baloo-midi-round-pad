import { DIATONIC_NOTES } from '../utils/notes'
import PropTypes from 'prop-types'
import React from 'react'
import Select from '../ui/Select'
import styles from './RootSelector.styl'

class RootSelector extends React.Component {
  static propTypes = {
    currentRootIndex: PropTypes.number.isRequired,
    onRootChange: PropTypes.func.isRequired
  }
  createRootSelectHandler = root => () => {
    this.props.onRootChange(root)
  }
  render () {
    return (
      <div className={styles.rootSelectorContainer}>
        <Select className={styles.container} inline>
          {DIATONIC_NOTES.map((root, i) => (
            <Select.Option
              className={styles.option}
              onClick={this.createRootSelectHandler(i)}
              key={root}
              active={this.props.currentRootIndex === i}
            >
              {root}
            </Select.Option>
          ))}
        </Select>
      </div>
    )
  }
}

export default RootSelector
