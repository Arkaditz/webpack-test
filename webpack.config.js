// const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const  path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/nam[hash][ext][query]'
    },
    resolve:{
        extensions: ['.js'],
        alias:{
            '@utils': path.resolve(__dirname,'src/utils'),
            '@templates': path.resolve(__dirname,'src/templates'),
            '@styles': path.resolve(__dirname,'src/styles'),
            '@images': path.resolve(__dirname,'src/assets/images'),
        }
    },
    module: {
        rules:[
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
                
            },
            {
                test: /\.png/,
                type: 'asset/resource',
                generator:{
                    filename: 'assets/images/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator:{
                    filename: 'assets/fonts/[name].[contenthash][ext]'
                } 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(
           { filename: 'assets/[name].[contenthash].css'}
        ),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname,'src','assets/images'),
        //             to: 'assets/images'
        //         }
        //     ]
        // })
        new DotenvWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    optimization:{
        minimize:true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
    
}