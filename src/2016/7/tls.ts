'use strict';

import * as Chalk from 'chalk';

class IP {
    constructor(public sequence: string) {
    }

    isValidTls(): boolean {
        var buffer: string[] = new Array(4);
        var inBrackets = false;
        var ok = false;
        for (var i = 0; i < this.sequence.length; i++) {
            var ch = this.sequence[i];
            if (ch == '[') {
                inBrackets = true;
                buffer = new Array(4);
            } else if (ch == ']') {
                inBrackets = false;
                buffer = new Array(4);
            } else {
                buffer.shift();
                buffer[3] = this.sequence[i];
                if (buffer[0] === buffer[3] &&
                    buffer[1] === buffer[2] &&
                    buffer[0] !== buffer[1]) {
                    if (inBrackets) {
                        return false;
                    } else {
                        ok = true;
                    }
                }
            }
        }
        return ok;
    }

    public aba: string;
    public abaPos: number;

    isValidSsl(): boolean {
        var buffer: string[] = new Array(3);
        var inBrackets = false;
        var ok = false;
        for (var i = 0; i < this.sequence.length; i++) {
            var ch = this.sequence[i];
            if (ch == '[') {
                inBrackets = true;
                buffer = new Array(3);
            } else if (ch == ']') {
                inBrackets = false;
                buffer = new Array(3);
            } else {
                if (!inBrackets) {

                    buffer.shift();
                    buffer[2] = ch;

                    if (buffer[0] === buffer[2] &&
                        buffer[0] !== buffer[1]) {
                        ok = this.isValidBab(buffer.join(''));
                        if (ok) {
                            this.aba = buffer.join('');
                            this.abaPos = i - 2;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public bab: string;
    public babPos: number;

    isValidBab(aba: string): boolean {
        var buffer: string[] = new Array(3);
        var inBrackets = false;
        var ok = false;
        for (var i = 0; i < this.sequence.length; i++) {
            var ch = this.sequence[i];
            if (ch == '[') {
                inBrackets = true;
                buffer = new Array(3);
            } else if (ch == ']') {
                if (ok) {
                    return true;
                }
                inBrackets = false;
                buffer = new Array(3);
            } else {
                if (inBrackets) {
                    buffer.shift();
                    buffer[2] = ch;
                    if (buffer[0] === aba[1] &&
                        buffer[1] === aba[0] &&
                        buffer[2] === aba[1] &&
                        buffer[0] !== buffer[1]) {
                        this.bab = buffer.join('');
                        this.babPos = i - 2;
                        ok = true;
                    }
                }
            }
        }
        return false;
    }
}

class Tls {
    public static run() {

        var stdin = process.openStdin();

        console.log(Chalk.gray(`Insert data and press enter to end`));

        var tls: IP[] = [];
        var ssl: IP[] = [];

        stdin.addListener("data", function (sequence: Object) {
            var input = sequence.toString().trim();
            if (input.length == 0) {
                console.log(Chalk.green(`Found ${tls.length} correct TLS sequences`));
                console.log(Chalk.green(`Found ${ssl.length} correct SSL sequences`));

                /*for (var i in ssl) {
                    var s = ssl[i]
                    if (s.babPos > s.abaPos) {
                        console.log(Chalk.blue(`${i}: `) +
                            Chalk.bold(s.sequence.split(']').length + ':' + s.sequence.split('[').length) +
                            s.sequence.substring(0, s.abaPos) +
                            Chalk.red(s.sequence.substring(s.abaPos, s.abaPos + 3)) +
                            s.sequence.substring(s.abaPos + 3, s.babPos) +
                            Chalk.green(s.sequence.substring(s.babPos, s.babPos + 3)) +
                            s.sequence.substring(s.babPos + 3, s.sequence.length)
                        );
                    } else {

                        console.log(Chalk.blue(`${i}: `) +
                            Chalk.bold(s.sequence.split(']').length + ':' + s.sequence.split('[').length) +
                            s.sequence.substring(0, s.babPos) +
                            Chalk.green(s.sequence.substring(s.babPos, s.babPos + 3)) +
                            s.sequence.substring(s.babPos + 3, s.abaPos) +
                            Chalk.red(s.sequence.substring(s.abaPos, s.abaPos + 3)) +
                            s.sequence.substring(s.abaPos + 3, s.sequence.length)
                        );
                    }
                };*/
                stdin.pause();
            }
            var ip = new IP(input);
            if (ip.isValidTls()) {
                tls.push(ip);
            }
            if (ip.isValidSsl()) {
                ssl.push(ip);
            }
        });
    }
}
Tls.run();