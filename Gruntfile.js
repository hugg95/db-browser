module.exports = function(grunt) {
    grunt.initConfig({
        'build-atom-shell': {
            tag: 'v0.22.1',
            nodeVersion: '0.12.0',
            buildDir: './',
            projectName: 'DB-Browser',
            productName: 'DB-Browser'
        }
    });

    grunt.loadNpmTasks('grunt-build-atom-shell');

};

