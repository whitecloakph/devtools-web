import React from 'react'
import { ConnectedRouter, } from 'connected-react-router'
import { Route, } from 'react-router'
import { Provider, } from 'react-redux'
import SplitPane from 'react-split-pane'
import Sidebar from './components/Sidebar'
import { ThemeProvider, } from 'styled-components'

import Home from './routes/home'
//import Configurations from './routes/configurations'

import './devtools.scss'

import STORE from './store'
import HISTORY from './history'

function App() {
  return (
    <Provider store={STORE}>
      <ThemeProvider theme={{ browser: 'firefox', }}>
        <ConnectedRouter history={HISTORY}>
          <SplitPane
            split="vertical"
            minSize={200}
          >
            <div style={{ height: '100%', }}>
              <Sidebar />
            </div>
            <div>
              <Route
                exact
                path="/"
                component={Home}
              />
              {/*<Route*/}
              {/*path="/configurations/:id"*/}
              {/*component={Configurations}*/}
              {/*/>*/}
            </div>
          </SplitPane>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
