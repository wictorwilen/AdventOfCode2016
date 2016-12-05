class Triangle {
    constructor(public a: number, public b: number, public c: number) {

    }
    isValid(): Boolean {
        if (this.a + this.b > this.c &&
            this.b + this.c > this.a &&
            this.c + this.a > this.b) {
            return true;
        }
        return false;
    }
    toString(): string {
        return `${this.a} ${this.b} ${this.c}`;
    }
}

class Triangles {


    public static run() {

        var stdin = process.openStdin();

        var triangles: Triangle[] = [];
        var tri = 0;
        var tribuffer: Triangle[] = [null, null, null];
        var tritriangles: Triangle[] = [];

        stdin.addListener("data", function (sequence: Object) {
            if (sequence.toString().trim().length == 0) {
                console.log(`Valid triangles = ${triangles.length}`);
                console.log(`Valid triangles #2 = ${tritriangles.length}`);
                //tritriangles.forEach(t => { console.log(t.toString()) });
                stdin.pause();
            }

            var data = sequence.toString().trim().split(' ').filter(v => { return v.length > 0 }).map(v => { return Number(v) });
            
            var t = new Triangle(data[0], data[1], data[2]);

            if (t.isValid()) {
                triangles.push(t);
            }

            tribuffer[tri] = t;
            
            if (tri == 2) {
                var t2a = new Triangle(tribuffer[0].a, tribuffer[1].a, tribuffer[2].a);
                if(t2a.isValid()){
                    tritriangles.push(t2a);
                }
                var t2b = new Triangle(tribuffer[0].b, tribuffer[1].b, tribuffer[2].b);
                if(t2b.isValid()){
                    tritriangles.push(t2b);
                }
                var t2c = new Triangle(tribuffer[0].c, tribuffer[1].c, tribuffer[2].c);
                if(t2c.isValid()){
                    tritriangles.push(t2c);
                }
            }
            tri = (tri + 1) % 3;
        });

    }
}
Triangles.run();