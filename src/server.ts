'use strict';

import * as Express from 'Express';
import * as bodyParser from 'body-parser';
import * as chalk from 'chalk';
import { Settings } from './Settings';


// locals
var server = Express();
var logger = require('connect-logger');

//server.use(Express.static('dist/webhooks'));

/* Set up the server */
server.use(logger());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* /: default */
server.get('/', (request, response, next) => {
    response.send(`<html>
    <head>
    <title>Advent of Code 2016</title>
    </head>
    <body>
    Hello World
    </body>
</html> `);
    next();
});



server.listen(Settings.Port, () => {
    console.log(chalk.gray(`Listening on ${Settings.Port}`));
})

