class Elevator {
    public static getFloor(input: string): number {
        var floor: number = 0;
        for (var i = 0; i < input.length; i++) {
            var ch = input[i];
            if (ch == '(') {
                floor++;
            } else if (ch == ')') {
                floor--;
            }
        }
        return floor;
    }
    public static stopAtMinus1(input: string): number {
        var floor: number = 0;
        for (var i = 0; i < input.length; i++) {
            var ch = input[i];
            if (ch == '(') {
                floor++;
            } else if (ch == ')') {
                floor--;
            }
            if(floor == -1) {
                return i+1;
            }
        }
        throw 'never reached -1';
    }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input sequence! ', (sequence:string) => {
  console.log(`Floor is ${Elevator.getFloor(sequence)}`);
  console.log(`-1 is reached at ${Elevator.stopAtMinus1(sequence)}`);
  rl.close();
});
