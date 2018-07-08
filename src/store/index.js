import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux'
import { connectRouter, routerMiddleware, } from 'connected-react-router'
import environment from './environment'
import configuration from './configuration'

import HISTORY from '../history'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const MIDDLEWARE = [
  routerMiddleware(HISTORY),
]

const ROOT_REDUCER = combineReducers({
  configuration,
  environment,
})

const STORE = createStore(
  connectRouter(HISTORY)(ROOT_REDUCER),
  composeEnhancers(
    applyMiddleware(
      ...MIDDLEWARE
    )
  )
)

export default STORE
