const INITIAL_STATE = {
  configurations: [],
  environments: [],
}

function addConfiguration(configuration) {
  return {
    type: 'configuration.addConfiguration',
    payload: {
      configuration,
    },
  }
}

function updateConfiguration(configuration) {
  return {
    type: 'configuration.updateConfiguration',
    payload: {
      configuration,
    },
  }
}

function clearConfigurations() {
  return {
    type: 'configuration.clearConfigurations',
  }
}

function removeConfiguration(configuration) {
  return {
    type: 'configuration.removeConfiguration',
    payload: {
      configuration,
    },
  }
}

function setCollectionStatus(collection, status) {
  return {
    type: 'configuration.setCollectionStatus',
    payload: {
      collection,
      status,
    },
  }
}

function loadCollectionChildren(collection, children) {
  return {
    type: 'configuration.loadCollectionChildren',
    payload: {
      collection,
      children,
    },
  }
}

function getLoadCollectionChildrenNewState(parent, payload) {
  // TODO optimize so the app need not walk other configurations
  const { collection, children, } = payload

  if (parent.id === collection.id) {
    return {
      ...parent,
      children: children.children,
    }
  }

  if (parent.children) {
    return {
      ...parent,
      children: parent.children.map(
        c => getLoadCollectionChildrenNewState(c, payload)
      ),
    }
  }

  return parent
}

function getSetCollectionStatusNewState(parent, payload) {
  const { collection, status, } = payload

  if (parent.id === collection.id) {
    return {
      ...parent,
      status,
    }
  }

  if (parent.children) {
    return {
      ...parent,
      children: parent.children.map(
        c => getSetCollectionStatusNewState(c, payload)
      ),
    }
  }

  return parent
}

function getSetEndpointStatusNewState(parent, payload) {
  if (parent.children) {
    return {
      ...parent,
      children: parent.children.map(
        c => getSetCollectionStatusNewState(c, payload)
      ),
    }
  }

  return parent
}

function reducer(state = INITIAL_STATE, { type, payload, }) {
  switch (type) {
    case 'configuration.addConfiguration':
      return {
        ...state,
        configurations: [
          ...state.configurations,
          payload.configuration,
        ],
      }
    case 'configuration.updateConfiguration':
      return {
        ...state,
        configurations: state.configurations.map(configuration => (
          configuration.id === payload.configuration.id ? payload.configuration : configuration
        )),
      }
    case 'configuration.clearConfigurations':
      return {
        ...state,
        configurations: [],
      }
    case 'configuration.removeConfiguration':
      return {
        ...state,
        configurations: state.configurations.filter(configuration => (
          configuration.id !== payload.configuration.id
        )),
      }
    case 'configuration.setCollectionStatus':
      return {
        ...state,
        configurations: state.configurations.map(
          configuration => getSetCollectionStatusNewState(configuration, payload)
        ),
      }
    case 'configuration.loadCollectionChildren':
      return {
        ...state,
        configurations: state.configurations.map(
          configuration => getLoadCollectionChildrenNewState(configuration, payload)
        ),
      }
    case 'configuration.setEndpointStatus':
      return {
        ...state,
        configurations: state.configuratios.map(
          configuration => getSetEndpointStatusNewState(configuration, payload)
        ),
      }
    default:
      break
  }

  return state
}

const STATUS_DEFAULT = Symbol('configuration.STATUS_DEFAULT')
const STATUS_PENDING = Symbol('configuration.STATUS_PENDING')
const STATUS_SUCCESS = Symbol('configuration.STATUS_SUCCESS')
const STATUS_PARTIAL = Symbol('configuration.STATUS_PARTIAL')
const STATUS_FAILURE = Symbol('configuration.STATUS_FAILURE')

export {
  addConfiguration,
  updateConfiguration,
  clearConfigurations,
  removeConfiguration,
  setCollectionStatus,
  loadCollectionChildren,
  STATUS_DEFAULT,
  STATUS_PENDING,
  STATUS_SUCCESS,
  STATUS_PARTIAL,
  STATUS_FAILURE,
}
export default reducer
