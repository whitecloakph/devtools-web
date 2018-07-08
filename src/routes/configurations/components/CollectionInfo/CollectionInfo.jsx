import React from 'react'
import { arrayOf, shape, string, } from 'prop-types'

function CollectionInfo({ name, description, items, }) {
  return (
    <React.Fragment>
      <strong>
        {name}
      </strong>
      <br />
      {
        description
        && (
          <span>
            {description}
          </span>
        )
      }
      { description && <br /> }
      <small>
        {items ? `${items.length} items` : 'Items not loaded'}
      </small>
    </React.Fragment>
  )
}

CollectionInfo.defaultProps = {
  description: null,
  items: [],
}

CollectionInfo.propTypes = {
  name: string.isRequired,
  description: string,
  items: arrayOf(shape()),
}

export default CollectionInfo
