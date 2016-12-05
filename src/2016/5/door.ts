'use strict';

import * as Chalk from 'chalk';

class Door {
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
            var password = '';

            for (var index = 0; count < 8; index++) {
                var hash = crypto.createHash('md5');
                hash.update(`${input}${index}`);
                var digest = hash.digest('hex');
                if (digest.toString().startsWith('00000')) {
                    console.log(Chalk.yellow(digest));
                    password += digest[5];
                    count++;
                }
            }

            console.log(Chalk.green(`Password is ${password}`));

        });
    }
}
Door.run();