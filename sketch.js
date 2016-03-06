var sketch = function (p) {

    p.setup = function () {
        var canvas = p.createCanvas(640, 360);
        p.background(75);
        p.noStroke();
        for (var i = 0; i < 5000; i++) {
            var x = p.random(p.width),
                y = p.random(p.height),
                r = 16,
                cr = p.random(100, 255),
                cb = p.random(100, 255);
            p.fill(cr, 0, 0, 120);
            p.ellipse(x, y, r, r);
            p.fill(p.random(0, 255), 120);
            p.ellipse(x, y, r, r);
        }
        p.saveCanvas(canvas, 'myGraphic', 'png');
        p.noLoop();
    };

};

function main() {
    var p5sketch = new p5(sketch, "p5-sketch");
};