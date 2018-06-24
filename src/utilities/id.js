import url from 'nanoid/url'
import generate from 'nanoid/generate'

function generateId() {
  return generate(url, 16)
}

// eslint-disable-next-line import/prefer-default-export
export { generateId, }
