const path = require('path');

const config = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    module: false,
    libraryTarget: 'window',
  },
  devtool: false,
  externalsType: 'self',
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: {
          and: [/node_modules/],
          not: [/react-redux/],
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  './babel-preset.js',
                ],
              ],
              babelrc: false,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: './dist',
    },
  },
};

module.exports = config;
