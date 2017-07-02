import PropTypes from 'prop-types'
import React from 'react'
class RoundPad extends React.Component {
  static DIATONIC = 'diatonic'
  static CHROMATIC = 'chromatic'
  static propTypes = {
    mode: PropTypes.oneOf([ RoundPad.DIATONIC, RoundPad.CHROMATIC ])
  }
  static defaultProps = {
    mode: RoundPad.DIATONIC
  }
  getNoteArray (mode) {
    if (mode === RoundPad.DIATONIC) {
      return ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    }
  }
  createClickHandler (note) {
    return (e) => {
      console.log(note)
    }
  }
  render () {
    return (
      <svg width={500} height={500} viewBox='0 0 100 100'>
        {this.getNoteArray(this.props.mode).map((note, i, notes) => {
          const angleWidth = 360 / notes.length
          const currentAngle = -90 + i * angleWidth
          const radius = 50
          const firstAngle = (currentAngle - angleWidth * 0.5)
          const point1 = {
            x: Math.cos(firstAngle * Math.PI / 180) * radius + radius,
            y: Math.sin(firstAngle * Math.PI / 180) * radius + radius
          }
          const secondAngle = (currentAngle + angleWidth * 0.5)
          const point2 = {
            x: Math.cos(secondAngle * Math.PI / 180) * radius + radius,
            y: Math.sin(secondAngle * Math.PI / 180) * radius + radius
          }
          return (
            <path
              d={`M50 50 ${point1.x} ${point1.y} ${point2.x} ${point2.y}Z`}
              fill='#5288b9'
              stroke='#89cbbb'
              strokeWidth='0.1'
              onClick={this.createClickHandler(note)}
            />
          )
        })}
      </svg>
    )
  }
}

export default RoundPad
