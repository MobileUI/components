const fs = require('fs')
const path = require('path')
const wrench = require('wrench')
const docs = require('./docs.json')

var template = fs.readFileSync(path.join(docs.site_dir,'template.html')).toString()

var menu = ''
var content = ''
for(var i in docs.docs) {
  var item = docs.docs[i]
  menu += `<h1>${item.category}</h1>`
  menu += `<ul>`
  for(var subitem of item.itens) {
      menu += `<a href="#${subitem.key}"><li>${subitem.label}</li></a>`
      var docHtml = fs.readFileSync(subitem.path).toString()
      docHtml = docHtml.split('<!-- BEGIN -->')[1].split('<!-- DONE -->')[0]
      docHtml = docHtml.replace(`id="_DOC_GENERATE_SPACE_"`, `id="${subitem.key}"`)
      content += docHtml
  }
  menu += `</ul>`
}
var index = template.replace(`<!-- SPACE-GENERATE-DOCS -->`, `<div class="menu font-raleway">${menu}</div><div class="content font-raleway">${content}</div>`)
index = index.replace(new RegExp(`../assets/`, 'g'), `/`)
fs.writeFile(path.join(docs.site_dir,'index.html'), index)

if (!fs.existsSync(path.join(docs.site_dir,'mobileui/'))){
    fs.mkdirSync(path.join(docs.site_dir,'mobileui/'));
}

wrench.copyDirSyncRecursive('./dist', path.join(docs.site_dir,'mobileui/'), {
    forceDelete: true
})
