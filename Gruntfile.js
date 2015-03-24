var config = require('grunt-settings');

module.exports = function(grunt) {
  // Initialize the configuration block.
  config.init(grunt);

  // Set JavaScripts that will be compiled.
  var jsFiles = [
    'assets/javascripts/**/*.js' 
  ];

  // Compress the CSS.
  config.set('cssmin.dist', {
      src: 'assets/stylesheets/todo.css'
    , dest: 'public/stylesheets/todo.css'
  });

  // Compress images.
  config.set('imagemin.dist', {
    files: [{
        expand: true
      , cwd: 'assets/images/'
      , src: ['**/*.{png,jpg,gif}']
      , dest: 'public/images/'
    }]
  });

  // Compress JavaScript
  config.set('uglify.dist', {
      options: {
        compress: {
          drop_console: true
        }
      }
    , src: jsFiles
    , dest: 'public/javascripts/todo.js'
  });

  // Concatenate JavaScript
  config.set('concat.dev', {
      src: jsFiles
    , dest: 'public/javascripts/todo.js'
  });

  // Watch for updates.
  config.set('watch.js', {
      files: ['assets/javascripts/**/*.js', 'assets/components/**/*']
    , tasks: ['concat']
    , options: {
        livereload: true,
      }

  });

  config.set('watch.css', {
      files: ['assets/stylesheets/**/*.css', 'assets/components/**/*']
    , tasks: ['cssmin']
    , options: {
        livereload: true,
      }
  });

  config.set('watch.images', {
      files: ['assets/images/**/*']
    , tasks: ['imagemin']
  });

  config.set('bower', {
    install: {
      options: {
        targetDir: './public/assets/components',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false,
        bowerOptions: {},
        layout: 'byType',
      }

    }
  });


  // Register the default task.
  config.registerTask('default', ['cssmin', 'imagemin', 'uglify']);
};


