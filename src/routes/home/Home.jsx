import React from 'react'
import autoBind from 'react-autobind'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import { shape, func, } from 'prop-types'
import { push as actionPush, } from 'connected-react-router'

import { getRootCollections, } from '../../services/Collection'

import AddConfigurationForm from './components/AddConfigurationForm'

import {
  addConfiguration as actionAddConfiguration,
} from '../../store/configuration'

class Home extends React.Component {
  constructor() {
    super()
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

  submitForm(values) {
    const { addConfiguration, } = this.props

    this.setState({
      isAddingConfiguration: true,
    })
    getRootCollections({ apiKey: values.apiKey, })
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

  render() {
    const { isAddingConfiguration, } = this.state

    return (
      <div style={{ padding: '0 16px', margin: '16px 0', }}>
        <h1>
          Configurations
        </h1>
        <p>
          Please input the details of your API below.
        </p>
        <AddConfigurationForm
          onSubmit={this.submitForm}
          disabled={isAddingConfiguration}
        />
      </div>
    )
  }
}

Home.defaultProps = {
  selectedConfiguration: null,
  addConfiguration: null,
  push: null,
}

Home.propTypes = {
  selectedConfiguration: shape(),
  addConfiguration: func,
  push: func,
}

const mapStateToProps = ({ configuration, }) => ({
  ...configuration,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addConfiguration: actionAddConfiguration,
  push: actionPush,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
