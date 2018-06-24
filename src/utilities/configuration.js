function getConfigurationIdFromUrl(url) {
  // this should change depending on how the prefix is defined in the routes
  const delimiter = '/'
  const prefix = `${delimiter}configurations${delimiter}`

  if (url.indexOf(prefix) !== 0) {
    return null
  }
  let id = url.slice(prefix.length)
  if (id.includes(delimiter)) {
    id = id.slice(0, id.indexOf(delimiter))
  }

  if (id.length < 1) {
    return null
  }
  return id
}

// eslint-disable-next-line import/prefer-default-export
export { getConfigurationIdFromUrl, }
