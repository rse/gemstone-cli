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
/* global console: false */

var dashdash = require("dashdash")

module.exports = function (cmd, argv, options) {
    /*  always add a help option  */
    var opts = [{
        names: [ "help", "h" ], type: "bool", "default": false,
        help: "Print this help and exit."
    }]

    /*  create a suitable parser instance  */
    var parser = dashdash.createParser({
        options: opts.concat(options),
        interspersed: false,
        allowUnknown: false
    })

    /*  parse the supplied argument vector  */
    var result = {}
    try {
        result.opts = parser.parse(argv)
        result.args = result.opts._args
        delete result.opts._args
        delete result.opts._order
    } catch (e) {
        if (cmd === "")
            throw new Error("failed to parse global options: %s", e.message)
        else
            throw new Error("failed to parse options of command \"" + cmd + "\": %s", e.message)
        process.exit(1)
    }

    /*  process the added help option  */
    if (result.opts.help) {
        var help = parser.help({ includeEnv: false }).trimRight()
        if (cmd === "")
            console.log(
                "gemstone: USAGE: gemstone [global-options] command [options] [arguments]\n" +
                "gemstone: USAGE: global-options are:\n" +
                help.replace(/^/mg, "gemstone: USAGE: "))
        else
            console.log(
                "gemstone: USAGE: gemstone " + cmd + " [options] [arguments]\n" +
                "gemstone: USAGE: options are:\n" +
                help.replace(/^/mg, "gemstone: USAGE: "))
        process.exit(0)
    }

    /*  cleanup and return the results  */
    delete result.opts.help
    return result
}

