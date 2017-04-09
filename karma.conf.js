const webpackConfig = require('./tools/webpack.config').default;


let commonsChunkPluginIndex = webpackConfig[0].plugins.findIndex(plugin => plugin.chunkNames);
webpackConfig[0].plugins.splice(commonsChunkPluginIndex, 1);
commonsChunkPluginIndex = webpackConfig[1].plugins.findIndex(plugin => plugin.chunkNames);
webpackConfig[1].plugins.splice(commonsChunkPluginIndex, 1);


// console.log(webpackConfig);
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

        webpack: webpackConfig,

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