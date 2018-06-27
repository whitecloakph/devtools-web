import React from 'react'
import autoBind from 'react-autobind'
import { Form, } from 'react-form'
import { func, bool, } from 'prop-types'

import TextBox from '../../../../components/TextBox'

function validate({ name, apiKey, }) {
  const errors = {}

  if (!name) {
    errors.name = 'Name is required.'
  }

  if (apiKey) {
    errors.name = 'API key is required.'
  }

  return errors
}

class AddConfigurationForm extends React.Component {
  constructor() {
    super()
    autoBind(this)
  }

  render() {
    const { onSubmit, disabled, } = this.props
    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ submitForm, }) => (
          <form
            onSubmit={submitForm}
          >
            <fieldset
              style={{ border: 0, padding: 0, margin: 0, }}
              disabled={disabled}
            >
              <div style={{ marginTop: 16, marginBottom: 16, }}>
                <TextBox
                  name="name"
                  label="Name"
                />
              </div>
              <div style={{ marginTop: 16, marginBottom: 16, }}>
                <TextBox
                  name="apiKey"
                  label="API Key"
                />
              </div>
              <div style={{ marginTop: 16, }}>
                <button
                  type="submit"
                >
                  Add Configuration
                </button>
              </div>
            </fieldset>
          </form>
        )}
      </Form>
    )
  }
}

AddConfigurationForm.defaultProps = {
  onSubmit: null,
  disabled: false,
}

AddConfigurationForm.propTypes = {
  onSubmit: func,
  disabled: bool,
}

export default AddConfigurationForm
