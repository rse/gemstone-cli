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
    opts: {},
    args: { min: 0, max: 0 },
    command: function (/* opts, args */) {
        this.result(
            chalk.bold("Gemstone") + " " +
            chalk.blue(sprintf("%d.%d.%d", this.version.major, this.version.minor, this.version.micro)) +
            " (" + chalk.blue(this.version.date) + ")"
        )
    }
}

