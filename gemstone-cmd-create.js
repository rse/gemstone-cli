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

var sprintf = require("sprintfjs")
var chalk   = require("chalk")

module.exports = {
    opts: {
        test1: { type: "boolean", def: false,      desc: "Test1" },
        test2: { type: "string",  def: "testerli", desc: "Test2" },
        test3: { type: "integer", def: 42,         desc: "Test3" }
    },
    args: { min: 0, max: 0 },
    command: function (opts, args) {
        this.result("creating project)
    }
}

