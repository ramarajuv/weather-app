// Karma configuration
// Generated on Sun Jan 15 2017 21:44:19 GMT+0100 (W. Europe Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        //frameworks: ['jasmine', 'browserify'],
        frameworks: ['jasmine'],



        // list of files / patterns to load in the browser
        files: [
            'app/lib/angular/angular.min.js',
            'app/lib/angular-*/angular-*.js',
            'app/lib/iso-3166-country-codes-angular/src/iso-3166-country-codes-angular.js',
            'app/css/bootstrap/css/bootstrap.css',
            'app/css/app.css',
            'app/js/**/*.js', // !!!! load .module files first and then everything else. Otherwise nothing will work
            'app/js/*.js',

            // templates
            'app/*/.html',

            // test files
            'test/unit/controllers/*.spec.js'


        ],

       
/*
          plugins: [
             'karma-browserify',
              'karma-jasmine',
            'karma-chrome-launcher'
         ],
*/

        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}