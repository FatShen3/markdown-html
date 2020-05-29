module.exports = {
  cwd: process.cwd(),
  out: process.cwd(), // output html file path
  mdFile: '',
  transformImage: true, // transform image to base64
  htmlFragment: true, // whole html file or just fragment
  hljsCss: 'github-gist', // hljs css, can use absolute http url
  customCss: '', // custom css file path
  mdCss: 'github', // markdown html css file path
  mdClass: 'markdown-body'
}
