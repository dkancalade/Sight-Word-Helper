

const path = require('path');


const SRC_DIR = path.join(__dirname, '/react-client/src');
const DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        use: {
          loader : 'babel-loader',
          options: {
            'presets': ['@babel/preset-env', '@babel/preset-react'],
            'plugins': ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};