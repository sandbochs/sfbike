'use strict';

var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  var gruntConfiguration = {
    app: 'app/assets',
    scripts: 'app/assets/javascripts',
    dist: 'public/assets',
    specs: 'spec/javascripts',
    components: 'vendor/assets/components'
  }

  var clean = {
    dist: { 
      files: [{
        dot: true,
        options: {force: true},
        src: [
          '%<= gruntConfig.dist %>'
        ]
      }]
      },
      test: {
        files: [{
          src: [
          ]
        }]
      },
      postBuild: {
        options: {force: true},
        files: [{
          src: [
            '<%= gruntConfig.dist %>/scripts/*', '!<%= gruntConfig.dist %>/scripts/scripts.js'
          ]
        }]
      }
  }
  grunt.initConfig({
    gruntConfig: gruntConfiguration,
    clean: clean,
    jasmine: {
      sfbike: {
        src: [
          '<%= gruntConfig.scripts %>/sfbike.js',
          '<%= gruntConfig.scripts %>/shared/*.js',
          '<%= gruntConfig.scripts %>/map_pane/*.js'
        ],
        options:{
          vendor: [
            '<%= gruntConfig.components %>/underscore/underscore.js',
            '<%= gruntConfig.components %>/angular/angular.js',
            '<%= gruntConfig.components %>/angular-google-maps/dist/angular-google-maps.js'
          ],
          helpers: [
            '<%= gruntConfig.components %>/angular-scenario/angular-scenario.js',
            '<%= gruntConfig.components %>/angular-mocks/angular-mocks.js'
          ],
          specs: [
            '<%= gruntConfig.specs %>/{,*/}*.js'
          ]
        }
      }
    },
    concat: {
      dist: {
        options: {
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[\t]*('use strict' | "use strict");?\s*/g, '$1');
          }
       },
       files: {
        '<%= gruntConfig.dist %>/scripts/scripts.js': [
          '<%= gruntConfig.components %>/underscore/underscore-min.js',
          '<%= gruntConfig.components %>/angular/angular.min.js',
          '<%= gruntConfig.components %>/angular-google-maps/dist/angular-google-maps.js',
          '<%= gruntConfig.scripts %>/sfbike.js',
          '<%= gruntConfig.scripts %>/shared/*.js',
          '<%= gruntConfig.scripts %>/map_pane/*.js'
        ]
       }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= gruntConfig.app %>/images',
          src: ['{,*/}*.{png,jpg,jpeg}'],
          dest: '<%= gruntConfig.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeAttribtueQuotes: true
        },
        files: [{
          expand: true,
          cwd: '<%= gruntConfig.app %>',
          src: ['!.#*.html', '!views/{,*/}*/.#*.html', '!views/.#*.html', '*.html', 'views/*.html', 'views/{,*/}*/*.html'],
          dest: '<%= gruntConfig.dist %>'
        }]
      }
    },
    connect: {
      test: {
        options: {
          port: 12000,
          hostname: '0.0.0.0',
          middleware: function (connect) {
            return [
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('test', [
    'connect:test',
    'jasmine:sfbike',
    'clean:test'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'imagemin:dist',
    'htmlmin:dist',
    'concat:dist',
    'clean:postBuild'
  ]);

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['test', 'build']);
};