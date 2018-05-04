const { join, resolve } = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Dirstats = require("../src/server");
const pkg = require("../package.json");

const babel = require("./babel");
const styles = require("./style");
const uglify = require("./uglify");

const dist = join(__dirname, "../dist");

module.exports = env => {
  const isProd = env && env.production;

  // Our style-loader chain
  const cssGroup = styles(isProd);

  // Our entry file
  let entry = "./src/client/index.js";

  // Base plugins
  let plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isProd ? "production" : "development"
      )
    })
  ];

  if (isProd) {
    babel.plugins.push("babel-plugin-transform-react-remove-prop-types");
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(uglify),
      new ExtractTextPlugin({
        filename: "style.css",
        allChunks: false
      })
    );
  } else {
    // Add HMR client
    entry = [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
      entry
    ];
    // Add dev-only plugins
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new Dirstats()
    );
  }

  return {
    entry,
    output: {
      path: dist,
      publicPath: "/",
      filename: "bundle.js"
    },
    resolve: {
      extensions: [".jsx", ".js", ".json", ".scss"],
      alias: {
        "dfs-utils": resolve("./src/client/helpers/utils"),
        "dfs-components": resolve("./src/client/styles/components")
      }
    },
    plugins,
    devtool: !isProd && "eval",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: babel
          }
        },
        {
          test: /(\.css|\.scss)$/,
          use: isProd
            ? ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: cssGroup
              })
            : cssGroup
        },
        {
          test: /\.json$/,
          use: "json-loader"
        },
        {
          test: /\.(xml|html|txt|md)$/,
          use: "raw-loader"
        },
        {
          test: /\.ico$/,
          use: "url-loader"
        },
        {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
            options: {}
          }
        }
      ]
    }
  };
};
