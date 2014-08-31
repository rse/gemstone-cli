/*
**  Gemstone -- Best-of-Breed for JavaScript Single-Page-Apps <http://gemstonejs.com>
**  Copyright (c) 2014 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the GNU General Public
**  License (GPL), version 3.0. If a copy of the GPL was not distributed
**  with this file, You can obtain one at http://www.gnu.org/licenses/.
*/

/* global module: true */
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-eslint");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        version: grunt.file.readYAML("VERSION.yaml"),
        jshint: {
            options: {
                jshintrc: "jshint.json"
            },
            gruntfile:   [ "Gruntfile.js" ],
            "gemstone":  [ "gemstone.js", "gemstone-*.js" ]
        },
        eslint: {
            options: {
                config: "eslint.json"
            },
            target: [ "gemstone.js" , "gemstone-*.js" ]
        },
        clean: {
            clean:     [ ],
            distclean: [ "node_modules" ]
        }
    });

    grunt.registerTask("default", [ "jshint", "eslint" ]);
};

