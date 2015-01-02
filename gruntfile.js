module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        gruntDry: {
            pkg: pkg,
            deps: {
                chai: {
                    browserBuild: 'node_modules/chai/chai.js',
                    testOnly: true
                }
            }
        }
    });

    grunt.task.loadNpmTasks('grunt-dry');
};
