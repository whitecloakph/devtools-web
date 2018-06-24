import React from 'react'
import { arrayOf, shape, } from 'prop-types'
import {
  Collapse,
  Switch,
  List,
} from 'antd'

//<Switch
//defaultChecked={
//  endpoints.reduce((a = true, endpoint) => a || endpoint.active)
//}
///>

//{
//  endpoints.length > 0
//    ? (
//      <List
//        dataSource={endpoints}
//        renderItem={({ name: endpointName, options, }) => (
//          <List.Item>
//            <List.Item.Meta
//              title={endpointName}
//            />
//          </List.Item>
//        )}
//      />
//    )
//    : (
//      <span>
//                          No endpoints.
//                        </span>
//    )
//}

function CollectionGroup({ collections, }) {
  return (
    <Collapse>
      {
        collections
          .filter(({ endpoints, }) => endpoints && endpoints.length > 0)
          .map(({ id, name, endpoints, }) => (
            <Collapse.Panel
              key={id}
              span={12}
              header={name}
            >
              <List
                size="small"
                dataSource={endpoints}
                renderItem={({ name: endpointName, options, active, }) => (
                  <List.Item>
                    <List.Item.Meta
                      title={endpointName}
                    />
                    <Switch
                      defaultChecked={active}
                    />
                  </List.Item>
                )}
              />
            </Collapse.Panel>
          ))
      }
    </Collapse>
  )
}

CollectionGroup.defaultProps = {
  collections: null,
}

CollectionGroup.propTypes = {
  collections: arrayOf(shape),
}

export default CollectionGroup
