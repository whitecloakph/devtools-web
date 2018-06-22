import React from 'react'
import { arrayOf } from 'prop-types'
import Collection from './Collection'

function CollectionGroup({ collections }) {
  return (
    <div className="card-columns">
      {
        collections.map(({ name, endpoints, active }) => (
          <Collection
            name={name}
            endpoints={endpoints}
            active={active}
          />
        ))
      }
    </div>
  )
}

CollectionGroup.defaultProps = {
  collections: null,
}

CollectionGroup.propTypes = {
  collections: arrayOf(Collection.propTypes),
}

export default CollectionGroup
