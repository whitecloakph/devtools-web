import { compile, } from 'handlebars/dist/handlebars'

function compileTemplateString(string) {
  return compile(string)
}

export {
// eslint-disable-next-line import/prefer-default-export
  compileTemplateString,
}
