/* eslint-disable no-param-reassign */
import { getPlatform, } from './utilities/platform'

const connections = {}

getPlatform(this)
  .then((browser) => {
    function connect(port, tabId) {
      const { name, } = port
      if (!connections[name]) {
        connections[name] = {
          port,
          tabIds: [],
        }
      }

      if (connections[name].tabIds.includes(tabId)) {
        return
      }

      browser.tabs.executeScript(
        tabId,
        { file: 'content.js', },
      )
    }

    function dispatch(port, event) {
      const { name, } = port
      if (!connections[name]) {
        return
      }

      connections[name].tabIds.forEach((tabId) => {
        browser.tabs.sendMessage(tabId, event)
      })
    }

    browser.runtime.onConnect.addListener((port) => {
      const { name, } = port

      if (name !== 'kartero') {
        return
      }

      const outwardListener = (event) => {
        switch (event.type) {
          case 'kartero.connect':
            connect(port, event.payload.tabId)
            return
          default:
            break
        }
        dispatch(port, event)
      }

      const inwardListener = (request, sender) => {
        if (sender.tab) {
          Object
            .keys(connections)
            .filter(portName => connections[portName].tabIds.includes(sender.tab.id))
            .forEach(portName => connections[portName].port.postMessage(request))
        }
      }

      port.onMessage.addListener(outwardListener)
      browser.runtime.onMessage.addListener(inwardListener)

      port.onDisconnect.addListener(() => {
        browser.runtime.onMessage.removeListener(inwardListener)
        port.onMessage.removeListener(outwardListener)
        delete connections[name]
      })
    })
  })
