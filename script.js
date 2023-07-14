var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    height, width, text, gindex, grads;

text = {
    content: 'boofd.site',
    fontSize: 20,
    fontFamily: 'Century Gothic'
};

context.font = 'bold ' + text.fontSize + 'pt ' + text.fontFamily;
text.width = context.measureText(text.content).width;
height = canvas.height = text.fontSize * 2;
width = canvas.width = text.width;
// changed canvas size, must reset font.
context.font = 'bold ' + text.fontSize + 'pt ' + text.fontFamily;
grads = generateGrads(64,0.3,text.width);
gindex = grads.length - 1;
context.fillStyle = makeGrad(['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple'], text.width);
context.fillText(text.content, 0, text.fontSize / 2 + height / 2);

function generateGrads(len, freq, width) {
    var colors = [];
    for (var i = 0; i < len; i++) {
        red = ~~ (Math.sin(freq * i + 0) * 127 + 128);
        green = ~~ (Math.sin(freq * i + 2) * 127 + 128);
        blue = ~~ (Math.sin(freq * i + 4) * 127 + 128);
        colors.push('rgb(' + red + ',' + green + ',' + blue + ')');
    }
    return colors.map(function (el, i, arr) {
        var tmp = arr.slice(),
            slice = tmp.splice(-i);
        return makeGrad(slice.concat(tmp), width);
    });
}

function makeGrad(colors, width) {
    var d = colors.length - 1;
    var grad = context.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, colors[0]);
    for (var i = 1; i < d; i++) {
        grad.addColorStop(i / d, colors[i]);
    }
    grad.addColorStop(1, colors[d]);
    return grad;
}
render();
function render() {
    requestAnimationFrame(render);
    var grad = grads[gindex];
    context.clearRect(0, 0, width, height);
    context.fillStyle = grad;
    context.fillText(text.content, 0, text.fontSize / 2 + height / 2);
    gindex--;
    if (gindex < 0) {
        gindex = grads.length - 1;
    }
}