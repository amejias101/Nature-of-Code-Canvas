"use strict";

module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		watch: {
			options: {
				livereload: true
			},

			html: {
				files: ['index.html', './chapters/**/*.html']
			},

			js: {
				files: ['./chapters/*/*/*.js', '!./chapters/*/*/app.bundle.js'],
				tasks: ['browserify']
			}
		},

		connect: {
			server: {
				options: {
	        base: './chapters',
					sourceMap: true,
					open: true
				}
			}
		},

		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				}
			},
			dist: {
				files: [{
	      	expand: true,
					cwd: './chapters/',
					src: ['*/*/app.js'],
					ext: '.bundle.js',
					rename: function(dest, src) {
						return './chapters/' + src;
					}
		    }]
			}
		}
	});

	grunt.registerTask('create', function() {
		console.log(grunt.option('path'))
		var unit = grunt.option('path').split('-');
		var filePath = './chapters/' + unit[0] + '/' + unit[1];
		var templateContent = grunt.file.read('./html_template.html');
		var docTitle = 'Chapter ' + unit[0] + ' - Exercise ' + unit[1];


		grunt.file.write(filePath + '/index.html', grunt.template.process(templateContent, {data: {title: docTitle}}))
		grunt.file.write(filePath + '/app.js', '');
	});

	grunt.registerTask('default', ['browserify', 'connect', 'watch']);
};