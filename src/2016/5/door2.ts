'use strict';

import * as Chalk from 'chalk';

class Door2 {
    public static run() {

        var stdin = process.openStdin();

        var sectorSum = 0;
        stdin.addListener("data", function (sequence: Object) {
            var input = sequence.toString().trim();
            if (input.length == 0) {
                stdin.pause();
            }

            console.log(Chalk.grey('Thinking...'));

            const crypto = require('crypto');

            var count = 0;
            var password: string[] = ['_', '_', '_', '_', '_', '_', '_', '_'];

            for (var index = 0; count < 8; index++) {
                var hash = crypto.createHash('md5');
                hash.update(`${input}${index}`);
                var digest = hash.digest('hex');
                if (digest.toString().startsWith('00000')) {

                    console.log(Chalk.yellow(digest));

                    var position: string = digest[5];

                    if (position.charCodeAt(0) >= '0'.charCodeAt(0) &&
                        position.charCodeAt(0) <= '7'.charCodeAt(0)) {
                        var pos = Number(position.charCodeAt(0) - '0'.charCodeAt(0));
                        if (password[pos] == '_') {
                            password[pos] = digest[6];
                            count++;
                        } else {
                            console.log(Chalk.red(`Position in use: ${position}`));    
                        }
                    }
                    else {
                        console.log(Chalk.red(`Invalid position: ${position}`));
                    }
                }
            }

            console.log(Chalk.green(`Password is ${password.join('')}`));

        });
    }
}
Door2.run();