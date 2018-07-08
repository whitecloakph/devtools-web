import React from 'react'
import { arrayOf, shape, func, } from 'prop-types'
import { NavLink as RouterLink, } from 'react-router-dom'
import { connect, } from 'react-redux'
import { goBack as actionGoBack, } from 'connected-react-router'
import { bindActionCreators, } from 'redux'

import {
  clearConfigurations as actionClearConfigurations,
  removeConfiguration as actionRemoveConfiguration,
} from '../../store/configuration'

function Sidebar({
  configurations,
  clearConfigurations,
  removeConfiguration,
}) {
  return (
    <div
      className="sidebar"
    >
      <div
        className="toolbar"
        style={{ padding: 4, }}
      >
        <button
          type="button"
          onClick={clearConfigurations}
          disabled={configurations.length < 1}
        >
          Clear
        </button>
      </div>
      <div style={{ flex: 'auto', position: 'relative', }}>
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            overflowY: 'auto',
          }}
        >
          <nav>
            <div>
              <RouterLink
                to="/"
                style={{
                  display: 'block',
                }}
                className="nav"
                isActive={(match, location) => location.pathname === '/'}
              >
                Configurations
              </RouterLink>
            </div>
            {
              configurations && configurations.length > 0
              && (
                <div className="configuration-list">
                  {
                    configurations.map(configuration => (
                      <RouterLink
                        key={configuration.id}
                        to={`/configurations/browse/${configuration.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        className="nav"
                      >
                        <div
                          style={{
                            flexShrink: 1,
                            flexGrow: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          <strong>
                            { configuration.name }
                          </strong>
                          <br />
                          <small
                            style={{
                              whiteSpace: 'nowrap',
                              width: '100%',
                            }}
                          >
                            { configuration.apiKey }
                          </small>
                        </div>
                        <div style={{ marginLeft: 12, }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              removeConfiguration(configuration)
                              e.stopPropagation()
                            }}
                          >
                            Del
                          </button>
                        </div>
                      </RouterLink>
                    ))
                  }
                </div>
              )
            }
          </nav>
        </div>
      </div>
    </div>
  )
}

Sidebar.defaultProps = {
  configurations: null,
  clearConfigurations: null,
  removeConfiguration: null,
}

Sidebar.propTypes = {
  configurations: arrayOf(shape()),
  clearConfigurations: func,
  removeConfiguration: func,
}

const mapStateToProps = ({ configuration, router, }) => ({
  ...configuration,
  ...router,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  clearConfigurations: actionClearConfigurations,
  goBack: actionGoBack,
  removeConfiguration: actionRemoveConfiguration,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
