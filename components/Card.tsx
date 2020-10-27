import React from 'react'

interface Props {
  color?: string
}

const Card: React.FC<Props> = ({ color, children }) => {
  return color === 'primary' ? (
    <div
      className="card"
      style={{ backgroundColor: '#eb414f', color: 'white' }}
    >
      {children}
    </div>
  ) : (
    <div className="card">{children}</div>
  )
}

export default Card
