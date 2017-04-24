const fs = require('fs')
const path = require('path')
const compressor = require('node-minify')
const wrench = require('wrench')

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(function(file){
      return fs.statSync(path.join(srcpath, file)).isDirectory() &&
                      file.indexOf('.') < 0 &&
                      file !== 'node_modules' &&
                      file !== 'dist' &&
                      file !== 'assets'
    })
}

var importsAll = ''
var dir = getDirectories('./')
for(var i in dir) {
  var item = dir[i]
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
    compressor.minify({
      compressor: 'gcc',
      input: './base/base.js',
      output: './dist/base.min.js',
      callback: function (err, min) {
        if(err) console.log('ERROR: ', err)
      }
    });
  } else {
    if(fs.existsSync(`./${item}/style.css`)){
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
    if(fs.existsSync(`./${item}/script.js`)){
      compressor.minify({
        compressor: 'uglifyjs',
        input: `./${item}/script.js`,
        output: `./dist/${item}.min.js`,
        callback: function (err, min) {
          if(err) console.log('ERROR: ', err)
        }
      });
    }
  }
}

var fileNameImport = './dist/imports.css'
if (fs.existsSync(fileNameImport)) {
    fs.unlinkSync(fileNameImport)
}
var fd = fs.openSync(fileNameImport, 'w')
fs.writeSync(fd, importsAll)
