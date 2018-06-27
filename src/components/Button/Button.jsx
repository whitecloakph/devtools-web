import React from 'react'
import { string, } from 'prop-types'

function Button({ type, ...props }) {
  switch (type) {
    case 'submit':
      return (
        <button
          {...props}
          type="submit"
        />
      )
    default:
      break
  }

  return (
    <button
      {...props}
      type="button"
    />
  )
}

Button.defaultProps = {
  type: 'button',
}

Button.propTypes = {
  type: string,
}

export default Button
