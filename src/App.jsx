import React from 'react'
import autoBind from 'react-autobind'
import axios from 'axios'

import CredentialsForm from './components/CredentialsForm'
import CollectionsForm from './components/CollectionsForm'

const HOST = 'http://localhost:7890'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      collection: null,
      endpoints: null,
      endpointsLoading: false,
      collections: null,
      collectionsLoading: false,
      apiKey: '',
    }
    autoBind(this)
  }

  setCredentials({ apiKey }) {
    this.setState(
      {
        collectionsLoading: true,
      },
      () => {
        axios({
          method: 'get',
          url: `${HOST}/collections`,
          headers: {
            'X-Api-Key': apiKey,
          },
        })
          .then(
            res => {
              this.setState({
                apiKey,
                collections: res.data.collections,
                collectionsLoading: false,
              })
            }
          )
      }
    )
  }

  setCollection({ collection }) {
    let { apiKey } = this.state
    this.setState(
      {
        collection,
        endpointsLoading: true,
      },
      () => {
        axios({
          method: 'get',
          url: `${HOST}/collections/${collection}`,
          headers: {
            'X-Api-Key': apiKey,
          },
        })
          .then(
            res => {
              this.setState({
                endpointsLoading: false,
                endpoints: res.data,
              })
            }
          )
      }
    )
  }

  render() {
    const {
      endpointsLoading,
      endpoints,
      collections,
      collectionsLoading,
    } = this.state

    const noApiKey = !!collections
    const noCollection = !!(collections && endpoints)

    console.log(noApiKey, noCollection)

    return (
      <div className="mt-3 mb-1">
        <div className="container-fluid">
          <section hidden={noApiKey}>
            <CredentialsForm
              onSubmit={this.setCredentials}
            />
            {
              collectionsLoading
              && (
                <span>
                  Loading collections...
                </span>
              )
            }
            {
              !(collections || collectionsLoading)
              && (
                <span>
                  No collections loaded.
                </span>
              )
            }
          </section>
          {
            collections
            && (
              <section>
                <CollectionsForm
                  onSubmit={this.setCollection}
                  collections={collections.map(({ id, name }) => ({ label: name, value: id }))}
                />
              </section>
            )
          }
        </div>
      </div>
    )
  }
}

export default App
