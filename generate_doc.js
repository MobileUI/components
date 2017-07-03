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
      menu += `<a href="#${subitem.key}" onclick="goDoc('${subitem.key}')"><li>${subitem.label}</li></a>`
      if (fs.existsSync(subitem.path)) {
        var docHtml = fs.readFileSync(subitem.path).toString()
        var urlDoc = "https://github.com/MobileUI/components/tree/master/" + subitem.path.replace('./','');
        docHtml = docHtml.replace('<!-- DONE -->','<a href="'+urlDoc+'" target="_blank" class="button-contribute right border-grey-300 text-grey-600"><i class="text-black icon ion-social-github"></i>Contribute on Github! Edit this section.</a>\n<!-- DONE -->')
        docHtml = docHtml.split('<!-- BEGIN -->')[1].split('<!-- DONE -->')[0]
        docHtml = docHtml.replace(`id="_DOC_GENERATE_SPACE_"`, `id="${subitem.key}"`)
        var docCss = ''
        if(subitem.key === 'base') {
          docCss = fs.readFileSync('./base/mobileui.css').toString()
        } else if(subitem.path.indexOf('./base') < 0){
          var uriFile = subitem.path.replace('index.html','style.css')
          if(fs.existsSync(uriFile)) {
            docCss = fs.readFileSync(uriFile).toString()
          }
        }
        if(docCss) {
          docCss = docCss.split('/*')
          var listCssDoc = []
          for(i in docCss) {
            if(docCss[i].split('{')[0].indexOf('*/') >= 0){
              var description = docCss[i].split('{')[0].split('*/')[0]
              var classes = docCss[i].split('{')[0].split('*/')[1].split('.');
              var className = classes[classes.length-1];
              className = className.split(':')[0];
              if(description && className) {
                listCssDoc.push({className: className, description: description})
              }
            }
          }
          if(listCssDoc.length) {
            var htmlCssDoc = '<p>The features of this component are:</p>'
            htmlCssDoc += '<div class="content-table"><table class="tableDoc"><tr><th>Class</th><th>Description</th></tr>'
            for(var doc of listCssDoc) {
              htmlCssDoc += `<tr><td><code>${doc.className}</code></td><td>${doc.description}</td></tr>`
            }
            htmlCssDoc += '</table></div>'
            docHtml = docHtml.replace('<!-- _DOC_GENERATE_CSS_DOC -->', htmlCssDoc)
          }
        }
        content += '<div class="content-doc-reader">' + docHtml + '</div>';
      }
  }
  menu += `</ul>`
}
var index = template.replace(`<!-- SPACE-GENERATE-DOCS -->`, `<div class="menuland font-raleway"><div class="list radius grey-50"><div class="item space-small icon ion-search" id="searchComponent"><input type="text" placeholder="Search..." autofocus="autofocus"></div></div>${menu}</div><div class="content-land font-raleway">${content}</div>`)
index = index.replace(new RegExp(`../assets/`, 'g'), `/`)
fs.writeFile(path.join(docs.site_dir,'index.html'), index)

if (!fs.existsSync(path.join(docs.site_dir,'mobileui/'))){
    fs.mkdirSync(path.join(docs.site_dir,'mobileui/'));
}

wrench.copyDirSyncRecursive('./dist', path.join(docs.site_dir,'mobileui/'), {
    forceDelete: true
})
