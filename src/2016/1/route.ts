interface location {
    x: number;
    y: number;
}

class Route {
    public static calculateRoute(input: string): number {
        var x: number = 0;
        var y: number = 0;
        var dir: number = 0;

        var arr = input.split(',');

        arr.forEach(arg => {
            arg = arg.trim();
            var direction: string = arg.substr(0, 1);
            var distance: number = Number(arg.substr(1));

            if (direction == 'R') {
                dir += 90;
            } else {
                dir -= 90;
            }
            dir = dir % 360;
            if (dir == -90) {
                dir = 270;
            }
            switch (dir) {
                case 0:
                    y += distance;
                    break;
                case 90:
                    x += distance;
                    break;
                case 180:
                    y -= distance;
                    break;
                case 270:
                    x -= distance;
                    break;
            }
        });

        return Math.abs(x) + Math.abs(y);
    }

    public static calculateRoute2(input: string): number {
        var x: number = 0;
        var y: number = 0;
        var dir: number = 0;

        var arr = input.split(',');

        var locations: location[] = [{ x: 0, y: 0 }];

        for (var l in arr) {
            var arg = arr[l].trim();
            var direction: string = arg.substr(0, 1);
            var distance: number = Number(arg.substr(1));

            if (direction == 'R') {
                dir += 90;
            } else {
                dir -= 90;
            }
            dir = dir % 360;
            
            if (dir == -90) {
                dir = 270;
            }
            switch (dir) {
                case 0:
                    for (var i = 1; i <= distance; i++) {
                        var sameLocation = locations.find(l => {
                            return l.x == x && l.y == y + i;
                        });
                        if (sameLocation !== undefined) {
                            return Math.abs(sameLocation.x) + Math.abs(sameLocation.y);
                        }
                        locations.push({
                            x: x,
                            y: y + i
                        });
                    }
                    y += distance;
                    break;
                case 90:
                    for (var i = 1; i <= distance; i++) {
                        var sameLocation = locations.find(l => {
                            return l.x == x + i && l.y == y;
                        });
                        if (sameLocation !== undefined) {
                            return Math.abs(sameLocation.x) + Math.abs(sameLocation.y);
                        }

                        locations.push({
                            x: x + i,
                            y: y
                        });
                    }
                    x += distance;
                    break;
                case 180:
                    for (var i = 1; i <= distance; i++) {
                        var sameLocation = locations.find(l => {
                            return l.x == x && l.y == y - i;
                        });

                        if (sameLocation !== undefined) {
                            return Math.abs(sameLocation.x) + Math.abs(sameLocation.y);
                        }

                        locations.push({
                            x: x,
                            y: y - i
                        });
                    }
                    y -= distance;
                    break;
                case 270:
                    for (var i = 1; i <= distance; i++) {

                        var sameLocation = locations.find(l => {
                            return l.x == x - i && l.y == y;
                        });
                        if (sameLocation !== undefined) {
                            return Math.abs(sameLocation.x) + Math.abs(sameLocation.y);
                        }

                        locations.push({
                            x: x - i,
                            y: y
                        });
                    }
                    x -= distance;
                    break;
            }
        };

        throw `Did not visit the same location`;
    }

    public static run() {
        var readline = require('readline');
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Input route: ', (sequence: string) => {
            console.log(`The easter bunny is ${Route.calculateRoute(sequence)} blocks away`);
            console.log(`The first same location visited twice is ${Route.calculateRoute2(sequence)} blocks away`);
            rl.close();
        });

    }

}

Route.run();
