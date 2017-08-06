import DeviceSelector from './components/DeviceSelector'
import ModeSelector from './components/ModeSelector'
import Notice from './ui/Notice'
import OctaveSelector from './components/OctaveSelector'
import React from 'react'
import RootSelector from './components/RootSelector'
import RoundPad from './components/RoundPad'
import styles from './App.styl'
class App extends React.Component {
  state = {
    currentModeIndex: 0,
    currentRootIndex: 0,
    currentOctave: 0,
    currentDeviceIndex: -1,
    devices: [ ],
    isWebMIDISupported: false,
    shouldShowNotice: false
  }
  componentDidMount () {
    if (!window.navigator.requestMIDIAccess) {
      this.setState({
        shouldShowNotice: true
      })
    }
    window.navigator.requestMIDIAccess().then(({ outputs }) => {
      this.setState({
        isWebMIDISupported: true,
        devices: [ ...outputs ]
      })
    })
  }
  componentWillUpdate (nextProps, nextState) {
    if (nextState.currentDeviceIndex !== this.state.currentDeviceIndex) {
      this.device = this.state.devices[nextState.currentDeviceIndex]
    }
  }
  dismissNotice = () => {
    this.setState({ shouldShowNotice: false })
  }
  createChangeHandler = name => value => {
    this.setState({ [name]: value })
  }
  nextOctave = () => {
    if (this.state.currentOctave >= 4) return
    this.setState({ currentOctave: this.state.currentOctave + 1 })
  }
  previousOctave = () => {
    if (this.state.currentOctave <= -4) return
    this.setState({ currentOctave: this.state.currentOctave - 1 })
  }
  calculateMidiNote = distance => {
    const { currentOctave, currentRootIndex } = this.state
    return 0x3c + distance + currentRootIndex + 12 * currentOctave
  }
  noteOff = distance => {
    if (!this.device) return
    this.device.send([
      0x80,
      this.calculateMidiNote(distance),
      0x40
    ])
  }
  noteOn = distance => {
    if (!this.device) return
    this.device.send([
      0x90,
      this.calculateMidiNote(distance),
      0x7F
    ])
  }
  render () {
    return (
      <div className={styles.appContainer}>
        <div className={styles.deviceSelector}>
          <DeviceSelector
            activeIndex={this.state.currentDeviceIndex}
            devices={this.state.devices}
            onDeviceIndexChange={this.createChangeHandler('currentDeviceIndex')}
          />
        </div>
        <div className={styles.selectorContainer}>
          <OctaveSelector currentOctave={this.state.currentOctave} onOctaveChange={this.createChangeHandler('currentOctave')} />
        </div>
        <div className={styles.roundPadContainer}>
          <RoundPad
            mode={this.state.currentModeIndex}
            noteOn={this.noteOn}
            noteOff={this.noteOff}
            nextOctave={this.nextOctave}
            previousOctave={this.previousOctave}
          />
        </div>
        <div className={styles.bottomPanels}>
          <div className={styles.column}>
            <ModeSelector currentModeIndex={this.state.currentModeIndex} onModeChange={this.createChangeHandler('currentModeIndex')} />
          </div>
          <div className={styles.column}>
            <RootSelector currentRootIndex={this.state.currentRootIndex} onRootChange={this.createChangeHandler('currentRootIndex')} />
          </div>
        </div>
        {this.state.shouldShowNotice
          ? (
            <Notice onCloseButtonClick={this.dismissNotice}>
              Your browser doesn't support WebMIDI please open this with other browsers
            </Notice>
          ) : null
        }
      </div>
    )
  }
}

export default App
