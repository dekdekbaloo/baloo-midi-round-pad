import PropTypes from 'prop-types'
import React from 'react'
import Select from '../ui/Select'

class RootSelector extends React.Component {
  static propTypes = {
    currentRoot: PropTypes.string.isRequired,
    onRootChange: PropTypes.func.isRequired
  }
  createRootSelectHandler = root => () => {
    this.props.onRootChange(root)
  }
  render () {
    return (
      <Select inline>
        {
          ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((root) => (
            <Select.Option
              onClick={this.createRootSelectHandler(root)}
              key={root}
              active={this.props.currentRoot === root}
            >
              {root}
            </Select.Option>
          ))
        }
      </Select>

    )
  }
}

export default RootSelector
