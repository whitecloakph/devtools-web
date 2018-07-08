import React from 'react'
import { Form, Text, } from 'informed'

function NavigationForm({ onSubmit, disabled, }) {
  return (
    <Form
      onSubmit={onSubmit}
    >
      {({ formState, }) => (
        <fieldset
          disabled={disabled}
        >
          <div
            style={{ display: 'flex', alignItems: 'stretch', padding: 4, }}
          >
            <Text
              style={{ flex: 'auto', }}
              field="path"
              placeholder="Path"
            />
            <button
              type="submit"
              style={{ marginLeft: 4, }}
              disabled={formState.invalid}
            >
              Go
            </button>
          </div>
        </fieldset>
      )}
    </Form>
  )
}

export default NavigationForm
