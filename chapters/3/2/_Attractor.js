var V = require('V')
  , utils
  ;

var Attractor = function(cx, canvas, opts) {
  utils = require('utils')(cx, canvas);
  this.cx = cx;
  this.canvas = canvas;

  this.position = new V(utils.HW(), utils.HH());
  this.mass = 20;
  this.G = 1;
}

Attractor.prototype.calculateAttraction = function(m) {
  let force = V.sub(this.position, m.position);
  let distance = force.mag();
  distance = utils.constrain(distance, 5, 25);
  force.normalize();
  var strength = (this.G * this.mass * m.mass) / (distance * distance);

  force.mult(strength);
  return force;
}

Attractor.prototype.display = function() {
  this.cx.save();
  this.cx.fillStyle = 'red';
  utils.ellipse(this.position.x, this.position.y, this.mass * 2);
}

module.exports = Attractor;