const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

class MyPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('MyPlugin', (compilation) => {
            // Get the bundled file name
            const fileName = Object.keys(compilation.assets)[0];

            // Get the bundled file content
            const fileContent = compilation.assets[fileName].source();

            const header = `if (! jSuites && typeof(require) === 'function') {
    var jSuites = require('jsuites');
}

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jspreadsheet = factory();
}(this, (function () {`;

            const footer = `    return jspreadsheet;
})));`;

            // Updated file content with custom content added
            const updatedFileContent = header + '\n\n' + fileContent + '\n\n' + footer;

            // Replace the bundled file content with updated content
            compilation.assets[fileName] = {
                source: () => updatedFileContent,
                size: () => updatedFileContent.length,
            };
        });
    }
}

let isProduction = process.env.NODE_ENV === 'production';

let dependencies = {};
if (isProduction) {
    dependencies = {
        jsuites: "''",
    }
}

const webpack = {
    target: ['web', 'es5'],
    entry: isProduction ? './src/index' : './src/test.js',
    mode: isProduction ? 'production' : 'development',
    externals: dependencies,
    output: {
        filename: 'index.js',
        library: 'jspreadsheet'
    },
    optimization: {
        minimize: true
    },
    devServer: {
        static : {
            directory : path.join(__dirname, "/public")
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        port: 3007,
        devMiddleware: {
            publicPath: "https://localhost:3000/",
        },
        hot: "only",
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader"
                ],
            }
        ],
    },
    stats: {
        warnings: false
    },
};

if (isProduction) {
    webpack.plugins.push(new MyPlugin());
    webpack.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'jspreadsheet.css'
        })
    );
}

module.exports = webpack;