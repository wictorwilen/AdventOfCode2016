'use strict';

import * as Chalk from 'chalk';

class MessageBucket {
    constructor(public character: string, public count: number) {

    }
}

class Message {
    public static run() {

        var stdin = process.openStdin();

        var buckets: MessageBucket[][] = null;
        
        console.log(Chalk.gray(`Insert data and press enter to end`));

        stdin.addListener("data", function (sequence: Object) {
            var input = sequence.toString().trim();
            if (input.length == 0) {
                var message = '';
                var message2 = '':
                for (var j = 0; j < buckets.length; j++) {
                    buckets[j].sort((a, b) => { return b.count - a.count });
                    message += buckets[j][0].character; 
                    message2 += buckets[j][buckets[j].length -1].character;                                       
                }
                console.log(Chalk.green(`The error-corrected message is ${message}`));
                console.log(Chalk.green(`The second error-corrected message is ${message2}`));
                stdin.pause();
            }

            if (buckets == null) {
                buckets = new Array(input.length);
            }

            for (var i = 0; i < input.length; i++) {
                var ch = input[i];

                if (buckets[i] == undefined) {
                    buckets[i] = [];
                }

                var index = buckets[i].findIndex(mb => { return mb.character == ch; });
                if (index >= 0) {
                    buckets[i][index].count += 1;
                } else {
                    buckets[i].push(new MessageBucket(ch, 1));
                }
            }

             
        });
    }
}
Message.run();