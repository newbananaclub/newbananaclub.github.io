module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': true,
		            'spec-char-escape': true,
		            'id-unique': true,
		            'head-script-disabled': true,
		            'style-disabled': true
		        },
		        src: ['index.html']
		    }
		},

		uglify: {
		    build: {
		        files: {
		            'build/js/main.min.js': ['assets/js/main.js']
		        }
		    }
		},

		cssc: {
		    build: {
		        options: {
		            consolidateViaDeclarations: true,
		            consolidateViaSelectors:    true,
		            consolidateMediaQueries:    true
		        },
		        files: {
		            'build/css/style.css': 'build/css/style.css'
		        }
		    }
		},

		cssmin: {
		    build: {
		        src: 'build/css/style.css',
		        dest: 'build/css/style.css'
		    }
		},

		sass: {
		    build: {
		        files: {
		            'build/css/style.css': 'assets/sass/style.scss'
		        }
		    }
		},

		watch: {
		    html: {
		        files: ['index.html'],
		        tasks: ['htmlhint']
		    },
		    js: {
		        files: ['assets/js/main.js'],
		        tasks: ['uglify']
		    },
		    css: {
		        files: ['assets/sass/**/*.scss'],
		        tasks: ['buildcss']
		    }
		}
    });

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);

};