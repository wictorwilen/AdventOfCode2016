class Keypad {
    keyvalues = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    
    constructor() {
        this.x = 1;
        this.y = 1;
    }

    x: number;
    y: number;

    private moveup() {
        this.y = this.y - 1;
        if (this.y < 0) {
            this.y = 0;
        }
    }
    private movedown() {
        this.y = this.y + 1;
        if (this.y > 2) {
            this.y = 2;
        }
    }
    private moveleft() {
        this.x = this.x - 1;
        if (this.x < 0) {
            this.x = 0;
        }
    }
    private moveright() {
        this.x = this.x + 1;
        if (this.x > 2) {
            this.x = 2;
        }
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

    getCurrentCode(): number {
        return this.keyvalues[this.y][this.x];
    }

}
class Bathroom {


    public static run() {

        var stdin = process.openStdin();
        var kp = new Keypad();

        stdin.addListener("data", function (sequence) {
            kp.move(sequence.toString().trim());
            console.log(kp.getCurrentCode());

        });
    }
}
Bathroom.run();