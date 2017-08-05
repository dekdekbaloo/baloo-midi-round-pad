import { DISTANCES } from '../utils/notes'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './RoundPad.styl'

class RoundPad extends React.Component {
  static propTypes = {
    mode: PropTypes.number
  }
  static defaultProps = {
    mode: 0
  }
  getPointFromDegree (degree, radius) {
    return {
      x: Math.cos(degree * Math.PI / 180) * radius + 50,
      y: Math.sin(degree * Math.PI / 180) * radius + 50
    }
  }
  createTouchHandler (note) {
    return () => {
      console.log(note)
    }
  }
  render () {
    return (
      <svg className={styles.roundPad} viewBox='0 0 100 100'>
        {DISTANCES[this.props.mode].reduce(({ paths, lastAngle }, distance, i, distances) => {
          const angleWidth = distance * 360 / (this.props.mode === 7 ? distances.length : distances.length - 1)
          const radius = 45
          const point1 = this.getPointFromDegree(lastAngle, radius)
          const arcPoint = this.getPointFromDegree(lastAngle + angleWidth * 0.5, 50)
          const point2 = this.getPointFromDegree(lastAngle + angleWidth, radius)
          return {
            paths: [
              ...paths,
              <path
                d={`M50 50 ${point1.x} ${point1.y} ${arcPoint.x} ${arcPoint.y} ${point2.x} ${point2.y}Z`}
                onClick={this.createTouchHandler(distance)}
                key={i}
              />
            ],
            lastAngle: lastAngle + angleWidth
          }
        }, { paths: [], lastAngle: -90 }).paths
        }
      </svg>
    )
  }
}

export default RoundPad
