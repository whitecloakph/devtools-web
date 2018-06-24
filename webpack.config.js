const path = require('path')

module.exports = {
  entry: './src/devtools.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'devtools.js',
  },
  devtool: 'cheap-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.{otf,ttf,eot,svg,png,jpg,gif}$/,
        loaders: ['file-loader', ],
      },
      {
        test: /\.jsx$/,
        loader: ['babel-loader', ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', ],
    modules: ['node_modules', ],
  },
}
