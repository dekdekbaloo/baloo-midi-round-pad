import PropTypes from 'prop-types'
import React from 'react'
import Select from '../ui/Select'
class OctaveSelector extends React.Component {
  static propTypes = {
    currentOctave: PropTypes.number.isRequired,
    onOctaveChange: PropTypes.func.isRequired
  }
  createOctaveChangeHandler = octave => () => {
    this.props.onOctaveChange(octave)
  }
  render () {
    return (
      <Select inline>
        {
          [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(octave => (
            <Select.Option
              active={this.props.currentOctave === octave}
              onClick={this.createOctaveChangeHandler(octave)}
              key={octave}
            >
              {'' + octave}
            </Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default OctaveSelector
