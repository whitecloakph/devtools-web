import React from 'react'
import { Form, } from 'informed'
import { func, bool, } from 'prop-types'

import TextBox from '../../../../components/TextBox'

class AddConfigurationForm extends React.Component {
  render() {
    const { onSubmit, disabled, } = this.props
    return (
      <Form
        onSubmit={onSubmit}
      >
        {({ formState, }) => (
          <fieldset
            disabled={disabled}
          >
            <div style={{ marginTop: 16, marginBottom: 16, }}>
              <TextBox
                type="text"
                name="name"
                label="Name"
                validate={(value) => {
                  if (!value) {
                    return 'Name is required'
                  }
                  return null
                }}
                validateOnChange
                validateOnBlur
                notify={['apiKey', ]}
              />
            </div>
            <div style={{ marginTop: 16, marginBottom: 16, }}>
              <TextBox
                type="text"
                name="apiKey"
                label="API Key"
                validate={(value) => {
                  if (!value) {
                    return 'API key is required'
                  }
                  return null
                }}
                validateOnChange
                validateOnBlur
                notify={['name', ]}
              />
            </div>
            <div style={{ marginTop: 16, }}>
              <button
                type="submit"
                disabled={formState.pristine || formState.invalid}
              >
                Add Configuration
              </button>
            </div>
          </fieldset>
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
