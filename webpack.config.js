module.exports = {
    entry: [
        'whatwg-fetch',
        './views/main.js'
    ],
    target: 'web',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(css|less)$/,
                loader: 'style-loader!css-loader'
            }
        ],

    }
};