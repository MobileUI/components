const fs = require('fs')
const path = require('path')
const compressor = require('node-minify')
const wrench = require('wrench')

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory() &&
                    file.indexOf('.') < 0 &&
                    file !== 'node_modules' &&
                    file !== 'dist' &&
                    file !== 'assets')
}

let importsAll = ''

for(let item of getDirectories('./')) {
  importsAll += `@import url("./${item}.min.css");\n`
  fs.createReadStream(`./${item}/component.json`).pipe(fs.createWriteStream(`./dist/${item}.json`));
  if(item === 'base') {
    compressor.minify({
      compressor: 'clean-css',
      input: ['./base/reset.css','./base/mobileui.css','./base/colors.css','./base/font.css','./base/icons.css'],
      output: './dist/base.min.css',
      options: {
        advanced: false,
        aggressiveMerging: false
      },
      callback: function (err, min) {
        if(err) console.log('ERROR: ', err)
        wrench.copyDirSyncRecursive('./base/fonts', './dist/fonts', {
            forceDelete: true
        })
      }
    })
  } else {
    compressor.minify({
      compressor: 'clean-css',
      input: `./${item}/style.css`,
      output: `./dist/${item}.min.css`,
      options: {
        advanced: false,
        aggressiveMerging: false
      },
      callback: function (err, min) {
        if(err) console.log('ERROR: ', err)
      }
    })
  }
}

let fileNameImport = './dist/imports.css'
if (fs.existsSync(fileNameImport)) {
    fs.unlinkSync(fileNameImport)
}
let fd = fs.openSync(fileNameImport, 'w')
fs.writeSync(fd, importsAll)
