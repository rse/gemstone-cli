/*
**  Gemstone -- Best-of-Breed for JavaScript Single-Page-Apps <http://gemstonejs.com>
**  Copyright (c) 2014 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the GNU General Public
**  License (GPL), version 3.0. If a copy of the GPL was not distributed
**  with this file, You can obtain one at http://www.gnu.org/licenses/.
*/

/* global module:  false */
/* global require: false */
/* global process: false */

/*  foreign modules  */
var chalk    = require("chalk")
var _        = require("lodash")
var Gemstone = require("../gemstone-api")

module.exports = function (grunt) {
    grunt.registerMultiTask("gemstone", "Gemstone", function () {
        /*  prepare options  */
        var options = this.options({
            basedir: ".",
            command: "",
            opts: {},
            args: []
        })
        grunt.verbose.writeflags(options, "Options")

        /*  display header to explicitly inform user about our operation  */
        var cmd = chalk.blue.bold("gemstone")
        if (options.basedir !== ".")
            cmd += " --basedir=\"" + chalk.yellow(options.basedir) + "\""
        cmd += " " + chalk.blue.bold(options.command)
        _.forEach(options.opts, function (val, key) {
            cmd += chalk.blue(" --" + key + "=") + chalk.yellow(val)
        })
        _.forEach(options.args, function (val) {
            cmd += " " + chalk.yellow(val)
        })
        grunt.log.writeln(cmd)

        /*  run Gemstone via API  */
        var gs = new Gemstone({ basedir: options.basedir })
        gs.on("result", function () {
            grunt.log.writeln(chalk.blue("gemstone: ") + gs.result())
        })
        var args = [ options.command, options.opts ].concat(options.args)
        gs.command.apply(gs, args)
    })
}

