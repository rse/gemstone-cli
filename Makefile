##
##  Gemstone -- Best-of-Breed for JavaScript Single-Page-Apps <http://gemstonejs.com>
##  Copyright (c) 2014 Ralf S. Engelschall <http://engelschall.com>
##
##  This Source Code Form is subject to the terms of the GNU General Public
##  License (GPL), version 3.0. If a copy of the GPL was not distributed
##  with this file, You can obtain one at http://www.gnu.org/licenses/.
##

NPM   = npm
GRUNT = ./node_modules/grunt-cli/bin/grunt

all: build

bootstrap:
	@if [ ! -x $(GRUNT) ]; then $(NPM) install; fi

build: bootstrap
	@$(GRUNT)

clean: bootstrap
	@$(GRUNT) clean:clean

distclean: bootstrap
	@$(GRUNT) clean:clean clean:distclean

update-package-json: bootstrap
	$(NPM) install npm-check-updates
	./node_modules/npm-check-updates/bin/npm-check-updates -u

