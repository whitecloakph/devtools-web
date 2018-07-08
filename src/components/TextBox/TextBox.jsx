import React from 'react'
import { Text, withFormState, } from 'informed'
import {
  func,
  string,
  shape,
  bool,
} from 'prop-types'

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
    const {
      label,
      hint,
      name,
      formState,
      hiddenFeedback,
      hiddenLabel,
      ...props
    } = this.props

    const error = formState.touched[name] ? formState.errors[name] : null

    return (
      <React.Fragment>
        <label
          htmlFor={id}
          style={{ display: 'inline', }}
        >
          <span
            className={hiddenLabel ? 'sr-only' : null}
          >
            {label}
          </span>
          <Text
            {...props}
            id={id}
            style={{ display: 'block', }}
            placeholder={hint || label}
            field={name}
          />
        </label>
        <output
          className={hiddenFeedback ? 'error sr-only' : 'error'}
        >
          {error || '\xA0'}
        </output>
      </React.Fragment>
    )
  }
}

TextBox.defaultProps = {
  hiddenLabel: true,
  hiddenFeedback: true,
  formState: null,
  hint: null,
  onChange: null,
  onBlur: null,
}

TextBox.propTypes = {
  hiddenLabel: bool,
  hiddenFeedback: bool,
  formState: shape(),
  label: string.isRequired,
  name: string.isRequired,
  hint: string,
  onChange: func,
  onBlur: func,
}

export default withFormState(TextBox)
