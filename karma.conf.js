const webpackConfig = require('./tools/webpack.config').default[0];

// let commonsChunkPluginIndex = webpackConfig[0].plugins.findIndex(plugin => plugin.chunkNames);
// webpackConfig[0].plugins.splice(commonsChunkPluginIndex, 1);
// commonsChunkPluginIndex = webpackConfig[0].plugins.findIndex(plugin => plugin.chunkNames);
// webpackConfig[0].plugins.splice(commonsChunkPluginIndex, 1);

// let module = webpackConfig;
// console.log(webpackConfig);
webpackConfig.module.rules.push({ test: /\.js$/, loader: 'babel-loader' })
module.exports = function(config) {
    config.set({

        browsers: [ 'Chrome' ], //run in Chrome
        singleRun: true, //just run once by default
        // ... normal karma configuration
        frameworks    : ['mocha'],
        // reporters     : ['mocha'],
        files: [
            // all files ending in "_test"
            'src/*test.js',
            'src/**/*test.js'
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'src/*test.js': ['webpack'],
            'src/**/*test.js': ['webpack']
        },

        // webpack: {
        //     // you don't need to specify the entry option because
        //     // karma watches the test entry points
        //     // webpack watches dependencies

        //     // ... remainder of webpack configuration (or import)
        // },

        // webpack: webpackConfig,
        webpack: {
          devtool: 'inline-source-map',
          // module: {
          //   loaders: [
          //     { test: /\.js$/, loader: 'babel-loader' },
          //     { test: /\.jsx?$/, loader: 'babel-loader' },
          //     { test: /\.css/, loader: 'isomorphic-style-loader' },
          //     // { loader: 'css-loader' },
          //     // { test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/, loader: 'file-loader' },
          //     // { test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/, loader: 'url-loader' }
          //   ]
          // }
         module: webpackConfig.module 
        },        

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e. 
                chunks: false
            }
        },

        plugins: [
            require("karma-webpack"),
            require('karma-mocha'),
            require('karma-chrome-launcher')
        ]

    });
};