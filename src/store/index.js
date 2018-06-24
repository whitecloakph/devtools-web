import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux'
import { connectRouter, routerMiddleware, } from 'connected-react-router'
import configuration from './configuration'
import collection from './collection'

import HISTORY from '../history'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const MIDDLEWARE = [
  routerMiddleware(HISTORY),
]

const ROOT_REDUCER = combineReducers({
  configuration,
  collection,
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
