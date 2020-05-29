const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const axios = require('axios')
const fse = require('fs-extra')
const path = require('path')
const base64Img = require('base64-img')

const to = p => {
  if (p.then) {
    return p.then(e => [ null, e ]).catch(e => [ e || 'unknown error' ])
  }
  return Promise.resolve([ null, p ])
}

const md = new MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs" v-pre><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

const httpReg = /^https?:/
const absReg = /^\//
const localCssReg = /^[\w-]+$/
const mdImgReg = /(!\[.*\]\()([^)]+)/g
const htmlImgReg = /(<img.*src\s*=[^'"]*['"])([^'"]*)/g

const getCss = cssPath => {
  if (cssPath.match(httpReg)) {
    return axios(cssPath).then(response => response.data)
  } else if (cssPath.match(absReg)) {
    return fse.readFileSync(cssPath, 'utf-8')
  } else {
    return Promise.reject(`${cssPath} format not correct`)
  }
}

exports.render = async function (config) {
  let hljsCss = '', customCss = '', mdCss = ''
  const mdFilePath = path.resolve(config.cwd, config['mdFile'])
  let mdContent = fse.readFileSync(mdFilePath, 'utf-8')
  if (config['hljsCss']) {
    if (config['hljsCss'].match(localCssReg)) {
      hljsCss = fse.readFileSync(path.resolve(__dirname, '../node_modules/highlight.js/styles', config['hljsCss'] + '.css'), 'utf-8')
    } else {
      hljsCss = await getCss(config['hljsCss'])
    }
    hljsCss = '<style>' + hljsCss + '</style>'
  }
  if (config['customCss']) {
    customCss = await getCss(config['customCss'])
    customCss = '<style>' + customCss + '</style>'
  }
  if (config['mdCss']) {
    if (config['mdCss'].match(localCssReg)) {
      mdCss = fse.readFileSync(path.resolve(__dirname, './mdcss', config['mdCss'] + '.css'))
    } else {
      mdCss = await getCss(config['mdCss'])
    }
    mdCss = '<style>' + mdCss + '</style>'
  }
  let html = `
    <div class="${config.mdClass}">
      ${mdCss}
      ${hljsCss}
      ${customCss}
      ${md.render(mdContent)}
    </div>
  `
  if (!config['htmlFragment']) {
    html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `
  }
  // directly transform image src in html
  if (config['transformImage']) {
    html = html.replace(htmlImgReg, ($0, $1, $2) => {
      const base64 = base64Img.base64Sync(path.resolve(mdFilePath, '..', $2))
      return $1 + base64
    })
  }
  config.out = path.resolve(config.cwd, config.out)
  const fileReg = /([^/\\]*)\.[^/\\]+$/
  if (!config.out.match(fileReg)) { // if no file suffix, use the same as markdown file
    config.out = path.resolve(config.out, mdFilePath.match(fileReg)[1] + '.html')
  }
  fse.writeFileSync(config.out, html)
}
