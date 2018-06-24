import debug from '../utilities/debug'

function constructInitialState({ hasConfigurations, }) {
  const INITIAL_STATE = {
    collections: null,
    selectedCollection: null,
  }

  if (hasConfigurations) {
    INITIAL_STATE.collections = [
      {
        id: '0123456789abcdef',
        collections: [
          {
            id: '15f1bfac-27f3-40c0-920f-d772d3d7bf06',
            name: 'Mock',
          }, {
            id: '36b7dc03-bd3d-4fba-88c0-ebafed31416b',
            name: 'Test',
          }, {
            id: '645ca016-d9e0-4c8f-baa3-a2d3dce18bf7',
            name: 'Core',
          }, {
            id: '8658c2f9-74e0-4876-9156-fb56be2b06d4',
            name: 'Admin',
          }, {
            id: '908ab73e-5aec-481d-ad67-664c5c381b21',
            name: 'Bluemix',
          }, {
            id: 'ea2c6b83-423d-4904-ab6d-27f1f0c0c25f',
            name: 'BackOffice',
          },
        ],
      },
    ]
  }

  return INITIAL_STATE
}

const INITIAL_STATE = constructInitialState(debug)

function selectCollection(collection) {
  return {
    type: 'collection.selectCollection',
    payload: {
      collection,
    },
  }
}

function loadCollectionEndpoints(collection, endpoints) {
  return {
    type: 'collection.loadCollectionEndpoints',
    payload: {
      collection,
      endpoints,
    },
  }
}

function reducer(state = INITIAL_STATE, { type, payload, }) {
  const flux = {}
  const collections = state.collections || []

  switch (type) {
    case 'collection.selectCollection':
      flux.selectedCollection = payload.collection
      break
    case 'collection.loadCollectionEndpoints':
      flux.collections = collections.map(c => (
        c.id === payload.collection.id
          ? { ...c, endpoints: payload.endpoints, }
          : c
      ))
      break
    default:
      break
  }

  return { ...state, ...flux, }
}

export {
  selectCollection,
  loadCollectionEndpoints,
}
export default reducer
