import { MODE_DISTANCES } from '../utils/notes'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './RoundPad.styl'

class RoundPad extends React.Component {
  static propTypes = {
    mode: PropTypes.number,
    noteOn: PropTypes.func.isRequired,
    noteOff: PropTypes.func.isRequired,
    nextOctave: PropTypes.func.isRequired,
    previousOctave: PropTypes.func.isRequired
  }
  static defaultProps = {
    mode: 0
  }
  componentDidMount () {
    this.updateDistanceSum(this.props.mode)
  }
  componentWillReceiveProps (nextProps) {
    this.updateDistanceSum(this.props.mode)
  }
  updateDistanceSum = mode => {
    this.distanceSum = MODE_DISTANCES[mode].reduce((prev, curr) => prev + curr, 0)
  }
  handleTouchStart = e => {
    const distance = +e.target.getAttribute('data-distance')
    this.playNote(distance)
  }
  handleTouchEnd = () => {
    this.props.noteOff(this.lastDistance)
  }
  handleTouchCancel = () => {
    this.props.noteOff(this.lastDistance)
  }
  handleTouchMove = e => {
    e.preventDefault()
    const touches = [ ...e.targetTouches ]
    const touch = touches[touches.length - 1]
    const pad = document.elementFromPoint(touch.pageX, touch.pageY)
    const distance = +pad.getAttribute('data-distance')
    if (this.lastDistance === distance) return
    this.playNote(distance)
  }
  calculateOctaveOffset = distance => {
    const diff = distance - this.lastDistance
    const outerDiff = this.distanceSum - Math.abs(diff)
    if (outerDiff < Math.abs(diff)) {
      return diff > 0 ? -12 : 12
    }
    return 0
  }
  playNote = distance => {
    this.props.noteOff(this.lastDistance)
    const octaveOffset = this.calculateOctaveOffset(distance)
    const offsetDistance = distance + octaveOffset
    if (octaveOffset > 0) {
      this.props.nextOctave()
    } else if (octaveOffset < 0) {
      this.props.previousOctave()
    }
    this.props.noteOn(offsetDistance)
    this.lastDistance = distance
  }
  getPointFromDegree (degree, radius) {
    return {
      x: Math.cos(degree * Math.PI / 180) * radius + 50,
      y: Math.sin(degree * Math.PI / 180) * radius + 50
    }
  }
  createTouchHandler (distance, handler) {
    return () => {
      handler(distance)
    }
  }
  render () {
    return (
      <svg
        className={styles.roundPad}
        viewBox='0 0 100 100'
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        onTouchCancel={this.handleTouchCancel}
      >
        {MODE_DISTANCES[this.props.mode].reduce(({ paths, lastAngle, distanceSum }, distance, i, distances) => {
          const angleWidth = distance * 180 / (this.props.mode === 7 ? distances.length * 0.5 : distances.length - 1)
          const radius = 45
          const point1 = this.getPointFromDegree(lastAngle, radius)
          const arcPoint = this.getPointFromDegree(lastAngle + angleWidth * 0.5, 50)
          const point2 = this.getPointFromDegree(lastAngle + angleWidth, radius)
          return {
            paths: [
              ...paths,
              <path
                d={`M50 50 ${point1.x} ${point1.y} ${arcPoint.x} ${arcPoint.y} ${point2.x} ${point2.y}Z`}
                data-distance={distanceSum}
                key={i}
              />
            ],
            lastAngle: lastAngle + angleWidth,
            distanceSum: distanceSum + distance
          }
        }, { paths: [], lastAngle: -90, distanceSum: 0 }).paths
        }
      </svg>
    )
  }
}

export default RoundPad
