import React from 'react'
import {
  string,
  arrayOf,
  shape,
  bool,
  func,
} from 'prop-types'

function Endpoint({
  id,
  name,
  options,
  active,
  onChange,
}) {
  const optionGroups = options.reduce((groups, option) => {
    if (!groups[option.code]) {
      return {
        ...groups,
        [option.code]: [option, ],
      }
    }
    return {
      ...groups,
      [option.code]: [...groups[option.code], option, ],
    }
  }, {})
  return (
    <div
      style={{
        display: 'flex',
        padding: 6,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          flexShrink: 1,
          flexGrow: 0,
        }}
      >
        <label
          htmlFor={`Checkbox-${id}`}
        >
          <input
            id={`Checkbox-${id}`}
            type="checkbox"
            checked={active}
            onChange={onChange}
          />
          <span className="label">
            Active
          </span>
        </label>
      </div>
      <div
        style={{ flex: 'auto', marginLeft: 24, marginRight: 12, }}
      >
        {name}
      </div>
      <div
        style={{ flexShrink: 0, }}
      >
        <select>
          {
            Object.keys(optionGroups).map(label => (
              <optgroup label={label}>
                {
                  optionGroups[label].map(option => (
                    <option
                      key={option.id}
                    >
                      {option.name}
                    </option>
                  ))
                }
              </optgroup>
            ))
          }
        </select>
      </div>
    </div>
  )
}

Endpoint.defaultProps = {
  options: [],
  active: false,
  onChange: null,
}

Endpoint.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  options: arrayOf(shape()),
  active: bool,
  onChange: func,
}

export default Endpoint
