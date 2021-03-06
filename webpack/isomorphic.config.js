const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const path = require('path')

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
console.log('==running isomorphic.config==', path.resolve(__dirname, './webpack-assets.json'))
module.exports = {
  // when adding "js" extension to asset types
  // and then enabling debug mode, it may cause a weird error:
  //
  // [0] npm run start-prod exited with code 1
  // Sending SIGTERM to other processes..
  //
  // debug: true,
  webpack_assets_file_path: path.resolve(__dirname, './webpack-assets.json'),
  webpack_stats_file_path: path.resolve(__dirname, './webpack-stats.json'),
  assets: {
    style_modules: {
      extensions: ['less', 'css'],
      filter: function (module, regex, options, log) {
        // console.log('11', options)
        if (!options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return regex.test(module.name)
        }
      },
      path: function (module, options, log) {
        if (!options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log)
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return module.name
        }
      },
      parser: function (module, options, log) {
        if (!options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log)
        } else {
          // in production mode there's Extract Text Loader which extracts CSS text away
          return module.source
        }
      }
    }
  }
}
