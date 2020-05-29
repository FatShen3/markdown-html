## markdown-html

a cli tool to transform markdown to html

* support custom css
* support highlight your code by `highlight.js`
* support custom markdown css
* support transform your image into base64
* support only generate html fragment(do not contain body tag)

## install

```bash
npm i -g markdown-html
```

## usage

```bash
md2html -h

Usage: md2html mdFile [options]

Options:
  mdfile                       Path of the markdown file to convert
  -o --out <path>              path where save the html (default: "/Users/An1")
  --cwd <path>                 current working directory (default: "/Users/An1")
  -mc --md-css <path>          markdown css file to use (default: "github")
  -cc --custom-css <path>      custom css file to use (default: "")
  -hc --hljs-css <path|name>   highlight.js css to use (default: "github-gist")
  -no-ti --no-transform-image  do not transform image to base64
  -no-hf --no-html-fragment    do not generate html fragment
  --md-class <class>           warper div class name (default: "markdown-body")
  -V, --version                output the version number
  -h, --help                   display help for command

```

* __cwd__ current working directory, default is where you run `md2html` command, it will be used by __mdfile__, __out__ option
* __mdfile__ path of the md file to convert, it will use `cwd` as base path
* __out__ path of the output html file, it will use `cwd` as base path
* __md-css__ markdown css file to use

  This cli tool use [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) as default. If u want different markdown css, pass http link or localPath css file, like `http://cdn.com/a.css` or `/path/to/md.css`

* __custom-css__ custom css file, pass http link or localPath css file
* __hljs-css__ `highlight.js` css to use. U can pass http link or localpath. Besides, u can pass the embed css name, like `Agate`, `Github`, you can find css name [here](https://highlightjs.org/static/demo/)
* __no-transform-image__ By default, this tool will transform image to embed base64, this is great helpful if you want the html file to show standalone.
* __no-html-fragment__ By default, the html file is just a div tag wrap the generated html code. If you want a complete html file, pass `-no-hf`
* __md-class__ Since we use [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) as default and it requires all html code wraped by class name `markdown-body`, so the default is `markdown-body`

## example

```bash
md2html a.md
```
Above command will transform a.md to a.html at current directory

```bash
md2html a.md -mc http://a.com/md.css -hc http://b.com/highlight.css
```
Above command will use a different markdown css and hightlight.js css
