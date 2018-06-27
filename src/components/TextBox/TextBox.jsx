import React from 'react'
import { Text, } from 'react-form'
import { generateFieldDOMId, } from '../../utilities/id'

class TextBox extends React.Component {
  constructor() {
    super()
    this.state = {
      id: generateFieldDOMId('TextBox'),
    }
  }

  render() {
    const { id, } = this.state
    const { label, name, } = this.props

    return (
      <label
        htmlFor={id}
        style={{ display: 'inline', }}
      >
        <span>
          {label}
        </span>
        <Text
          style={{ display: 'block', }}
          id={id}
          field={name}
          placeholder={label}
        />
      </label>
    )
  }
}

export default TextBox
