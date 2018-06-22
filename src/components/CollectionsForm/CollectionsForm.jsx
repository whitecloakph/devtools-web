import React from 'react'
import { Form, Select } from 'react-form'

function CollectionsForm({ onSubmit, collections }) {
  let options = collections || []

  return (
    <Form
      onSubmit={onSubmit}
    >
      {({ submitForm }) => (
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label
              className="d-inline m-0"
              htmlFor="collection"
            >
              <span>
                Collection
              </span>
              <Select
                field="collection"
                id="collection"
                className="form-control"
                options={options}
              />
            </label>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Select Collection
            </button>
          </div>
        </form>
      )}
    </Form>
  )
}

export default CollectionsForm
