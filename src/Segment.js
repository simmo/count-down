import React from 'react'

import './segment.css'

const Segment = ({ number, unit }) => (
  <div className="segment">
    <span className="segment__number">{number}</span>{' '}
    <span className="segment__unit">
      {unit}
      {number !== 1 && 's'}
    </span>
  </div>
)

export default Segment
