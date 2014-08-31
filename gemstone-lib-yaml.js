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

var fs   = require("fs")
var yaml = require("js-yaml")

module.exports = {
    load: function (filename) {
        var obj
        try {
            obj = yaml.safeLoad(fs.readFileSync(filename, { encoding: "utf8" }), {
                filename: filename,
                schema: yaml.DEFAULT_SAFE_SCHEMA
            });
        }
        catch (e) {
            throw new Error("failed to parse YAML file \"" + filename + "\": %s", e.message)
        }
        return obj
    },
    save: function (filename, obj) {
        var txt = yaml.safeDump(obj, {
            schema: yaml.DEFAULT_SAFE_SCHEMA,
            indent: 4,
            flowLevel: 3
        })
        fs.writeFileSync(filename, txt, { encoding: "utf8" })
    }
}

