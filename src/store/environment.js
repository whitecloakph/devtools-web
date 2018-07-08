const INITIAL_STATE = {
  environments: [],
  selectedEnvironment: null,
}

function loadEnvironments(environments) {
  return {
    type: 'environment.loadEnvironments',
    payload: {
      environments,
    },
  }
}

function selectEnvironment(environment) {
  return {
    type: 'environment.selectEnvironment',
    payload: {
      environment,
    },
  }
}

function addEnvironment(environment) {
  return {
    type: 'environment.addEnvironment',
    payload: {
      environment,
    },
  }
}

function updateEnvironment(environment) {
  return {
    type: 'environment.updateEnvironment',
    payload: {
      environment,
    },
  }
}

function removeEnvironment(environment) {
  return {
    type: 'environment.removeEnvironment',
    payload: {
      environment,
    },
  }
}

function clearEnvironments() {
  return {
    type: 'environment.clearEnvironments',
  }
}

function reducer(state = INITIAL_STATE, { type, payload, }) {
  switch (type) {
    case 'environment.loadEnvironments':
      return {
        ...state,
        environments: payload.environments,
      }
    case 'environment.selectEnvironment':
      return {
        ...state,
        selectedEnvironment: payload.environment,
      }
    case 'environment.addEnvironment':
      return {
        ...state,
        environments: [
          state.environments,
          payload.environment,
        ],
      }
    case 'environment.updateEnvironment':
      return {
        ...state,
        environments: state.environments.map(environment => (
          environment.id === payload.environment.id ? payload.environment : environment
        )),
      }
    case 'environment.removeEnvironment':
      return {
        ...state,
        environments: state.environments.filter(environment => (
          environment.id !== payload.environment.id
        )),
      }
    case 'environment.clearEnvironments':
      return {
        ...state,
        environments: [],
      }
    default:
      break
  }
  return state
}

export {
  loadEnvironments,
  selectEnvironment,
  addEnvironment,
  updateEnvironment,
  clearEnvironments,
  removeEnvironment,
}
export default reducer
