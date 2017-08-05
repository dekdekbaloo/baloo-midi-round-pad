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
    this.pad.addEventListener('touchend', this.handleTouchEnd, false)
    this.pad.addEventListener('touchmove', this.handleTouchMove, false)
    this.pad.addEventListener('touchcancel', this.handleTouchCancel, false)
  }
  componentWillUnmount () {
    this.pad.removeEventListener('touchstart', this.handleTouchStart, false)
    this.pad.removeEventListener('touchend', this.handleTouchEnd, false)
    this.pad.removeEventListener('touchmove', this.handleTouchMove, false)
    this.pad.removeEventListener('touchcancel', this.handleTouchCancel, false)
  }
  componentWillReceiveProps (nextProps) {
    this.updateDistanceSum(this.props.mode)
  }
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
    const distance = +e.target.getAttribute('data-distance')
    const index = +e.target.getAttribute('data-index')
    this.handlePadTouch(index)
    this.playNote(distance)
  }
  handleTouchEnd = () => {
    this.handlePadUnTouch()
    this.props.noteOff(this.lastDistance)
  }
  handleTouchCancel = () => {
    this.handlePadUnTouch()
    this.props.noteOff(this.lastDistance)
  }
  handleTouchMove = e => {
    e.preventDefault()
    const touches = [ ...e.targetTouches ]
    const touch = touches[touches.length - 1]
    const pad = document.elementFromPoint(touch.pageX, touch.pageY)
    if (!pad) return
    const distance = +pad.getAttribute('data-distance')
    const index = +pad.getAttribute('data-index')
    if (this.lastDistance === distance) return
    this.handlePadTouch(index)
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
    if (octaveOffset > 0) {
      this.props.nextOctave()
    } else if (octaveOffset < 0) {
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
