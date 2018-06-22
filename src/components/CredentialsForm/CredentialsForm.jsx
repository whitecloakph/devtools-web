import React from 'react'
import { Form, Text } from 'react-form'

function CredentialsForm({ onSubmit }) {
  return (
    <Form onSubmit={onSubmit}>
      {({ submitForm }) => (
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label
              className="d-inline m-0"
              htmlFor="apiKey"
            >
                <span>
                  API Key
                </span>
              <Text
                field="apiKey"
                id="apiKey"
                className="form-control"
                type="text"
                placeholder="API Key"
              />
            </label>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Load Collections
            </button>
          </div>
        </form>
      )}
    </Form>
  )
}

export default CredentialsForm
