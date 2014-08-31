#!/usr/bin/env node
/*
**  Gemstone -- Best-of-Breed for JavaScript Single-Page-Apps <http://gemstonejs.com>
**  Copyright (c) 2014 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the GNU General Public
**  License (GPL), version 3.0. If a copy of the GPL was not distributed
**  with this file, You can obtain one at http://www.gnu.org/licenses/.
*/

/* global require: false */
/* global process: false */
/* global console: false */
/* global __dirname: false */
/* eslint no-console: 0 */

/*  external requirements (standard)  */
var path = require("path")
var fs   = require("fs")
var _    = require("lodash")

/*  internal requirements  */
var Gemstone = require("./gemstone-api")
var parseOptions = require("./gemstone-lib-opts")

/*  die the reasonable way  */
process.on("uncaughtException", function (exc) {
    console.error("gemstone: ERROR: %s", exc.message)
    console.error("gemstone: TRACE: %s", exc.stack)
    process.exit(1)
})

/*  parse global options  */
var gopt = parseOptions("", process.argv, [
    {   names: [ "basedir", "b" ], env: "GEMSTONE_BASEDIR", type: "string", "default": "",
        help: "Gemstone project base directory", helpArg: "DIR" }
])

/*  create new Gemstone instance  */
var gs = new Gemstone({ basedir: gopt.opts.basedir })

/*  dispatch according to command  */
if (gopt.args.length === 0)
    throw new Error("no command given")
var name = gopt.args[0]
if (!fs.existsSync(path.join(__dirname, "gemstone-cmd-" + name + ".js")))
    throw new Error("invalid command \"" + name + "\"")
var cmd = require(path.join(__dirname, "gemstone-cmd-" + name + ".js"))

/*  parse command options  */
var options = []
_.forEach(cmd.opts, function (val, name) {
    var opt = { names: [ name ], type: val.type, "default": val.def, help: val.desc, helpArg: "ARG" }
    if      (opt.type === "boolean") opt.type = "bool"
    else if (opt.type === "number")  opt.type = "integer"
    options.push(opt)
})
var lopt = parseOptions(name, [ gopt.args[0] ].concat(gopt.args), options)

/*  capture results  */
gs.on("result", function () {
    console.log(gs.result())
})

/*  execute command callback  */
gs.command.apply(gs, [ name, lopt.opts ].concat(lopt.args))

