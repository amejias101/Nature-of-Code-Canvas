var canvas = document.getElementById('canvas')
  , cx = canvas.getContext('2d')
  , Walker = require('./_Walker')
  , utils = require('utils')(cx, canvas);

var H = canvas.height
  , W = canvas.width
;

var walker;

function setup() {
  walker = new Walker(cx, {x: W / 2, y: H / 2, width: 1});
}

function draw() {
  walker.step();
  walker.display();

  window.requestAnimationFrame(draw);
}


(function() {
  setup();
  window.requestAnimationFrame(draw);
}());