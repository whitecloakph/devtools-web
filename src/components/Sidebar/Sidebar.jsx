import React from 'react'
import { Link as RouterLink, } from 'react-router-dom'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'

import {
  clearConfigurationList as actionClearConfigurationList,
} from '../../store/configuration'

function Sidebar({
  configurations,
  clearConfigurationList,
}) {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: 4, borderBottom: '1px solid', }}>
        <button
          type="button"
          onClick={clearConfigurationList}
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
                  padding: 16,
                }}
              >
                Configurations
              </RouterLink>
            </div>
            {
              configurations && configurations.length > 0
              && (
                <div style={{ borderTop: '1px solid', }}>
                  {
                    configurations.map(configuration => (
                      <RouterLink
                        to={`/configurations/${configuration.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 16,
                        }}
                      >
                        <div>
                          <strong>
                            cbmb
                          </strong>
                          <br />
                          <small>
                            2345f09b7234a5d0
                          </small>
                        </div>
                        <div>
                          <button type="button">
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

const mapStateToProps = ({ configuration, }) => ({
  ...configuration,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  clearConfigurationList: actionClearConfigurationList,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
