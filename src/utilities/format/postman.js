import { compileTemplateString, } from '../environment'

function getPostmanItemActive(item, options) {
  const { settings, } = options
  // eslint-disable-next-line no-underscore-dangle
  const { _postman_id: id, } = item

  if (!settings || typeof settings[id] === 'undefined') {
    return true
  }
  return settings[id]
}

function formatPostmanItem(item, options) {
  if (item.collection) {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: item.collection.info._postman_id,
      name: item.collection.info.name,
      children: item.collection.item.map(i => formatPostmanItem(i, options)),
    }
  }

  if (item.item instanceof Array) {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: item._postman_id,
      name: item.name,
      children: item.item.map(i => formatPostmanItem(i, options)),
    }
  }

  const { environment, } = options
  // eslint-disable-next-line no-underscore-dangle
  const { _postman_id: id, name, } = item
  const active = getPostmanItemActive(item, options)

  return {
    id,
    name,
    active, // todo save active state of endpoint in storage
    request: {
      method: item.request.method,
      header: item.request.header.map(({ key, value, }) => ({
        key,
        value: compileTemplateString(value)(environment),
      })),
    },
    response: item.response,
  }
}

export default formatPostmanItem
