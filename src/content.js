import axios from 'axios'

import { getPlatform, } from './utilities/platform'

function contentScript(root, platform) {
  platform.runtime.onMessage.addListener((message) => {
    const { type, payload, } = message

    switch (type) {
      case 'kartero.updateClient':
        // eslint-disable-next-line no-underscore-dangle,no-param-reassign
        root.__KARTERO_CLIENT__ = axios.create({ // todo specify options
        })
        break
      default:
        break
    }
  })
}

getPlatform(this)
  .then((browser) => { contentScript(this, browser) })
