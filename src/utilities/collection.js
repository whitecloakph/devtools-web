import { compileTemplateString, } from './environment'

function retrieveCollectionFromPath(parent, ...idPaths) {
  if (!parent) {
    return null
  }

  const [
    currentLevelIdPath = null,
    ...restIdPaths
  ] = idPaths

  if (currentLevelIdPath === null) {
    return parent
  }

  const [
    currentCollection = null,
  ] = parent.children.filter(child => (child.id === currentLevelIdPath))

  if (currentCollection !== null && restIdPaths.length > 0) {
    return retrieveCollectionFromPath(currentCollection, ...restIdPaths)
  }

  return currentCollection
}

function isCollection({ name, children, }) {
  return (
    typeof name === 'string'
    && children instanceof Array
  )
}

function isEndpoint({ name, request, response, }) {
  return (
    typeof name === 'string'
    && !!request
    && !!response
  )
}

export {
  isCollection,
  isEndpoint,
  formatItem,
  retrieveCollectionFromPath,
}
