import React, { Component } from 'react'
import './app.css'
import Segment from './Segment'
import cheerAudio from './cheer.mp3'

class App extends Component {
  state = {
    target: this.props.target.getTime(),
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  componentDidMount = () => {
    this.calculate()

    this.interval = setInterval(this.calculate, 1000)
  }

  calculate = () => {
    const now = Date.now()
    const difference = this.state.target - now
    const done = difference < 1000

    const days = done ? 0 : Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = done
      ? 0
      : Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = done
      ? 0
      : Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = done ? 0 : Math.floor((difference % (1000 * 60)) / 1000)

    if (done) {
      clearInterval(this.interval)
    }

    this.setState({
      difference,
      done,
      days,
      hours,
      minutes,
      seconds,
    })
  }

  render() {
    const { done, days, hours, minutes, seconds } = this.state
    return (
      <div className={`app${done ? ' app--done' : ''}`}>
        {done && <p className="app__done">Time to go!</p>}
        {done && (
          <audio autoPlay loop>
            <source type="audio/mpeg" src={cheerAudio} />
          </audio>
        )}
        {!done && (
          <div className="app__segments">
            <Segment number={days} unit="day" />
            <Segment number={hours} unit="hour" />
            <Segment number={minutes} unit="minute" />
            <Segment number={seconds} unit="second" />
          </div>
        )}
      </div>
    )
  }
}

export default App
