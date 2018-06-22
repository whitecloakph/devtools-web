import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './devtools.scss'

function createDummyCollection() {
  let collections = []

  for (let i = 1; i <= 15; i++) {
    let newCollection = {
      name: `Collection ${i}`,
      endpoints: [],
    }

    let endpointsCount = Math.floor(Math.random() * 4) + 1

    for (let j = 1; j <= endpointsCount; j++) {
      let newEndpoint = {
        name: `Endpoint ${j}`,
        options: [
          {
            name: '200'
          },
          {
            name: '202 (otp)'
          },
          {
            name: '400'
          },
          {
            name: '404'
          },
        ]
      }

      newCollection.endpoints.push(newEndpoint)
    }

    collections.push(newCollection)
  }

  return collections
}

ReactDOM
  .render(
    React.createElement(App),
    window.document.getElementById('root')
  )

if (chrome.devtools) {
  chrome.devtools.panels.create(
    "DevTools",
    "icon.png",
    "devtools.html",
    (panel) => {
    }
  )
}
