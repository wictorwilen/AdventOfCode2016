'use strict';

import * as Chalk from 'chalk';
import * as _ from 'lodash';

class Screen {
    private matrix: boolean[][];

    public constructor(public w: number, public h: number) {
        this.matrix = new Array(h);
        for (var i = 0; i < h; i++) {
            this.matrix[i] = new Array(w);
            for (var j = 0; j < w; j++) {
                this.matrix[i][j] = false;
            }
        }
    }

    public executeCommand(command: string) {
        var commands: string[] = command.split(' ');
        if (commands[0] == 'rect') {
            var rectCommands: string[] = commands[1].split('x');
            var a = Number(rectCommands[0]);
            var b = Number(rectCommands[1]);
            for (var i = 0; i < b; i++) {
                for (var j = 0; j < a; j++) {
                    this.matrix[i][j] = true;
                }
            }
        } else if (commands[0] == 'rotate') {
            var axisNo = Number(commands[2].split('=')[1]);
            var num = Number(commands[4]);
            if (commands[1] == 'row') {
                for (var c = 0; c < num; c++) {
                    this.matrix[axisNo].unshift(this.matrix[axisNo].pop());
                }
            } else if (commands[1] == 'column') {
                for (var c = 0; c < num; c++) {
                    this.matrix = _.zip(...this.matrix)
                    this.matrix[axisNo].unshift(this.matrix[axisNo].pop());
                    this.matrix = _.zip(...this.matrix)
                }
            }
        }
    }

    public print() {
        for (var i = 0; i < this.matrix.length; i++) {
            var temp = '';
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j]) {
                    temp += '#';
                } else {
                    temp += '.';
                }
            }
            console.log(temp);
        }
    }

    public pixelCount() {
        var c = 0;
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j]) {
                    c++;
                }
            }
        }
        return c;
    }
}


class TwoFactor {
    public static run() {

        var stdin = process.openStdin();

        console.log(Chalk.gray(`Insert data and press enter to end`));
        var screen = new Screen(50, 6);
        stdin.addListener("data", function (sequence: Object) {
            var input = sequence.toString().trim();
            if (input.length == 0) {
                screen.print();
                console.log(Chalk.green(`The pixel count is ${screen.pixelCount()}`))
                stdin.pause();
            }

            screen.executeCommand(input);
            screen.print();
        });
    }
}
TwoFactor.run();