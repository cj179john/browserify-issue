'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var _ = require('lodash');

    // Configurable paths for the application
    var appConfig = {
        app: 'web',
        deploy: 'deploy',
        release: 'release'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {

            bower: {
                files: ['bower.json']            
            },

            js: {
                files: [
                    '<%= yeoman.app %>/scripts/features/{,*/}*.js', 
                    '<%= yeoman.app %>/scripts/app.js', 
                    'test/karma.conf.js', 
                    'Gruntfile.js'
                ],
                tasks: ['newer:jshint:all', 'browserify:development']
            },

            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },

            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        browserify: {
            development: {
                src: '<%= yeoman.app %>/scripts/app.js',
                dest: '<%= yeoman.app %>/scripts/init.js',
                options: {
                    browserifyOptions: {
                        insertGlobals: true,
                        debug: true,
                    },
                     postBundleCB: function (err, src, next) {
                         // HACK: save Node's `require` before it gets overrided by browserify
                        next(err, 'nodeRequire = require; ' + src)
                    }
                },
            },
            production: {
                src: '<%= yeoman.app %>/scripts/app.js',
                dest: '<%= yeoman.release %>/tmp/scripts/init.js',
                options: {
                    browserifyOptions: {
                        insertGlobals: true,
                        debug: false,
                    },
                     postBundleCB: function (err, src, next) {
                         // HACK: save Node's `require` before it gets overrided by browserify
                        next(err, 'nodeRequire = require; ' + src)
                    }
                },
            },
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {

            options: {
                jshintrc: 'test/.jshintrc',
                reporter: require('jshint-stylish')
            },

            all: {
                src: [
                    'test/features/{,*/}*.js',
                    '<%= yeoman.app %>/scripts/features/{,*/}*.js'
                ]
            }
        },

        concat: {
            development: {
              files: [
                    {
                      dest: '.tmp/concat/js/vendor_dev.js',
                      src: [
                      appConfig.app+'/scripts/bower_components/angular/angular.js',
                      appConfig.app+'/scripts/bower_components/angular-mocks/angular-mocks.js',
                      appConfig.app+'/scripts/bower_components/angular-resource/angular-resource.js',
                      appConfig.app+'/scripts/bower_components/angular-route/angular-route.js'
                      ]
                    }
                ]
            },
            production: {
              files: [
                    {
                      dest: '.tmp/concat/js/vendor_prod.js',
                      src: [
                      appConfig.app+'/scripts/bower_components/angular/angular.js',
                      appConfig.app+'/scripts/bower_components/angular-mocks/angular-mocks.js',
                      appConfig.app+'/scripts/bower_components/angular-resource/angular-resource.js',
                      appConfig.app+'/scripts/bower_components/angular-route/angular-route.js'
                      ]
                    }
                ]
            }
        },

        uglify: {
            development: {
                  files: [
                    {
                      dest: '<%= yeoman.app %>/scripts/vendor.js',
                      src: [ '.tmp/concat/js/vendor_dev.js' ]
                    }
                ]
            },
            production: {
                  files: [
                    {
                      dest: '<%= yeoman.release %>/tmp/scripts/vendor.js',
                      src: [ '.tmp/concat/js/vendor_prod.js' ]
                    }
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            release: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.release %>/{,*/}*',
                        '!<%= yeoman.release %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/scripts/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            release: {
                options: {
                    generatedImagesDir: '<%= yeoman.release %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            create_tmp_release_folder: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.release %>/tmp/',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.release %>/tmp/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: '<%= yeoman.release %>/scripts/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= yeoman.release %>/tmp/'
                }, {
                    expand: true,
                    flatten: true,
                    dest: '<%= yeoman.release %>/tmp/scripts/views/',
                    src: ['<%= yeoman.app %>/scripts/views/*.html']
                }, {
                    expand: true,
                    cwd: '.',
                    dest: '<%= yeoman.release %>/tmp/',
                    src: 'package.prod.json',
                    rename: function(dest, src) {
                        return dest + '/' + src.replace('package.prod', 'package');
                    }
                }, {
                    expand: true,
                    cwd: '.',
                    dest: '<%= yeoman.release %>/tmp/',
                    src: './lib/plink'   
                }, {
                    expand: true,
                    cwd: '.',
                    dest: '<%= yeoman.release %>/tmp/',
                    src: './lib/plink.exe'   
                }]
            },
            win_release : {
                files: [{
                    expand: true,
                    cwd: './lib/nw-win32',
                    src: ['**'],
                    dest: '<%= yeoman.release %>/win32/'
                }, {
                    expand: true,
                    cwd: './release',
                    src: ['collector.zip'],
                    dest: '<%= yeoman.release %>/win32/',
                    rename: function(dest, src) {
                        return dest + '/' + src.replace('.zip', '.nw');
                    }
                }]
            },
            osx_release : {
                files: [{
                    mode: true,
                    expand: true,
                    cwd: './lib/nw-osx/node-webkit.app',
                    src: ['**'],
                    dest: '<%= yeoman.release %>/osx/collector.app'
                }, {
                    mode: true,
                    expand: true,
                    cwd: './release',
                    src: ['collector.zip'],
                    dest: '<%= yeoman.release %>/osx/collector.app/Contents/Resources/',
                    rename: function(dest, src) {
                        return dest + '/' + src.replace('collector.zip', 'app.nw');
                    }
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        
        exec: {

            release_change_nw_permission:       'chmod -R 777 ./release/osx/collector.app',
            release_create_executable:          'cat ./release/win32/nw.exe ./release/win32/collector.nw > ./release/win32/collector.exe',
            release_remove_unwanted_files:      'rm -f ./release/collector.zip ./release/win32/nw.exe ./release/win32/nwsnapshot.exe ./release/win32/collector.nw ./release/tmp/lib/plink.exe && rm -rf ./release/tmp'
        }, 
        //Create zip file from release files
        compress: {
            release: {
                options: {
                    archive: '<%= yeoman.release %>/collector.zip'
                },
                files: [
                    {
                        expand: true, cwd: '<%= yeoman.release %>/tmp', src: ['**'], dest: ''}
                ] 
            }

        },
        
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            release: [
                'compass:release'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
            }
        },

        protractor: {
            test: {
                options: {
                    keepAlive: true,
                    configFile: 'test/protractor.conf.js'
                },
                run: {}
            },
            release: {
                options: {
                    keepAlive: true,
                    configFile: 'test/protractor.release.conf.js'
                },
                run: {}
            }
        }

    });

    /*
     * Test
     *
     * Usage: grunt test:<unit|functional>
     *
     * Task can target specific types of test
     *
     */
    grunt.task.registerTask('test', 'Test', function(target) {

        if(undefined === target) {
            grunt.log.error('Please specify a target [unit,functional].');
            return false;
        }

        if(arguments.length > 1) {
            grunt.log.error('You have provided too many arguments');
            return false;
        }

        var singleRun = grunt.option('no-once') || false;

        var feature = grunt.option('feature') || '';

        var env = grunt.option('env') || 'test';

        var scriptFiles = [
            appConfig.app+'/scripts/bower_components/angular/angular.js',
            appConfig.app+'/scripts/bower_components/angular-mocks/angular-mocks.js',
            appConfig.app+'/scripts/bower_components/angular-resource/angular-resource.js',
            appConfig.app+'/scripts/bower_components/angular-route/angular-route.js',
            appConfig.app+'/scripts/features/**/*.js',
            appConfig.app+'/scripts/config.js',
            appConfig.app+'/scripts/app.js',
        ];

        // allow the execution of a specific set of tests
        if(typeof feature === 'string' && 0 !== feature.length) {

            feature = 'test/features/' + feature + '/karma.js';

            if(false === grunt.file.isFile(feature)) {
                throw new Error('Not a valid feature');
            }

            scriptFiles.push(feature);

        } else {
            scriptFiles.push('test/features/**/*karma.js');
        }

        grunt.config.set('karma.unit.options.files', scriptFiles); 

        grunt.config.set('karma.unit.singleRun', singleRun);

        if(-1 === _.indexOf(['unit', 'functional'], arguments[0])) {
            grunt.fail.fatal('Tests need to be either [unit, functional]');
        }

        // load test configuration config
        grunt.file.delete(appConfig.app+'/scripts/config.js');
        grunt.file.copy(appConfig.app+'/scripts/config/'+env+'.js', appConfig.app+'/scripts/config.js');

        if('unit' === arguments[0]) {

            grunt.task.run([
                //'browserify:development',
                'clean:server',
                //'concurrent:test',
                'karma:unit'
            ]);

        }

        if('functional' === arguments[0]) {
            grunt.task.run([
                'browserify:development',
                'protractor:'+env+':run'
            ]);         
        }
    });

    grunt.registerTask('release', 'Build the application ready for deployment', function() {
    
        grunt.task.run([
            'clean:release',
            'concat:production',
            'uglify:production',           
            'browserify:production',
            'concurrent:release',
            'copy:create_tmp_release_folder',
            'compress:release',
            'copy:win_release',
            'copy:osx_release',
            'exec:release_change_nw_permission',
            'exec:release_create_executable',
            'exec:release_remove_unwanted_files',
        ]);

        // ensure that the production configuration is
        // the loaded configuration.
        grunt.file.delete(appConfig.app+'/scripts/config.js');
        grunt.file.copy(appConfig.app+'/scripts/config/prod.js', appConfig.app+'/scripts/config.js');

    });

    grunt.registerTask('default', 'Default',[
        'concat:development',
        'uglify:development',  
        'test:unit', 
        'test:functional', 
        'newer:jshint',
        'release'
    ]);

};
