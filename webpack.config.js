'use strict'

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
    devtool: 'source-map',
    contentBase: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'app/app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            /*{
                test: /\.html$/,
                loader: "html?name=[name].[ext]"
            },*/
            {
                test:   /\.styl$/,
                loader: ExtractTextPlugin.extract('css!stylus?resolve url')
            },
            {
                test:   /\.jade$/,
                loader: "jade"
            },
            {
                test:   /\.(html|css|png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            components: path.join(__dirname, '/app/components'),
            actions: path.join(__dirname, '/app/actions'),
            stores: path.join(__dirname, '/app/stores'),
            mock: path.join(__dirname, 'mock')
        }
    }
};