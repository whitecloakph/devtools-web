import React from 'react'
import {
  bool
  string,
  arrayOf,
  shape,
} from 'prop-types'
import Endpoint from './Endpoint'

function Collection({ name, endpoints }) {
  let active = endpoints.reduce((active = true, endpoint) => active || endpoint.active)
  return (
    <section className="card">
      <div className="card-header d-flex justify-content-between">
        <h1 className="card-title mb-0 flex-grow-1">
          { name }
        </h1>
        <label className="d-block mb-0">
          <input
            type="checkbox"
            checked={active}
          />
          <span className="sr-only">
            Activated
          </span>
        </label>
      </div>
      <ul className="list-group list-group-flush">
        {
          endpoints.map(({ name: endpointName, options }) => (
            <Endpoint
              name={endpointName}
              options={options}
            />
          ))
        }
      </ul>
    </section>
  )
}

Collection.defaultProps = {
  name: null,
  endpoints: null,
}

Collection.propTypes = {
  name: string,
  endpoints: arrayOf(shape(Endpoint.propTypes)),
}

export default Collection
