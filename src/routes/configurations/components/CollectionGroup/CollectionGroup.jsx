import React from 'react'
import { arrayOf, shape, } from 'prop-types'
import {
  Row,
  Col,
  Card,
  Switch,
  List,
} from 'antd'

function CollectionGroup({ collections, }) {
  return (
    <Row
      gutter={16}
      style={{
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 4,
        paddingRight: 4,
      }}
    >
      {
        collections
          .filter(({ endpoints, }) => endpoints && endpoints.length > 0)
          .map(({ id, name, endpoints, }) => (
            <Col
              key={id}
              span={8}
              header={name}
              style={{
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              <Card>
                <Card.Meta
                  title={name}
                  description={`${endpoints ? endpoints.length : '-'} endpoint(s)`}
                />
              </Card>
            </Col>
          ))
      }
    </Row>
  )
}

CollectionGroup.defaultProps = {
  collections: null,
}

CollectionGroup.propTypes = {
  collections: arrayOf(shape),
}

export default CollectionGroup
