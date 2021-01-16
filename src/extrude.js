#!/usr/bin/env node

const path = require('path')
const fs = require('fs').promises
const { extrudeTilesetToBuffer } = require('tile-extruder')
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')

const pngquant = imageminPngquant()

module.exports = async (input, outputDir, size, minify) => {
  const buffer = await extrudeTilesetToBuffer(size, size, input)
  const minifiedBuffer = await imagemin.buffer(buffer, minify ? { plugins: [pngquant] } : {})
  await fs.writeFile(path.join(outputDir, path.basename(input)), minifiedBuffer)
}
