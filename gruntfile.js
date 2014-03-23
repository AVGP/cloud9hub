'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: ['gruntfile.js', 'config.js', 'server.js', 'controllers/**', 'routes/**', 'public/js/**']
            },
            html: {
                files: ['views/**', 'public/*.html', 'public/partials/**']
            },
            css: {
                files: ['public/css/**']
            },
            sass: {
                files: ['public/scss/**'],
                tasks: ['sass'],
                options: {
                    livereload: false
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'public/css/style.css': 'public/scss/style.scss'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3105
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-sass');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['sass', 'concurrent']);
};