import PropTypes from 'prop-types'
import React from 'react'
import Select from '../ui/Select'

class ModeSelector extends React.Component {
  static propTypes ={
    currentModeIndex: PropTypes.number.isRequired,
    onModeChange: PropTypes.func.isRequired
  }
  createModeChangeHandler = i => () => {
    this.props.onModeChange(i)
  }
  render () {
    return (
      <Select>
        {
          ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'CHROMATIC'].map((mode, i) => (
            <Select.Option
              onClick={this.createModeChangeHandler(i)}
              key={mode}
              active={this.props.currentModeIndex === i}
            >
              {mode}
            </Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default ModeSelector
