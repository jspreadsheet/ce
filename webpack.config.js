const path = require('path');

module.exports = {
    target: 'web',
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static : {
            directory : path.join(__dirname, "/")
        },
    },
    stats: { warnings:false },
};