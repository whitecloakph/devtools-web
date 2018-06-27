import url from 'nanoid/url'
import generate from 'nanoid/generate'

function generateId() {
  return generate(url, 16)
}

function generateFieldDOMId(prefix) {
  return `${prefix}-${generate('1234567890abcdef', 16)}`
}

export { generateId, generateFieldDOMId, }
