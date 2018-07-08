function getPlatform(root) {
  return new Promise((factory, reject) => {
    if ('chrome' in root) {
      // Chrome and Chrome-like
      factory(root.chrome)
    } else if ('browser' in root) {
      // Firefox
      factory(root.browser)
    }

    reject(new Error('Browser does not support WebExtensions.'))
  })
}

export {
// eslint-disable-next-line import/prefer-default-export
  getPlatform,
}
