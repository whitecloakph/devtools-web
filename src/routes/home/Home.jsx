import React from 'react'
import autoBind from 'react-autobind'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import { arrayOf, shape, func, } from 'prop-types'
import { push as actionPush, } from 'connected-react-router'
import { Link as RouterLink, } from 'react-router-dom'
import SplitPane from 'react-split-pane'

import axios from '../../axios'

import {
  addConfiguration as actionAddConfiguration,
  clearConfigurationList as actionClearConfigurationList,
} from '../../store/configuration'

class Home extends React.Component {
  constructor() {
    super()
    this.addConfigurationForm = null
    this.state = {
      isAddingConfiguration: false,
    }
    autoBind(this)
  }

  componentWillReceiveProps({ selectedConfiguration, push, }) {
    if (selectedConfiguration) {
      push(`/configurations/${selectedConfiguration.id}`)
    }
  }

  setAddConfigurationForm(el) {
    this.addConfigurationForm = el
  }

  submitForm() {
    const values = this.addConfigurationForm.props.form.getFieldsValue()
    const { addConfiguration, } = this.props

    this.setState({
      isAddingConfiguration: true,
    })
    axios({
      method: 'get',
      url: '/collections',
      headers: {
        'X-Api-Key': values.apiKey,
      },
    })
      .then(
        (res) => {
          addConfiguration({
            name: values.name,
            apiKey: values.apiKey,
            collections: res.data.collections,
          })
          this.setState({
            isAddingConfiguration: false,
          })
        },
        () => {
          this.setState({
            isAddingConfiguration: false,
          })
        },
      )
  }

  // confirmClearConfigurationList() {
  //   const { clearConfigurationList, } = this.props
  //   Modal.confirm({
  //     title: 'Clear Configuration List',
  //     content: 'Are you sure you want to clear the configuration list?',
  //     onOk() {
  //       clearConfigurationList()
  //     },
  //     onCancel() {},
  //   })
  // }

  render() {
    const { configurations, } = this.props
    const { isAddingConfiguration, } = this.state

    return (
      <SplitPane
        split="vertical"
        minSize={200}
      >
        <div
          style={{ position: 'relative', height: '100%', }}
        >
          <SplitPane
            split="horizontal"
            defaultSize={84}
          >
            <div>
              <div style={{ padding: 16, }}>
                <button type="button">
                  Clear Configurations
                </button>
              </div>
            </div>
            <div>
              <RouterLink
                to="/"
              >
                Configurations
              </RouterLink>
              <hr />
              <RouterLink>
                
              </RouterLink>
            </div>
          </SplitPane>
        </div>
        <div>
          A
        </div>
      </SplitPane>
    )
  }
}

Home.defaultProps = {
  configurations: [],
  selectedConfiguration: null,
  addConfiguration: null,
  clearConfigurationList: null,
  push: null,
}

Home.propTypes = {
  configurations: arrayOf(shape()),
  selectedConfiguration: shape(),
  addConfiguration: func,
  clearConfigurationList: func,
  push: func,
}

const mapStateToProps = ({ configuration, }) => ({
  ...configuration,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addConfiguration: actionAddConfiguration,
  clearConfigurationList: actionClearConfigurationList,
  push: actionPush,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
