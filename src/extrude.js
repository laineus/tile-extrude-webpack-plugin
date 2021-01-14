#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { extrudeTilesetToBuffer } = require('tile-extruder')
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')

const pngquant = imageminPngquant()

module.exports = (input, outputDir, size, minify) => {
  return extrudeTilesetToBuffer(size, size, input).then(buffer => {
    return imagemin.buffer(buffer, minify ? { plugins: [pngquant] } : {}).then(minifiedBuffer => {
      return fs.writeFileSync(path.join(outputDir, path.basename(input)), minifiedBuffer)
    })
  })
}
