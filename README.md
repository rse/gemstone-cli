
Gemstone
========

- Bower library provisioning
- Browserify application assembly
- Scaffolding files
- Convenience runtime library

$ gemstone --gopt=value command --lopt=value larg1 larg2
| Gemstone({ gopt: value }).command({ lopt: value }, larg1, larg2)

This is the Gemstone Command-Line Interface (CLI) (NPM: "gemstone").

    $ gemstone
      [-b|--basedir <director>]
      <command>
      [<command-options>]
      [<command-args>]

global-options:

    $ gemstone version

    $ gemstone create project
      [-n|--name <name>]
      [-v|--version <version>]
      [-d|--description <description>]
      [-l|--license <license>]
      [-h|--homepage <url>]
      [-a|--author <author>]
      [-k|--keywords <keywords>]

    $ gemstore add <bower-id>[@<version>]:<entry-symbol>[:<rel-path>[,<rel-path>,...]] [<alias>]
      gemstone add jquery@2.1.0:jQuery:dist/jquery.js jq

    $ gemstone create composite <name>

    $ gemstone create widget <name>

    $ gemstone create widget <name>

    $ gemstone

