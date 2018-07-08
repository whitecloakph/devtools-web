import React from 'react'
import autoBind from 'react-autobind'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import { arrayOf, shape, func, } from 'prop-types'
import { push as actionPush, } from 'connected-react-router'

import { getRootCollections, } from '../../services/Collection'
import { generateId, } from '../../utilities/id'

import AddConfigurationForm from './components/AddConfigurationForm'

import {
  addConfiguration as actionAddConfiguration,
  STATUS_DEFAULT,
} from '../../store/configuration'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      isAddingConfiguration: false,
    }
    autoBind(this)
  }

  viewConfiguration(id) {
    const { push, } = this.props

    push(`/configurations/browse/${id}`)
  }

  submitForm(values) {
    const { addConfiguration, configurations, } = this.props

    this.setState({
      isAddingConfiguration: true,
    })

    getRootCollections({ apiKey: values.apiKey, })
      .then(
        (res) => {
          const id = generateId()
          addConfiguration({
            id,
            name: values.name,
            apiKey: values.apiKey,
            children: res.data.collections,
            status: STATUS_DEFAULT,
          })
          this.setState({
            isAddingConfiguration: false,
          }, () => {
            if (configurations.length < 2) {
              this.viewConfiguration(id)
            }
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
  addConfiguration: null,
  configurations: [],
  push: null,
}

Home.propTypes = {
  addConfiguration: func,
  configurations: arrayOf(shape()),
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
