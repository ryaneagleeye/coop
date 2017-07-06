module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    var env = {
        cssDir: './styles',

        header: '/*! <%= pkg.name %> lib - v<%= pkg.version %> \n' +
                ' * Compiled: <%= grunt.template.today("yyyy-mm-dd HH:MM") %> \n' +
                ' */\n',
        cssFiles: [
            './assets/css/**/*.css'
        ]
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: env,
        compass: {
            dist: {
                options: {
                    sassDir: [
                        'assets/sass'
                    ],
                    cssDir: 'assets/css'
                }
            }
        },
        concat: {
            css: {
                options: {
                    separator: '\n',
                    stripBanners: true,
                    banner: env.header
                },
                files: {
                    '<%= env.cssDir %>/styles.css': env.cssFiles
                }
            }
        },
        cssmin: {
            module: {
                files: {
                    '<%= env.cssDir %>/styles.min.css': '<%= env.cssDir %>/styles.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['compass', 'concat:css', 'cssmin']);
};