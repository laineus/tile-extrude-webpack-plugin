const path = require('path')
const fs = require('fs')
const { extrudeTilesetToBuffer } = require('tile-extruder')
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')

const plugins = [
  imageminPngquant()
]
const defaultSettings = {
  minify: true
}

module.exports = class {
  constructor (settings) {
    this.settings = { ...defaultSettings, ...settings }
  }
  apply (compiler) {
    this.projectRoot = compiler.context
    this.inputDir = path.resolve(this.projectRoot, this.settings.input)
    this.outputDir = path.resolve(this.projectRoot, this.settings.output)
    if (this.inputDir === this.outputDir) throw new Error('[Error] Input dir and output dir should not be same.')
    compiler.hooks.afterEnvironment.tap('TileSet', () => {
      console.log('TileExtrudeWebpackPlugin: Extruding all files...')
      const files = fs.readdirSync(this.inputDir).filter(file => file.endsWith('.png'))
      files.forEach(file => this.extrude(file))
      if (compiler.options.mode === 'development') this.watch()
    })
  }
  watch () {
    const modifiedFiles = []
    fs.watch(this.inputDir, (_, file) => {
      if (!file.endsWith('.png')) return
      if (modifiedFiles.includes(file)) return
      modifiedFiles.push(file)
    })
    setInterval(() => {
      modifiedFiles.forEach(file => {
        if (!fs.existsSync(path.join(this.inputDir, file))) return
        console.log(`TileExtrudeWebpackPlugin: Extruding ${file}...`)
        this.extrude(file)
      })
      modifiedFiles.splice(0)
    }, 1000)
  }
  extrude (file) {
    const size = this.settings.size
    return extrudeTilesetToBuffer(size, size, path.join(this.inputDir, file)).then(buffer => {
      return imagemin.buffer(buffer, this.settings.minify ? { plugins } : {}).then(minifiedBuffer => {
        return fs.writeFileSync(path.join(this.outputDir, file), minifiedBuffer)
      })
    })
  }
}
