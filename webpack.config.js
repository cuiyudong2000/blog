const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
    //mode有production和development两种模式，默认为生产模式，在开发模式下，webpack打包的代码方便开发者调试
    mode:"development",
    //方便看打包后的代码，添加devtool配置项
    devtool: "inline-source-map",
    //entry:入口的文件，即从哪个文件开始寻找import依赖的路径
    entry:"./src/index.js",
    //output:最后生成的js文件的一些信息
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname,"src/utils"),
        }
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    devServer: {
        static: "./dist",
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"博客列表",
        }),
        new BundleAnalyzerPlugin(),
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use:["style-loader","css-loader"],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
        {
            test:/\.js$/,
            exclude: /node_modules/,
            use:{
                loader:"babel-loader",
                options: {
                    presets:["@babel/preset-env"],
                }
            }
        }
        ]
    },
};
