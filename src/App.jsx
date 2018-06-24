import React from 'react'
import { ConnectedRouter, } from 'connected-react-router'
import { Route, } from 'react-router'
import { Provider, } from 'react-redux'
import { LocaleProvider, } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import Home from './routes/home'
import Configurations from './routes/configurations'

import STORE from './store'
import HISTORY from './history'

function App() {
  return (
    <Provider store={STORE}>
      <LocaleProvider locale={enUS}>
        <ConnectedRouter history={HISTORY}>
          <div className="mt-3 mb-1">
            <div className="container-fluid">
              <Route
                exact
                path="/"
                component={Home}
              />
              <Route
                path="/configurations/:id"
                component={Configurations}
              />
            </div>
          </div>
        </ConnectedRouter>
      </LocaleProvider>
    </Provider>
  )
}

export default App
