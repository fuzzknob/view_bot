const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        main: './app/scripts/main.ts',
        background: './app/scripts/background.ts',
        inject: './app/scripts/inject.ts',
    },

    output: {
        filename: 'scripts/[name].js',
        path: path.resolve(__dirname, './dist')
    },

    plugins: [
        new HtmlPlugin({
            filename: 'main.html',
            template: './public/main.html',
            chunks: ['main']
        }),
        new CopyPlugin([
            {
                from: "public/assets/icons",
                to: "icons"
            },
            {
                from: "public/devtool.html"
            },
            {
                from: "public/manifest.json"
            }
        ])
    ],

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        modules: [path.resolve('./node_modules')],
        alias: {
            '@libs': path.resolve(__dirname, 'app/libs')
        },
        extensions: ['.ts', '.js', '.json']
    },
    devtool: "source-map"
}
