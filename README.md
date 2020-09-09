
A Webpack plugin to extrude tilesets automatically with [tile-extruder](https://github.com/sporadic-labs/tile-extruder).

It will be re-extruded automatically when added or modified images while webpack is watching.

# Usage

Install:

```
$ npm install tile-extrude-webpack-plugin
```

Define into `webpack.config.js`:

```js
const TileExtrudeWebpackPlugin = require('tile-extrude-webpack-plugin')
// ...
{
  entry: {
    ...
  },
  output: {
    ...
  },
  plugins: [
    new TileExtrudeWebpackPlugin({
      size: 32,
      input: './public/img/original_tilesets',
      output: './public/img/extruded_tilesets'
    })
  ]
}
```

Options:

|Key|What is|
|---|---|
|size|Tile size.|
|input|Input directory. Original images should be here.|
|output|Output directory. Extruded images will be here.|
|minify|Minify png when extrude. (default is true)|

# Requirements

- Webpack4 or higher

I'm not sure if this will be working on Webpack3 or less.
Please make an issue or PR if need it.
