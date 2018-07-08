import React from 'react'
import autoBind from 'react-autobind'
import { shape, func, } from 'prop-types'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import {
  goBack as actionGoBack,
  push as actionPush,
} from 'connected-react-router'

import { getCollection, } from '../../services/Collection'

import {
  loadCollectionChildren as actionLoadCollectionChildren,
  setCollectionStatus as actionSetCollectionStatus,
  STATUS_DEFAULT, STATUS_FAILURE, STATUS_PARTIAL,
  STATUS_PENDING,
  STATUS_SUCCESS,
} from '../../store/configuration'

import {
  retrieveCollectionFromPath,
  isCollection,
  isEndpoint,
} from '../../utilities/collection'

import {
  formatItem,
} from '../../utilities/format'

import NavigationForm from './components/NavigationForm'
import CollectionInfo from './components/CollectionInfo'
import Card from './components/Card'
import Endpoint from './components/Endpoint'

// 031d7aca0b764811b85b822eb9b2008a

class Configurations extends React.Component {
  constructor() {
    super()
    autoBind(this)
  }

  componentDidMount() {
    const { selectedConfiguration, goBack, } = this.props
    if (!selectedConfiguration) {
      goBack()
      return
    }

    switch (selectedConfiguration.status) {
      case STATUS_SUCCESS:
      case STATUS_PENDING:
        break
      default:
        this.loadCollections()
    }
  }

  componentWillReceiveProps({ selectedConfiguration, goBack, }) {
    if (!selectedConfiguration) {
      goBack()
      return
    }

    const { selectedConfiguration: oldSelectedConfiguration, } = this.props

    if (selectedConfiguration.id === oldSelectedConfiguration.id) {
      return
    }

    switch (selectedConfiguration.status) {
      case STATUS_SUCCESS:
      case STATUS_PENDING:
        break
      default:
        this.loadCollections()
    }
  }

  selectCollection(collection) {
    const { push, match, } = this.props

    push(`${match.url}/${collection.id}`)
  }

  updateSubcollectionStatus(collections, collection, status) {
    const { selectedCollection, setCollectionStatus, } = this.props
    const updatedSubCollections = collections
      .map(subCollection => ({
        ...subCollection,
        status: collection.id === subCollection.id
          ? status
          : subCollection.status,
      }))
    const allSubCollectionsLoaded = updatedSubCollections
      .reduce(
        (allLoaded = true, subCollection) => (
          allLoaded && subCollection.status !== STATUS_DEFAULT
        )
      )
    const allSubCollectionsStatus = updatedSubCollections
      .reduce(
        (allStatus = null, subCollection) => {
          switch (allStatus) {
            case STATUS_PARTIAL:
              return STATUS_PARTIAL
            case STATUS_SUCCESS:
              return subCollection.status === STATUS_SUCCESS
                ? STATUS_SUCCESS
                : STATUS_PARTIAL
            case STATUS_FAILURE:
              return subCollection.status === STATUS_FAILURE
                ? STATUS_FAILURE
                : STATUS_PARTIAL
            default:
              break
          }

          return STATUS_DEFAULT
        }
      )

    setCollectionStatus(
      selectedCollection,
      !allSubCollectionsLoaded
        ? STATUS_PENDING
        : allSubCollectionsStatus
    )
  }

  loadCollections() {
    const {
      selectedConfiguration,
      loadCollectionChildren,
      setCollectionStatus,
      selectedEnvironment,
    } = this.props
    const collections = selectedConfiguration.children
      .filter(child => !isEndpoint(child))
      .map(collection => ({
        ...collection,
        status: STATUS_DEFAULT,
      }))

    setCollectionStatus(selectedConfiguration, STATUS_PENDING)
    collections.forEach((collection) => {
      getCollection({
        id: collection.id,
        apiKey: selectedConfiguration.apiKey,
      })
        .then(
          (r) => {
            const formattedData = formatItem(
              r.data,
              {
                environment: selectedEnvironment,
                settings: null,
              }
            )

            loadCollectionChildren(collection, formattedData)

            this.updateSubcollectionStatus(collections, collection, STATUS_SUCCESS)
          },
          () => {
            this.updateSubcollectionStatus(collections, collection, STATUS_FAILURE)
          }
        )
    })
  }

  updateEndpointActive(e, endpoint) {

  }

  handleToggleAll(e) {

  }

  render() {
    const { selectedCollection, } = this.props

    if (!selectedCollection) {
      return null
    }

    const collections = selectedCollection.children.filter(child => isCollection(child))
    const endpoints = selectedCollection.children.filter(child => isEndpoint(child))
    const collectionActive = endpoints.reduce(
      (active, endpoint) => active || endpoint.active,
      false
    )

    return (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <div
          className="toolbar"
        >
          <NavigationForm />
        </div>
        <div style={{ flex: 'auto', position: 'relative', overflow: 'auto', }}>
          {
            collections.length > 0
            && (
              <section>
                <h2
                  style={{
                    margin: '12px 0',
                    padding: '0 24px',
                  }}
                >
                  Collections
                </h2>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginTop: 6,
                    marginBottom: 6,
                    paddingLeft: 18,
                    paddingRight: 18,
                  }}
                >
                  {
                    collections.map(collection => (
                      <Card
                        key={collection.id}
                        onClick={() => this.selectCollection(collection)}
                        style={{ cursor: 'pointer', }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <label
                              htmlFor={`Checkbox-${collection.id}`}
                            >
                              <input
                                id={`Checkbox-${collection.id}`}
                                type="checkbox"
                                checked={true}
                              />
                              <span className="label">
                                Active
                              </span>
                            </label>
                          </div>
                          <div
                            style={{
                              flex: 'auto',
                              marginLeft: 12,
                            }}
                          >
                            <CollectionInfo
                              name={collection.name}
                              description={collection.description}
                              items={collection.children}
                            />
                          </div>
                        </div>
                      </Card>
                    ))
                  }
                </div>
              </section>
            )
          }
          {
            endpoints.length > 0
            && (
              <section>
                <h2
                  style={{
                    margin: '12px 0',
                    padding: '0 24px',
                  }}
                >
                  Endpoints
                </h2>
                <div
                  style={{
                    marginTop: 6,
                    marginBottom: 6,
                    paddingLeft: 18,
                    paddingRight: 18,
                  }}
                >
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
                        htmlFor={`Checkbox-${selectedCollection.id}`}
                      >
                        <input
                          id={`Checkbox-${selectedCollection.id}`}
                          type="checkbox"
                          checked={collectionActive}
                          onChange={this.handleToggleAll}
                        />
                        <span className="label">
                          Active
                        </span>
                      </label>
                    </div>
                    <div
                      style={{ flex: 'auto', marginLeft: 24, marginRight: 12, }}
                    >
                      <strong>
                        Description
                      </strong>
                    </div>
                    <div
                      style={{ flexShrink: 0, }}
                    >
                      <div style={{ width: 200, }}>
                        <strong>
                          Response
                        </strong>
                      </div>
                    </div>
                  </div>
                  {
                    endpoints.map(endpoint => (
                      <div
                        style={{
                          marginTop: 6,
                          marginBottom: 6,
                        }}
                        key={endpoint.id}
                      >
                        <Endpoint
                          id={endpoint.id}
                          name={endpoint.name}
                          options={endpoint.response}
                          active
                          onChange={(e) => { this.updateEndpointActive(e, endpoint) }}
                        />
                      </div>
                    ))
                  }
                </div>
              </section>
            )
          }
        </div>
      </div>
    )
  }
}

Configurations.defaultProps = {
  selectedEnvironment: null,
  selectedCollection: null,
  selectedConfiguration: null,
  setCollectionStatus: null,
  loadCollectionChildren: null,
  goBack: null,
  push: null,
  match: null,
}

Configurations.propTypes = {
  selectedEnvironment: shape(),
  selectedCollection: shape(),
  selectedConfiguration: shape(),
  setCollectionStatus: func,
  loadCollectionChildren: func,
  goBack: func,
  push: func,
  match: shape(),
}

const mapStateToProps = ({ configuration, environment, }, { match, }) => {
  if (!match.params.path) {
    return {
      ...configuration,
      ...environment,
    }
  }

  const [
    configurationId = null,
    ...pathArray
  ] = match.params.path.split('/')

  if (configurationId === null) {
    return {
      ...configuration,
      ...environment,
    }
  }

  const { configurations, } = configuration
  const [
    selectedConfiguration = null,
  ] = configurations.filter(c => c.id === configurationId)

  if (selectedConfiguration === null) {
    return configuration
  }

  const selectedCollection = retrieveCollectionFromPath(selectedConfiguration, ...pathArray)

  return {
    ...configuration,
    ...environment,
    selectedConfiguration,
    selectedCollection,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  goBack: actionGoBack,
  push: actionPush,
  loadCollectionChildren: actionLoadCollectionChildren,
  setCollectionStatus: actionSetCollectionStatus,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Configurations)
