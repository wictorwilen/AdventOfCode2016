class Keypad2 {
    keyvalues = [
        ['-', '-', '1', '-', '-'],
        ['-', '2', '3', '4', '-'],
        ['5', '6', '7', '8', '9'],
        ['-', 'A', 'B', 'C', '-'],
        ['-', '-', 'D', '-', '-']];

    constructor() {
        this.y = 2;
        this.x = 0;
    }

    x: number;
    y: number;

    private moveup() {
        var t = this.y - 1;
        if (t < 0) {
            t = 0;
        }
        if (this.keyvalues[this.x][t] == '-') {
            return;
        }
        this.y = t;
    }

    private movedown() {
        var t = this.y + 1;
        if (t > 4) {
            t = 4;
        }
        if (this.keyvalues[this.x][t] == '-') {
            return;
        }
        this.y = t;
    }

    private moveleft() {
        var t = this.x - 1;
        if (t < 0) {
            t = 0;
        }
        if (this.keyvalues[t][this.y] == '-') {
            return;
        }
        this.x = t;
    }

    private moveright() {
        var t = this.x + 1;
        if (t > 4) {
            t = 4;
        }
        if (this.keyvalues[t][this.y] == '-') {
            return;
        }
        this.x = t;
    }

    move(sequence: string) {
        for (var i = 0; i < sequence.length; i++) {
            switch (sequence[i]) {
                case 'U':
                    this.moveup();
                    break;
                case 'D':
                    this.movedown();
                    break;
                case 'L':
                    this.moveleft();
                    break;
                case 'R':
                    this.moveright();
                    break;
                default:
                    console.log('invalid input');
            }
        }
    }

    getCurrentCode(): string {
        return this.keyvalues[this.y][this.x];
    }

}
class Bathroom2 {


    public static run() {

        var stdin = process.openStdin();
        var kp = new Keypad2();

        stdin.addListener("data", function (sequence) {
            kp.move(sequence.toString().trim());
            console.log(kp.getCurrentCode());

        });
    }
}
Bathroom2.run();