import formatPostmanItem from './format/postman'

function formatItem(rawData, options) {
  const format = 'POSTMAN'
  switch (format) {
    case 'POSTMAN':
      return formatPostmanItem(rawData, options)
    default:
      break
  }
  return rawData
}

export {
// eslint-disable-next-line import/prefer-default-export
  formatItem,
}
