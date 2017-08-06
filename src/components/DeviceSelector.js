import DropDown from '../ui/DropDown'
import PropTypes from 'prop-types'
import React from 'react'

class DeviceSelector extends React.Component {
  static propTypes = {
    activeIndex: PropTypes.number.isRequired,
    devices: PropTypes.array.isRequired,
    onDeviceIndexChange: PropTypes.func.isRequired
  }
  createDeviceChangeHandler = i => () => {
    this.props.onDeviceIndexChange(i)
  }
  render () {
    return (
      <DropDown
        activeIndex={this.props.activeIndex}
        placeholder='--select device--'
      >
        {this.props.devices.map((device, i) => (
          <DropDown.Option
            onClick={this.createDeviceChangeHandler(i)}
            key={i}
          >
            {device[1].name}
          </DropDown.Option>
        ))}
      </DropDown>
    )
  }
}

export default DeviceSelector
