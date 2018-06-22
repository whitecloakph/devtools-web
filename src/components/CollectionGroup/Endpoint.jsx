import React from 'react'
import {
  string,
  arrayOf,
  shape,
  bool,
} from 'prop-types'

function Endpoint({ name, active, options }) {
  return (
    <li className="list-group-item d-flex align-items-center">
      <div className="w-50">
        { name }
      </div>
      <div className="w-50">
        <select className="form-control">
          {
            options.map(({ name: optionName, value }) => (
              <option value={value}>
                { optionName }
              </option>
            ))
          }
        </select>
      </div>
    </li>
  )
}

Endpoint.defaultProps = {
  name: null,
  active: true,
  options: [],
}

Endpoint.propTypes = {
  name: string,
  active: bool,
  options: arrayOf(
    shape({
      name: string,
      value: string,
    }),
  ),
}

export default Endpoint
