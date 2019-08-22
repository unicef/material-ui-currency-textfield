const path = require('path')
const { styles, theme } = require('./styleguide.styles')
module.exports = {
  title: "Material ui currency input",
  showUsage: true,
  styles,
  theme,
  showSidebar: false,
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
  // styleguideComponents: {
  //   Logo: path.join(__dirname, 'src/assets/logo.png')
  // },
  sections: [
    {
      name: '',
      content: 'src/components/readme.md'
    },
    {
      name: '',
      components: () => ([
        path.resolve(__dirname, 'src/components/CurrencyTextField', 'CurrencyTextField.js'),
      ])
    },
  ],
};
