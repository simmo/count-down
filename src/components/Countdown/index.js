import React, { useMemo, useState } from 'react'
import useInterval from '../../hooks/useInterval'

import style from './styles.module.css'

const MS_IN_MINUTES = 1000 * 60
const MS_IN_HOURS = MS_IN_MINUTES * 60
const MS_IN_DAYS = MS_IN_HOURS * 24
const differenceToNow = when => when - Date.now()

export default function Countdown({ emoji, name, when }) {
  const [difference, setDifference] = useState(differenceToNow(when))
  const isDone = useMemo(() => difference < 1000, [difference])
  const days = useMemo(
    () => (isDone ? 0 : Math.floor(difference / MS_IN_DAYS)),
    [isDone, difference]
  )
  const hours = useMemo(
    () => (isDone ? 0 : Math.floor((difference % MS_IN_DAYS) / MS_IN_HOURS)),
    [isDone, difference]
  )
  const minutes = useMemo(
    () => (isDone ? 0 : Math.floor((difference % MS_IN_HOURS) / MS_IN_MINUTES)),
    [isDone, difference]
  )
  const seconds = useMemo(
    () => (isDone ? 0 : Math.floor((difference % MS_IN_MINUTES) / 1000)),
    [isDone, difference]
  )

  useInterval(() => setDifference(differenceToNow(when)), isDone ? null : 1000)

  return (
    <div className={style.wrap}>
      <h2 className={style.heading}>
        <span className={style.emoji} role="img" aria-hidden>
          {emoji}
        </span>{' '}
        {name}
      </h2>
      {isDone ? (
        <div className={style.segment + ' ' + style.done}>Done!</div>
      ) : (
        <ul className={style.segments}>
          {[
            { unit: 'day', value: days },
            { unit: 'hour', value: hours },
            { unit: 'minute', value: minutes },
            { unit: 'second', value: seconds },
          ].map(({ unit, value }) => (
            <li className={style.segment}>
              <span className={style.label}>{value}</span>
              <span className={style.unit}>
                {unit}
                {value !== 1 && 's'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
