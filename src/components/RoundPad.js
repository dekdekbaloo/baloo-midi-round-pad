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
  state = {
    activeIndex: -1
  }
  componentDidMount () {
    this.updateDistanceSum(this.props.mode)
    this.pad.addEventListener('touchstart', this.handleTouchStart, false)
    this.pad.addEventListener('touchmove', this.handleTouchMove, false)
    this.pad.addEventListener('touchend', this.handleTouchEnd, false)
    this.pad.addEventListener('touchcancel', this.handleTouchEnd, false)
  }
  componentWillUnmount () {
    this.pad.removeEventListener('touchstart', this.handleTouchStart, false)
    this.pad.removeEventListener('touchmove', this.handleTouchMove, false)
    this.pad.removeEventListener('touchcancel', this.handleTouchEnd, false)
    this.pad.removeEventListener('touchend', this.handleTouchEnd, false)
  }
  componentWillReceiveProps (nextProps) {
    this.updateDistanceSum(this.props.mode)
  }
  getPadData = pad => ({
    distance: +pad.getAttribute('data-distance'),
    index: +pad.getAttribute('data-index')
  })
  updateDistanceSum = mode => {
    this.distanceSum = MODE_DISTANCES[mode].reduce((prev, curr) => prev + curr, 0)
  }
  handlePadTouch = index => {
    this.setState({ activeIndex: index })
  }
  handlePadUnTouch = () => {
    this.setState({ activeIndex: -1 })
  }
  handleTouchStart = e => {
    const { distance, index } = this.getPadData(e.target)
    this.handlePadTouch(index)
    this.playNote(distance)
  }
  handleTouchEnd = () => {
    this.handlePadUnTouch()
    this.props.noteOff(this.lastDistance)
  }
  handleTouchMove = e => {
    e.preventDefault()
    const touches = [ ...e.targetTouches ]
    const touch = touches[touches.length - 1]
    const pad = document.elementFromPoint(touch.pageX, touch.pageY)
    if (!pad) return

    const { distance, index } = this.getPadData(pad)
    if (this.lastDistance === distance) return
    this.handlePadTouch(index)
    this.playNote(distance)
  }
  calculateOctaveChangeDirection = (distance, lastDistance, distanceSum) => {
    const innerDiff = distance - lastDistance
    const outerDiff = distanceSum - Math.abs(innerDiff)
    if (outerDiff < Math.abs(innerDiff)) {
      return innerDiff > 0 ? -1 : 1
    }
    return 0
  }
  playNote = distance => {
    this.props.noteOff(this.lastDistance)
    const octaveChangeDirection = this.calculateOctaveChangeDirection(
      distance, this.lastDistance, this.distanceSum
    )
    if (octaveChangeDirection > 0) {
      this.props.nextOctave()
    } else if (octaveChangeDirection < 0) {
      this.props.previousOctave()
    }
    this.props.noteOn(distance)
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
        ref={ref => { this.pad = ref }}
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
                className={this.state.activeIndex === i && styles.active}
                d={`M50 50 ${point1.x} ${point1.y} ${arcPoint.x} ${arcPoint.y} ${point2.x} ${point2.y}Z`}
                data-distance={distanceSum}
                data-index={i}
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
