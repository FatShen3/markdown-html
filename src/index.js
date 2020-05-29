const { program } = require('commander')
const pkgJson = require('../package.json')
const render = require('./md').render
const defaults = require('./defaults')

program.usage('mdFile [options]')
program.option('mdfile', 'Path of the markdown file to convert')
program.option('-o --out <path>', 'path where save the html', defaults.out)
program.option('--cwd <path>', 'current working directory', defaults.cwd)
program.option('-mc --md-css <path>', 'markdown css file to use', defaults['mdCss'])
program.option('-cc --custom-css <path>', 'custom css file to use', defaults['customCss'])
program.option('-hc --hljs-css <path|name>', 'highlight.js css to use', defaults['hljsCss'])
program.option('-no-ti --no-transform-image', 'do not transform image to base64')
program.option('-no-hf --no-html-fragment', 'do not generate html fragment', defaults['htmlFragment'])
program.option('--md-class <class>', 'warper div class name', defaults.mdClass)
program.version(pkgJson.version)

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}

render(Object.assign(program.opts(), { mdFile: program.args[0] }))
