import React from 'react'
import ReactDOM from 'react-dom'
import { detect, } from 'detect-browser'

import App from './App'
import { getPlatform, } from './utilities/platform'

import './devtools.scss'

const PANEL_INFO = { name: 'Kartero', icon: 'icon.png', }

function createDevToolsInstance(browser, { name, icon, }) {
  const { tabId, } = browser.devtools.inspectedWindow
  const port = browser.runtime.connect({
    name: 'kartero',
  })

  this.sendMessage = (type, payload) => {
    port.postMessage({
      tabId,
      type,
      payload,
    })
  }

  // TODO expose tabId?

  return new Promise((resolve) => {
    browser.devtools.panels.create(
      name,
      icon,
      'devtools.html',
      () => {
        this.sendMessage('kartero.connect')
        resolve(this)
      }
    )
  })
}

getPlatform(this)
  .then((browser) => {
    createDevToolsInstance(browser, PANEL_INFO)
      .then((devTools) => {
        const { name: browserName, version: browserVersion, ...props } = detect()
        const MOUNT_NODE = window.document.getElementById('root')
        ReactDOM
          .render(
            React.createElement(
              App,
              {
                ...props,
                browser: browserName,
                browserVersion,
                devTools,
                theme: 'light',
                id: this.tabId,
              }
            ),
            MOUNT_NODE,
          )
      })
  })
