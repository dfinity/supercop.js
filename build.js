var glob = require('glob')
var exec = require('child_process').exec
var fs = require('fs')

var files = glob.sync('vendor/src/*.c')
var command = 'emcc supercop.c ' + files.join(' ') + ' -o lib.js -O1 -s WASM=0'
var child = exec(command, function(err){
  if(err){
    throw err
  }
})
child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)
child.on('exit', function(code){
  if(code){
    process.exit(code)
  }
  fs.appendFileSync(
    'lib.js',
    'if (typeof module !== "undefined") {  module["exports"] = Module; }'
  )
})
