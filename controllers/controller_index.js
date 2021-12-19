
const { readdirSync } = require('fs')
const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
var path = `./views/components`

const index = async (req, res, next) => {
  let list = getDirectories(path),
    head = ``
  for (key in list) {

    head += `<link rel="stylesheet" href="./components/${list[key]}/css.css"></link><script src="./components/${list[key]}/js.js"></script>`
  }
  console.log({ lang: "vi", list: list });
  // return res.render('main', { lang: "vi" })
  return res.render('index', { lang: "vi", list: list })
}

const langIndex = async (req, res, next) => {
  let lang = req.params.lang
  let list = getDirectories(path),
    head = ``
  for (key in list) {
    head += `<link rel="stylesheet" href="./components/${list[key]}/css.css"></link><script src="./components/${list[key]}/js.js"></script>`
  }

  // return res.render('main', { lang: "vi" })
  return res.render('index', { lang: lang, list: list })
}

module.exports = {
  index,
  langIndex
}
