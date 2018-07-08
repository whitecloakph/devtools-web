import React from 'react'
import { shape, node, } from 'prop-types'

function Card({
  style,
  children,
  ...props
}) {
  return (
    <div
      {...props}
      style={{
        ...style,
        margin: 6,
        width: 200,
        border: '1px solid var(--button-border-color)',
        backgroundColor: 'var(--button-bg-color)',
        borderRadius: 2,
        padding: 16,
      }}
    >
      { children }
    </div>
  )
}

Card.defaultProps = {
  style: {},
  children: null,
}

Card.propTypes = {
  style: shape(),
  children: node,
}

export default Card
