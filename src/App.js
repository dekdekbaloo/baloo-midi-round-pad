import React from 'react'
import RoundPad from './components/RoundPad'
import styles from './App.styl'

class App extends React.Component {
  render () {
    return (
      <div className={styles.roundPadContainer}>
        <RoundPad />
      </div>
    )
  }
}

export default App
