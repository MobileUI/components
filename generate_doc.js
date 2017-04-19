const fs = require('fs')
const path = require('path')
const wrench = require('wrench')
const docs = require('./docs.json')

let template = fs.readFileSync(path.join(docs.site_dir,'template.html')).toString()

let menu = ''
let content = ''
for(let item of docs.docs) {
  menu += `<h1>${item.category}</h1>`
  menu += `<ul>`
  for(let subitem of item.itens) {
      menu += `<a href="#${subitem.key}"><li>${subitem.label}</li></a>`
      let docHtml = fs.readFileSync(subitem.path).toString()
      docHtml = docHtml.split('<!-- BEGIN -->')[1].split('<!-- DONE -->')[0]
      docHtml = docHtml.replace(`id="_DOC_GENERATE_SPACE_"`, `id="${subitem.key}"`)
      content += docHtml
  }
  menu += `</ul>`
}
let index = template.replace(`<!-- SPACE-GENERATE-DOCS -->`, `<div class="menu font-raleway">${menu}</div><div class="content font-raleway">${content}</div>`)
index = index.replace(new RegExp(`../assets/`, 'g'), `/`)
fs.writeFile(path.join(docs.site_dir,'index.html'), index)

wrench.copyDirSyncRecursive('./', path.join(docs.site_dir,'mobileui/'), {
    forceDelete: true
})
