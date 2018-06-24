import React from 'react'
import axios from 'axios'
import autoBind from 'react-autobind'
import { shape, func, } from 'prop-types'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import { goBack as actionGoBack, } from 'connected-react-router'
import {
  loadCollectionEndpoints as actionLoadCollectionEndpoints,
} from '../../store/configuration'

import axiosInstance from '../../axios'

import CollectionGroup from './components/CollectionGroup'

class Configurations extends React.Component {
  constructor() {
    super()
    autoBind(this)
  }

  componentDidMount() {
    const { selectedConfiguration, goBack, loadCollectionEndpoints, } = this.props

    if (!selectedConfiguration) {
      goBack()
      return
    }

    axios.all(
      selectedConfiguration.collections.map(({ id, }) => axiosInstance({
        method: 'get',
        url: `/collections/${id}`,
        headers: { 'X-Api-Key': selectedConfiguration.apiKey, },
      }))
    )
      .then(axios.spread((...res) => {
        res.forEach((r) => {
          loadCollectionEndpoints(
            // eslint-disable-next-line no-underscore-dangle
            { id: r.data.collection.info._postman_id, },
            r.data.collection.item.map(({ _postman_id: id, ...endpoint }) => ({
              id, ...endpoint, active: true, // todo save active state of endpoint in storage
            }))
          )
        })
      }))
  }

  render() {
    const { selectedConfiguration, } = this.props

    if (!selectedConfiguration) {
      return (
        <div>
          No endpoints loaded.
        </div>
      )
    }

    return (
      <React.Fragment>
        <CollectionGroup collections={selectedConfiguration.collections} />
      </React.Fragment>
    )
  }
}

Configurations.defaultProps = {
  selectedConfiguration: null,
  goBack: null,
  loadCollectionEndpoints: null,
}

Configurations.propTypes = {
  selectedConfiguration: shape(),
  goBack: func,
  loadCollectionEndpoints: func,
}

const mapStateToProps = ({ configuration, }) => ({
  ...configuration,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  goBack: actionGoBack,
  loadCollectionEndpoints: actionLoadCollectionEndpoints,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Configurations)
