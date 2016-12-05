'use strict';

import * as Chalk from 'chalk';

class AlphaNumber {
    public char: string;
    public count: number;
}
class Room {
    public encryptedName: string;
    public sectorId: number;
    public checksum: string;
    public realChecksum: string;
    public decodedName: string;

    buckets: AlphaNumber[] = [];


    constructor(public code: string) {
        this.decode();
    }

    decode(): void {
        var lastDash = this.code.lastIndexOf('-');
        var firstBracket = this.code.indexOf('[');

        this.encryptedName = this.code.substring(0, lastDash);

        this.sectorId = Number(this.code.substr(lastDash + 1, firstBracket - lastDash - 1));

        this.checksum = this.code.substring(firstBracket + 1, this.code.length - 1);

        // calculate the "real" checksum
        for (var i = 0; i < this.encryptedName.length; i++) {
            var ch = this.encryptedName[i];
            if (/^[ a-z]+$/i.test(ch)) {
                var bucket = this.buckets.findIndex(a => { return a.char == ch });
                if (bucket >= 0) {
                    this.buckets[bucket].count = this.buckets[bucket].count + 1;
                }
                else {
                    this.buckets.push({ char: ch, count: 1 });
                }
            }
        }
        this.buckets.sort((a, b) => {
            var r = b.count - a.count;
            if (r == 0) {
                return a.char.charCodeAt(0) - b.char.charCodeAt(0);
            }
            return r;
        });
        this.realChecksum = '';
        for (var j = 0; j < this.buckets.length && j < 5; j++) {
            this.realChecksum += this.buckets[j].char;
        }

        // decode the name
        var a = 'a'.charCodeAt(0);
        var mod = 'z'.charCodeAt(0) - a + 1;
        this.decodedName = '';
        for (var i = 0; i < this.encryptedName.length; i++) {
            if (this.encryptedName[i] == '-') {
                this.decodedName += ' ';
            } else {
                var chr = this.encryptedName[i].charCodeAt(0) - a;
                chr = (chr + this.sectorId) % mod;
                this.decodedName += String.fromCharCode(chr + a);
            }
        }
    }



    isReal(): Boolean {
        return this.checksum == this.realChecksum;
    }

    toString(): string {
        return `${this.code}`;
    }
}

class Rooms {


    public static run() {

        var stdin = process.openStdin();

        var sectorSum = 0;
        stdin.addListener("data", function (sequence: Object) {
            var input = sequence.toString().trim();
            if (input.length == 0) {
                console.log(`The sum of the sectors are: ${sectorSum}`);
                stdin.pause();
            }

            var room = new Room(input);

            if (room.isReal()) {
                sectorSum += room.sectorId;

                if(room.decodedName.indexOf('object') >= 0) {
                    console.log(Chalk.yellow(`Found room: '${room.decodedName}' with index: ${room.sectorId}`);
                }
            }
        });
    }
}
Rooms.run();