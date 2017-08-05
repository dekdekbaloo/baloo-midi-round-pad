import ModeSelector from './components/ModeSelector'
import React from 'react'
import RootSelector from './components/RootSelector'
import RoundPad from './components/RoundPad'
import styles from './App.styl'
class App extends React.Component {
  state = {
    currentModeIndex: 0,
    currentRoot: 'C'
  }
  handleModeChange = modeIndex => {
    this.setState({ currentModeIndex: modeIndex })
  }
  handleRootChange = root => {
    this.setState({ currentRoot: root })
  }
  render () {
    return (
      <div className={styles.appContainer}>
        <div className={styles.roundPadContainer}>
          <RoundPad mode={this.state.currentModeIndex} />
        </div>
        <div className={styles.selectors}>
          <ModeSelector currentModeIndex={this.state.currentModeIndex} onModeChange={this.handleModeChange} />
          <RootSelector currentRoot={this.state.currentRoot} onRootChange={this.handleRootChange} />
        </div>
      </div>
    )
  }
}

export default App
