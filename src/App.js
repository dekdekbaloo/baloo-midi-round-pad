import ModeSelector from './components/ModeSelector'
import OctaveSelector from './components/OctaveSelector'
import React from 'react'
import RootSelector from './components/RootSelector'
import RoundPad from './components/RoundPad'
import styles from './App.styl'

class App extends React.Component {
  state = {
    currentModeIndex: 0,
    currentRootIndex: 0,
    currentOctave: 0
  }
  componentDidMount () {
    window.navigator.requestMIDIAccess().then(({ outputs }) => {
      const devices = [ ...outputs ]
      console.log('device', devices[0])
      this.device = devices[0][1]
    })
  }
  handleModeChange = modeIndex => {
    this.setState({ currentModeIndex: modeIndex })
  }
  handleRootChange = rootIndex => {
    this.setState({ currentRootIndex: rootIndex })
  }
  handleOctaveChange = octave => {
    this.setState({ currentOctave: octave })
  }
  sendNote = distance => {
    if (!this.device) return
    const { currentOctave, currentRootIndex } = this.state
    this.device.send([
      0x90,
      0x3c + distance + currentRootIndex + 12 * currentOctave,
      0x7F
    ])
  }
  render () {
    return (
      <div className={styles.appContainer}>
        <div className={styles.roundPadContainer}>
          <RoundPad
            mode={this.state.currentModeIndex}
            onNoteTouchStart={this.sendNote}
            onNoteTouchEnd={this.releaseNote}
          />
        </div>
        <div className={styles.selectors}>
          <div className={styles.column}>
            <ModeSelector currentModeIndex={this.state.currentModeIndex} onModeChange={this.handleModeChange} />
          </div>
          <div className={styles.column}>
            <RootSelector currentRootIndex={this.state.currentRootIndex} onRootChange={this.handleRootChange} />
            <div>
              <OctaveSelector currentOctave={this.state.currentOctave} onOctaveChange={this.handleOctaveChange} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
