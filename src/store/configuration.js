import { generateId, } from '../utilities/id'
import { getConfigurationIdFromUrl, } from '../utilities/configuration'
import debug from '../utilities/debug'

function constructInitialState({ hasConfigurations, }) {
  const INITIAL_STATE = {
    configurations: [],
    selectedConfiguration: null,
    lastSelectedConfiguration: null,
  }

  if (hasConfigurations) {
    INITIAL_STATE.configurations = [
      {
        id: '0123456789abcdef',
        name: 'cbmb',
        apiKey: '031d7aca0b764811b85b822eb9b2008a',
      },
    ]
  }

  return INITIAL_STATE
}

const INITIAL_STATE = constructInitialState(debug)

function addConfiguration(configuration) {
  return {
    type: 'configuration.addConfiguration',
    payload: {
      configuration: {
        ...configuration,
        id: generateId(), // TODO change this to unique ID
      },
    },
  }
}

function clearConfigurationList() {
  return {
    type: 'configuration.clearConfigurationList',
  }
}

function loadCollectionEndpoints(collection, endpoints) {
  return {
    type: 'configuration.loadCollectionEndpoints',
    payload: {
      collection,
      endpoints,
    },
  }
}

function getLoadCollectionEndpointsFlux(state, payload) {
  const configurations = state.configurations.map(conf => ({
    ...conf,
    collections: conf.collections.map((coll) => {
      if (coll.id !== payload.collection.id) {
        return coll
      }

      return {
        ...coll,
        endpoints: payload.endpoints,
      }
    }),
  }))

  let selectedConfiguration
  if (state.selectedConfiguration) {
    selectedConfiguration = configurations.filter(c => c.id === state.selectedConfiguration.id)
    if (selectedConfiguration) {
      [selectedConfiguration, ] = selectedConfiguration
    } else {
      selectedConfiguration = null
    }
  }

  return {
    configurations,
    selectedConfiguration,
  }
}

function getRouterLocationChangeFlux(state, payload) {
  const configurationId = getConfigurationIdFromUrl(payload.location.pathname)
  let selectedConfiguration = state.configurations.filter(c => c.id === configurationId)
  if (selectedConfiguration.length > 0) {
    [selectedConfiguration, ] = selectedConfiguration
  } else {
    selectedConfiguration = null
  }

  return {
    selectedConfiguration,
  }
}

function reducer(state = INITIAL_STATE, { type, payload, }) {
  let flux

  switch (type) {
    case 'configuration.addConfiguration':
      flux = {
        configurations: [
          ...state.configurations,
          payload.configuration,
        ],
      }
      break
    case 'configuration.clearConfigurationList':
      flux = {
        configurations: [],
      }
      break
    case 'configuration.loadCollectionEndpoints':
      flux = getLoadCollectionEndpointsFlux(state, payload)
      break
    case '@@router/LOCATION_CHANGE':
      flux = getRouterLocationChangeFlux(state, payload)
      break
    default:
      flux = {}
      break
  }

  return { ...state, ...flux, }
}

export {
  addConfiguration,
  clearConfigurationList,
  loadCollectionEndpoints,
}
export default reducer
