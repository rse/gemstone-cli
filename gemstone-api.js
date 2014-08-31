/*
**  Gemstone -- Best-of-Breed for JavaScript Single-Page-Apps <http://gemstonejs.com>
**  Copyright (c) 2014 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the GNU General Public
**  License (GPL), version 3.0. If a copy of the GPL was not distributed
**  with this file, You can obtain one at http://www.gnu.org/licenses/.
*/

/* global require: false */
/* global module: false */
/* global __dirname: false */

/*  external requirements (standard)  */
var path   = require("path")
var fs     = require("fs")
var events = require("events")
var util   = require("util")

/*  external requirements (extra)  */
var _      = require("lodash")
var glob   = require("glob")

/*  internal requirements  */
var yaml   = require("./gemstone-lib-yaml")

/*  determine available commands  */
var cmds = glob("gemstone-cmd-*.js", { cwd: __dirname, sync: true })
    .map(function (x) { return x.replace(/^gemstone-cmd-(.+)\.js$/, "$1") })

/*  create top-level API class  */
function Gemstone (opts) {
    /*  allow to be called without "new"  */
    if (!(this instanceof Gemstone))
        return new Gemstone(opts)

    /*  initialize event functionality  */
    events.EventEmitter.call(this)

    /*  provide default configuration  */
    this.basedir = "."
    this.version = yaml.load(path.join(__dirname, "VERSION.yaml"))

    /*  override default configuration  */
    if (typeof opts === "object") {
        if (typeof opts.basedir !== "undefined")
            this.basedir = opts.basedir
    }

    /*  resolve project base directory  */
    this.basedir = path.resolve(this.basedir)
    var basedir = this.basedir
    while (true) {
        if (   fs.existsSync(path.join(basedir, ".gemstone.yaml"))
            || fs.existsSync(path.join(basedir, "gemstone.yaml")))
            break
        var parent = path.resolve(basedir, "..")
        if (parent === basedir)
            throw new Error("cannot find neither \"gemstone.yaml\" nor \".gemstone.yaml\"" +
                " under \"" + this.basedir + "\"")
        basedir = parent
    }
    this.basedir = basedir

    /*  read project configuration  */
    if (fs.existsSync(path.join(this.basedir, ".gemstone.yaml")))
       this.project = yaml.load(path.join(this.basedir, ".gemstone.yaml"))
    else
       this.project = yaml.load(path.join(this.basedir, "gemstone.yaml"))
}

/*  inherit event functionality  */
util.inherits(Gemstone, events.EventEmitter)

/*  the generic command dispatching functionality  */
Gemstone.prototype.command = function (name, options) {
    /*  load command  */
    if (!fs.existsSync(path.join(__dirname, "gemstone-cmd-" + name + ".js")))
        throw new Error("invalid command \"" + name + "\"")
    var cmd = require(path.join(__dirname, "gemstone-cmd-" + name + ".js"))

    /*  determine options  */
    var opts = _.zipObject(_.map(_.pairs(cmd.opts), function (x) { return [ x[0], x[1].def ] }))
    _.forEach(options, function (val, name) {
        if (typeof opts[name] === "undefined")
            throw new Error("invalid option: \"" + name + "\"")
        if (typeof opts[name] !== typeof options[name])
            throw new Error("invalid type \"" + typeof options[name] + "\" for option \"" + name + "\"")
        opts[name] = options[name]
    })

    /*  determine arguments  */
    var args = Array.prototype.slice.call(arguments, 2)
    if (!(cmd.args.min <= args.length && args.length <= cmd.args.max))
        throw new Error("invalid number of arguments")

    /*  initialize the result capturing  */
    this.result()

    /*  execute command  */
    cmd.command.call(this, opts, args)

    /*  allow method chaining  */
    return this
}

/*  the result capturing functionality  */
Gemstone.prototype.result = function (result) {
    if (arguments.length === 1) {
        this._result += result
        this.emit("result")
    }
    else {
        result = this._result
        this._result = ""
        return result
    }
}

/*  the specific command dispatching functionality  */
cmds.forEach(function (cmd) {
    Gemstone.prototype[cmd] = function () {
        return this.command.apply(this, [ cmd ].concat(Array.prototype.slice.call(arguments, 0)))
    }
})

/*  export the class  */
module.exports = Gemstone

