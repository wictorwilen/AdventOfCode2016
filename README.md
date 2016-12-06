# Advent of Code
This is Wictors adventures in the **Advent of Code** event

* http://adventofcode.com/2016

Most of the code are in TypeScript and some in F#

# Setup
To set up the project run the following command

    npm install

# TypeScript
## Transpilation
To transpile all TypeScript files use the following Gulp task

    gulp ts:compile


## Run examples
To run the samples use the following:

    node dist\<year>\<date>\<file>.js

## Debug TypeScript using Visual Studio Code
Start Visual Studio Code and then run the following in the command console

    node --debug dist\<year>\<date>\<file>.js

Then set breakpoints in the TypeScript files in Visual Studio Code and use *Attach* to debug

# F#
## Installation
This requires F# interactive: https://www.microsoft.com/en-us/download/details.aspx?id=48179 

You also might need to run:
    set path=%PATH%;"c:\Program Files (x86)\Microsoft SDKs\F#\4.0\Framework\v4.0\"

## Run examples

     fsi.exe src\<year>\<date>\<file>.fsx