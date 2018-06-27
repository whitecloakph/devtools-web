import React from 'react'
import { ConnectedRouter, } from 'connected-react-router'
import { Route, } from 'react-router'
import { Provider, } from 'react-redux'

import Home from './routes/home'
//import Configurations from './routes/configurations'

import STORE from './store'
import HISTORY from './history'

function App() {
  return (
    <Provider store={STORE}>
      <ConnectedRouter history={HISTORY}>
        <React.Fragment>
          <Route
            exact
            path="/"
            component={Home}
          />
          {/*<Route*/}
            {/*path="/configurations/:id"*/}
            {/*component={Configurations}*/}
          {/*/>*/}
        </React.Fragment>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
