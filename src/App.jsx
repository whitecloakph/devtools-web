import React from 'react'
import { string, } from 'prop-types'
import { ConnectedRouter, } from 'connected-react-router'
import { Route, Switch, } from 'react-router'
import { Provider, } from 'react-redux'
import SplitPane from 'react-split-pane'
import { ThemeProvider, } from 'styled-components'

import Sidebar from './components/Sidebar'

import Home from './routes/home'
import Configurations from './routes/configurations'

import STORE from './store'
import HISTORY from './history'

function updateDocument(props) {
  const {
    browser,
    os,
    version,
    theme,
    id,
  } = props
  window.document.documentElement.dataset.browser = browser
  window.document.documentElement.dataset.os = os
  window.document.documentElement.dataset.version = version
  window.document.documentElement.dataset.theme = theme
  window.document.documentElement.dataset.tabId = id
}

class App extends React.Component {
  componentDidMount() {
    updateDocument(this.props)
  }

  componentWillReceiveProps(nextProps) {
    updateDocument(nextProps)
  }

  render() {
    const {
      browser,
      os,
      version,
      theme,
    } = this.props
    return (
      <Provider store={STORE}>
        <ThemeProvider
          theme={{
            browser,
            os,
            version,
            theme,
          }}
        >
          <ConnectedRouter history={HISTORY}>
            <SplitPane
              split="vertical"
              minSize={200}
            >
              <div style={{ height: '100%', }}>
                <Sidebar />
              </div>
              <div style={{ height: '100%', }}>
                <Switch>
                  <Route
                    exact
                    strict
                    path="/"
                    component={Home}
                  />
                  <Route
                    path="/configurations/edit/:path*"
                    render={() => (
                      <div>
                        Edit
                      </div>
                    )}
                  />
                  <Route
                    path="/configurations/browse/:path*"
                    component={Configurations}
                  />
                </Switch>
              </div>
            </SplitPane>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    )
  }
}

App.defaultProps = {
  browser: null,
  os: null,
  version: null,
  theme: null,
}

App.propTypes = {
  browser: string,
  os: string,
  version: string,
  theme: string,
}

export default App
