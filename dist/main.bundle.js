(self["webpackChunkwebpack_setup"] = self["webpackChunkwebpack_setup"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);




// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// now we will setup our basic variables for the demo
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  // full screen dimensions
  cw = window.innerWidth,
  ch = window.innerHeight,
  // firework collection
  fireworks = [],
  // particle collection
  particles = [],
  // starting hue
  hue = 120,
  // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
  limiterTotal = 5,
  limiterTick = 0,
  // this will time the auto launches of fireworks, one launch per 80 loop ticks
  timerTotal = 220,
  timerTick = 0,
  mousedown = false,
  // mouse x coordinate,s
  mx,
  // mouse y coordinate
  my;

// set canvas dimensions
canvas.width = cw;
canvas.height = ch;

// now we are going to setup our function placeholders for the entire demo

// get a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// calculate the distance between two points
function calculateDistance(p1x, p1y, p2x, p2y) {
  var xDistance = p1x - p2x,
    yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// create firework
function Firework(sx, sy, tx, ty) {
  // actual coordinates
  this.x = sx;
  this.y = sy;
  // starting coordinates
  this.sx = sx;
  this.sy = sy;
  // target coordinates
  this.tx = tx;
  this.ty = ty;
  // distance from starting point to target
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
  this.distanceTraveled = 0;
  // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = [];
  this.coordinateCount = 3;
  // populate initial coordinate collection with the current coordinates
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  this.angle = Math.atan2(ty - sy, tx - sx);
  this.speed = 2;
  this.acceleration = 1.05;
  this.brightness = random(50, 70);
  // circle target indicator radius
  this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function (index) {
  // remove last item in coordinates array
  this.coordinates.pop();
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y]);

  // cycle the circle target indicator radius
  if (this.targetRadius < 8) {
    this.targetRadius += 0.3;
  } else {
    this.targetRadius = 1;
  }

  // speed up the firework
  this.speed *= this.acceleration;

  // get the current velocities based on angle and speed
  var vx = Math.cos(this.angle) * this.speed,
    vy = Math.sin(this.angle) * this.speed;
  // how far will the firework have traveled with velocities applied?
  this.distanceTraveled = calculateDistance(
    this.sx,
    this.sy,
    this.x + vx,
    this.y + vy
  );

  // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
  if (this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.tx, this.ty);
    // remove the firework, use the index passed into the update function to determine which to remove
    fireworks.splice(index, 1);
  } else {
    // target not reached, keep traveling
    this.x += vx;
    this.y += vy;
  }
};

// draw firework
Firework.prototype.draw = function () {
  ctx.beginPath();
  // move to the last tracked coordinate in the set, then draw a line to the current x and y
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1]
  );
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = "hsl(" + hue + ", 100%, " + this.brightness + "%)";
  ctx.stroke();

  ctx.beginPath();
  // draw the target for this firework with a pulsing circle
  ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
  ctx.stroke();
};

// create particle
function Particle(x, y) {
  this.x = x;
  this.y = y;
  // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
  this.coordinates = [];
  this.coordinateCount = 5;
  while (this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }
  // set a random angle in all possible directions, in radians
  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 10);
  // friction will slow the particle down
  this.friction = 0.95;
  // gravity will be applied and pull the particle down
  this.gravity = 1;
  // set the hue to a random number +-20 of the overall hue variable
  this.hue = random(hue - 20, hue + 20);
  this.brightness = random(50, 80);
  this.alpha = 1;
  // set how fast the particle fades out
  this.decay = random(0.015, 0.03);
}

// update particle
Particle.prototype.update = function (index) {
  // remove last item in coordinates array
  this.coordinates.pop();
  // add current coordinates to the start of the array
  this.coordinates.unshift([this.x, this.y]);
  // slow down the particle
  this.speed *= this.friction;
  // apply velocity
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;
  // fade out the particle
  this.alpha -= this.decay;

  // remove the particle once the alpha is low enough, based on the passed in index
  if (this.alpha <= this.decay) {
    particles.splice(index, 1);
  }
};

// draw particle
Particle.prototype.draw = function () {
  ctx.beginPath();
  // move to the last tracked coordinates in the set, then draw a line to the current x and y
  ctx.moveTo(
    this.coordinates[this.coordinates.length - 1][0],
    this.coordinates[this.coordinates.length - 1][1]
  );
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle =
    "hsla(" +
    this.hue +
    ", 100%, " +
    this.brightness +
    "%, " +
    this.alpha +
    ")";
  ctx.stroke();
};

// create particle group/explosion
function createParticles(x, y) {
  // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
  var particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y));
  }
}

// main demo loop
function loop() {
  // this function will run endlessly with requestAnimationFrame
  requestAnimFrame(loop);

  // increase the hue to get different colored fireworks over time
  hue += 0.5;

  // normally, clearRect() would be used to clear the canvas
  // we want to create a trailing effect though
  // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
  ctx.globalCompositeOperation = "destination-out";
  // decrease the alpha property to create more prominent trails
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, cw, ch);
  // change the composite operation back to our main mode
  // lighter creates bright highlight points as the fireworks and particles overlap each other
  ctx.globalCompositeOperation = "lighter";

  // loop over each firework, draw it, update it
  var i = fireworks.length;
  while (i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  // loop over each particle, draw it, update it
  var i = particles.length;
  while (i--) {
    particles[i].draw();
    particles[i].update(i);
  }

  // launch fireworks automatically to random coordinates, when the mouse isn't down
  if (timerTick >= timerTotal) {
    if (!mousedown) {
      // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
      fireworks.push(
        new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2))
      );
      timerTick = 0;
    }
  } else {
    timerTick++;
  }

  // limit the rate at which fireworks get launched when mouse is down
  if (limiterTick >= limiterTotal) {
    if (mousedown) {
      // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
      fireworks.push(new Firework(cw / 2, ch, mx, my));
      limiterTick = 0;
    }
  } else {
    limiterTick++;
  }
}

// mouse event bindings
// update the mouse coordinates on mousemove
canvas.addEventListener("mousemove", function (e) {
  mx = e.pageX - canvas.offsetLeft;
  my = e.pageY - canvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvas.addEventListener("mousedown", function (e) {
  e.preventDefault();
  mousedown = true;
});

canvas.addEventListener("mouseup", function (e) {
  e.preventDefault();
  mousedown = false;
});

// once the window loads, we are ready for some fireworks!
window.onload = loop;






/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected character '@' (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> @import url('https://fonts.cdnfonts.com/css/atari');\n| \n| body {");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXFCOzs7O0FBSXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1zZXR1cC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuXG5cblxuLy8gd2hlbiBhbmltYXRpbmcgb24gY2FudmFzLCBpdCBpcyBiZXN0IHRvIHVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgaW5zdGVhZCBvZiBzZXRUaW1lb3V0IG9yIHNldEludGVydmFsXG4vLyBub3Qgc3VwcG9ydGVkIGluIGFsbCBicm93c2VycyB0aG91Z2ggYW5kIHNvbWV0aW1lcyBuZWVkcyBhIHByZWZpeCwgc28gd2UgbmVlZCBhIHNoaW1cbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIChcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH1cbiAgKTtcbn0pKCk7XG5cbi8vIG5vdyB3ZSB3aWxsIHNldHVwIG91ciBiYXNpYyB2YXJpYWJsZXMgZm9yIHRoZSBkZW1vXG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIiksXG4gIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXG4gIC8vIGZ1bGwgc2NyZWVuIGRpbWVuc2lvbnNcbiAgY3cgPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgY2ggPSB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gIC8vIGZpcmV3b3JrIGNvbGxlY3Rpb25cbiAgZmlyZXdvcmtzID0gW10sXG4gIC8vIHBhcnRpY2xlIGNvbGxlY3Rpb25cbiAgcGFydGljbGVzID0gW10sXG4gIC8vIHN0YXJ0aW5nIGh1ZVxuICBodWUgPSAxMjAsXG4gIC8vIHdoZW4gbGF1bmNoaW5nIGZpcmV3b3JrcyB3aXRoIGEgY2xpY2ssIHRvbyBtYW55IGdldCBsYXVuY2hlZCBhdCBvbmNlIHdpdGhvdXQgYSBsaW1pdGVyLCBvbmUgbGF1bmNoIHBlciA1IGxvb3AgdGlja3NcbiAgbGltaXRlclRvdGFsID0gNSxcbiAgbGltaXRlclRpY2sgPSAwLFxuICAvLyB0aGlzIHdpbGwgdGltZSB0aGUgYXV0byBsYXVuY2hlcyBvZiBmaXJld29ya3MsIG9uZSBsYXVuY2ggcGVyIDgwIGxvb3AgdGlja3NcbiAgdGltZXJUb3RhbCA9IDIyMCxcbiAgdGltZXJUaWNrID0gMCxcbiAgbW91c2Vkb3duID0gZmFsc2UsXG4gIC8vIG1vdXNlIHggY29vcmRpbmF0ZSxzXG4gIG14LFxuICAvLyBtb3VzZSB5IGNvb3JkaW5hdGVcbiAgbXk7XG5cbi8vIHNldCBjYW52YXMgZGltZW5zaW9uc1xuY2FudmFzLndpZHRoID0gY3c7XG5jYW52YXMuaGVpZ2h0ID0gY2g7XG5cbi8vIG5vdyB3ZSBhcmUgZ29pbmcgdG8gc2V0dXAgb3VyIGZ1bmN0aW9uIHBsYWNlaG9sZGVycyBmb3IgdGhlIGVudGlyZSBkZW1vXG5cbi8vIGdldCBhIHJhbmRvbSBudW1iZXIgd2l0aGluIGEgcmFuZ2VcbmZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufVxuXG4vLyBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuZnVuY3Rpb24gY2FsY3VsYXRlRGlzdGFuY2UocDF4LCBwMXksIHAyeCwgcDJ5KSB7XG4gIHZhciB4RGlzdGFuY2UgPSBwMXggLSBwMngsXG4gICAgeURpc3RhbmNlID0gcDF5IC0gcDJ5O1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHhEaXN0YW5jZSwgMikgKyBNYXRoLnBvdyh5RGlzdGFuY2UsIDIpKTtcbn1cblxuLy8gY3JlYXRlIGZpcmV3b3JrXG5mdW5jdGlvbiBGaXJld29yayhzeCwgc3ksIHR4LCB0eSkge1xuICAvLyBhY3R1YWwgY29vcmRpbmF0ZXNcbiAgdGhpcy54ID0gc3g7XG4gIHRoaXMueSA9IHN5O1xuICAvLyBzdGFydGluZyBjb29yZGluYXRlc1xuICB0aGlzLnN4ID0gc3g7XG4gIHRoaXMuc3kgPSBzeTtcbiAgLy8gdGFyZ2V0IGNvb3JkaW5hdGVzXG4gIHRoaXMudHggPSB0eDtcbiAgdGhpcy50eSA9IHR5O1xuICAvLyBkaXN0YW5jZSBmcm9tIHN0YXJ0aW5nIHBvaW50IHRvIHRhcmdldFxuICB0aGlzLmRpc3RhbmNlVG9UYXJnZXQgPSBjYWxjdWxhdGVEaXN0YW5jZShzeCwgc3ksIHR4LCB0eSk7XG4gIHRoaXMuZGlzdGFuY2VUcmF2ZWxlZCA9IDA7XG4gIC8vIHRyYWNrIHRoZSBwYXN0IGNvb3JkaW5hdGVzIG9mIGVhY2ggZmlyZXdvcmsgdG8gY3JlYXRlIGEgdHJhaWwgZWZmZWN0LCBpbmNyZWFzZSB0aGUgY29vcmRpbmF0ZSBjb3VudCB0byBjcmVhdGUgbW9yZSBwcm9taW5lbnQgdHJhaWxzXG4gIHRoaXMuY29vcmRpbmF0ZXMgPSBbXTtcbiAgdGhpcy5jb29yZGluYXRlQ291bnQgPSAzO1xuICAvLyBwb3B1bGF0ZSBpbml0aWFsIGNvb3JkaW5hdGUgY29sbGVjdGlvbiB3aXRoIHRoZSBjdXJyZW50IGNvb3JkaW5hdGVzXG4gIHdoaWxlICh0aGlzLmNvb3JkaW5hdGVDb3VudC0tKSB7XG4gICAgdGhpcy5jb29yZGluYXRlcy5wdXNoKFt0aGlzLngsIHRoaXMueV0pO1xuICB9XG4gIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKHR5IC0gc3ksIHR4IC0gc3gpO1xuICB0aGlzLnNwZWVkID0gMjtcbiAgdGhpcy5hY2NlbGVyYXRpb24gPSAxLjA1O1xuICB0aGlzLmJyaWdodG5lc3MgPSByYW5kb20oNTAsIDcwKTtcbiAgLy8gY2lyY2xlIHRhcmdldCBpbmRpY2F0b3IgcmFkaXVzXG4gIHRoaXMudGFyZ2V0UmFkaXVzID0gMTtcbn1cblxuLy8gdXBkYXRlIGZpcmV3b3JrXG5GaXJld29yay5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIC8vIHJlbW92ZSBsYXN0IGl0ZW0gaW4gY29vcmRpbmF0ZXMgYXJyYXlcbiAgdGhpcy5jb29yZGluYXRlcy5wb3AoKTtcbiAgLy8gYWRkIGN1cnJlbnQgY29vcmRpbmF0ZXMgdG8gdGhlIHN0YXJ0IG9mIHRoZSBhcnJheVxuICB0aGlzLmNvb3JkaW5hdGVzLnVuc2hpZnQoW3RoaXMueCwgdGhpcy55XSk7XG5cbiAgLy8gY3ljbGUgdGhlIGNpcmNsZSB0YXJnZXQgaW5kaWNhdG9yIHJhZGl1c1xuICBpZiAodGhpcy50YXJnZXRSYWRpdXMgPCA4KSB7XG4gICAgdGhpcy50YXJnZXRSYWRpdXMgKz0gMC4zO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGFyZ2V0UmFkaXVzID0gMTtcbiAgfVxuXG4gIC8vIHNwZWVkIHVwIHRoZSBmaXJld29ya1xuICB0aGlzLnNwZWVkICo9IHRoaXMuYWNjZWxlcmF0aW9uO1xuXG4gIC8vIGdldCB0aGUgY3VycmVudCB2ZWxvY2l0aWVzIGJhc2VkIG9uIGFuZ2xlIGFuZCBzcGVlZFxuICB2YXIgdnggPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQsXG4gICAgdnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gIC8vIGhvdyBmYXIgd2lsbCB0aGUgZmlyZXdvcmsgaGF2ZSB0cmF2ZWxlZCB3aXRoIHZlbG9jaXRpZXMgYXBwbGllZD9cbiAgdGhpcy5kaXN0YW5jZVRyYXZlbGVkID0gY2FsY3VsYXRlRGlzdGFuY2UoXG4gICAgdGhpcy5zeCxcbiAgICB0aGlzLnN5LFxuICAgIHRoaXMueCArIHZ4LFxuICAgIHRoaXMueSArIHZ5XG4gICk7XG5cbiAgLy8gaWYgdGhlIGRpc3RhbmNlIHRyYXZlbGVkLCBpbmNsdWRpbmcgdmVsb2NpdGllcywgaXMgZ3JlYXRlciB0aGFuIHRoZSBpbml0aWFsIGRpc3RhbmNlIHRvIHRoZSB0YXJnZXQsIHRoZW4gdGhlIHRhcmdldCBoYXMgYmVlbiByZWFjaGVkXG4gIGlmICh0aGlzLmRpc3RhbmNlVHJhdmVsZWQgPj0gdGhpcy5kaXN0YW5jZVRvVGFyZ2V0KSB7XG4gICAgY3JlYXRlUGFydGljbGVzKHRoaXMudHgsIHRoaXMudHkpO1xuICAgIC8vIHJlbW92ZSB0aGUgZmlyZXdvcmssIHVzZSB0aGUgaW5kZXggcGFzc2VkIGludG8gdGhlIHVwZGF0ZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgd2hpY2ggdG8gcmVtb3ZlXG4gICAgZmlyZXdvcmtzLnNwbGljZShpbmRleCwgMSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGFyZ2V0IG5vdCByZWFjaGVkLCBrZWVwIHRyYXZlbGluZ1xuICAgIHRoaXMueCArPSB2eDtcbiAgICB0aGlzLnkgKz0gdnk7XG4gIH1cbn07XG5cbi8vIGRyYXcgZmlyZXdvcmtcbkZpcmV3b3JrLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKCkge1xuICBjdHguYmVnaW5QYXRoKCk7XG4gIC8vIG1vdmUgdG8gdGhlIGxhc3QgdHJhY2tlZCBjb29yZGluYXRlIGluIHRoZSBzZXQsIHRoZW4gZHJhdyBhIGxpbmUgdG8gdGhlIGN1cnJlbnQgeCBhbmQgeVxuICBjdHgubW92ZVRvKFxuICAgIHRoaXMuY29vcmRpbmF0ZXNbdGhpcy5jb29yZGluYXRlcy5sZW5ndGggLSAxXVswXSxcbiAgICB0aGlzLmNvb3JkaW5hdGVzW3RoaXMuY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV1bMV1cbiAgKTtcbiAgY3R4LmxpbmVUbyh0aGlzLngsIHRoaXMueSk7XG4gIGN0eC5zdHJva2VTdHlsZSA9IFwiaHNsKFwiICsgaHVlICsgXCIsIDEwMCUsIFwiICsgdGhpcy5icmlnaHRuZXNzICsgXCIlKVwiO1xuICBjdHguc3Ryb2tlKCk7XG5cbiAgY3R4LmJlZ2luUGF0aCgpO1xuICAvLyBkcmF3IHRoZSB0YXJnZXQgZm9yIHRoaXMgZmlyZXdvcmsgd2l0aCBhIHB1bHNpbmcgY2lyY2xlXG4gIGN0eC5hcmModGhpcy50eCwgdGhpcy50eSwgdGhpcy50YXJnZXRSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgY3R4LnN0cm9rZSgpO1xufTtcblxuLy8gY3JlYXRlIHBhcnRpY2xlXG5mdW5jdGlvbiBQYXJ0aWNsZSh4LCB5KSB7XG4gIHRoaXMueCA9IHg7XG4gIHRoaXMueSA9IHk7XG4gIC8vIHRyYWNrIHRoZSBwYXN0IGNvb3JkaW5hdGVzIG9mIGVhY2ggcGFydGljbGUgdG8gY3JlYXRlIGEgdHJhaWwgZWZmZWN0LCBpbmNyZWFzZSB0aGUgY29vcmRpbmF0ZSBjb3VudCB0byBjcmVhdGUgbW9yZSBwcm9taW5lbnQgdHJhaWxzXG4gIHRoaXMuY29vcmRpbmF0ZXMgPSBbXTtcbiAgdGhpcy5jb29yZGluYXRlQ291bnQgPSA1O1xuICB3aGlsZSAodGhpcy5jb29yZGluYXRlQ291bnQtLSkge1xuICAgIHRoaXMuY29vcmRpbmF0ZXMucHVzaChbdGhpcy54LCB0aGlzLnldKTtcbiAgfVxuICAvLyBzZXQgYSByYW5kb20gYW5nbGUgaW4gYWxsIHBvc3NpYmxlIGRpcmVjdGlvbnMsIGluIHJhZGlhbnNcbiAgdGhpcy5hbmdsZSA9IHJhbmRvbSgwLCBNYXRoLlBJICogMik7XG4gIHRoaXMuc3BlZWQgPSByYW5kb20oMSwgMTApO1xuICAvLyBmcmljdGlvbiB3aWxsIHNsb3cgdGhlIHBhcnRpY2xlIGRvd25cbiAgdGhpcy5mcmljdGlvbiA9IDAuOTU7XG4gIC8vIGdyYXZpdHkgd2lsbCBiZSBhcHBsaWVkIGFuZCBwdWxsIHRoZSBwYXJ0aWNsZSBkb3duXG4gIHRoaXMuZ3Jhdml0eSA9IDE7XG4gIC8vIHNldCB0aGUgaHVlIHRvIGEgcmFuZG9tIG51bWJlciArLTIwIG9mIHRoZSBvdmVyYWxsIGh1ZSB2YXJpYWJsZVxuICB0aGlzLmh1ZSA9IHJhbmRvbShodWUgLSAyMCwgaHVlICsgMjApO1xuICB0aGlzLmJyaWdodG5lc3MgPSByYW5kb20oNTAsIDgwKTtcbiAgdGhpcy5hbHBoYSA9IDE7XG4gIC8vIHNldCBob3cgZmFzdCB0aGUgcGFydGljbGUgZmFkZXMgb3V0XG4gIHRoaXMuZGVjYXkgPSByYW5kb20oMC4wMTUsIDAuMDMpO1xufVxuXG4vLyB1cGRhdGUgcGFydGljbGVcblBhcnRpY2xlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgLy8gcmVtb3ZlIGxhc3QgaXRlbSBpbiBjb29yZGluYXRlcyBhcnJheVxuICB0aGlzLmNvb3JkaW5hdGVzLnBvcCgpO1xuICAvLyBhZGQgY3VycmVudCBjb29yZGluYXRlcyB0byB0aGUgc3RhcnQgb2YgdGhlIGFycmF5XG4gIHRoaXMuY29vcmRpbmF0ZXMudW5zaGlmdChbdGhpcy54LCB0aGlzLnldKTtcbiAgLy8gc2xvdyBkb3duIHRoZSBwYXJ0aWNsZVxuICB0aGlzLnNwZWVkICo9IHRoaXMuZnJpY3Rpb247XG4gIC8vIGFwcGx5IHZlbG9jaXR5XG4gIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gIHRoaXMueSArPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQgKyB0aGlzLmdyYXZpdHk7XG4gIC8vIGZhZGUgb3V0IHRoZSBwYXJ0aWNsZVxuICB0aGlzLmFscGhhIC09IHRoaXMuZGVjYXk7XG5cbiAgLy8gcmVtb3ZlIHRoZSBwYXJ0aWNsZSBvbmNlIHRoZSBhbHBoYSBpcyBsb3cgZW5vdWdoLCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGluZGV4XG4gIGlmICh0aGlzLmFscGhhIDw9IHRoaXMuZGVjYXkpIHtcbiAgICBwYXJ0aWNsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuLy8gZHJhdyBwYXJ0aWNsZVxuUGFydGljbGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gIGN0eC5iZWdpblBhdGgoKTtcbiAgLy8gbW92ZSB0byB0aGUgbGFzdCB0cmFja2VkIGNvb3JkaW5hdGVzIGluIHRoZSBzZXQsIHRoZW4gZHJhdyBhIGxpbmUgdG8gdGhlIGN1cnJlbnQgeCBhbmQgeVxuICBjdHgubW92ZVRvKFxuICAgIHRoaXMuY29vcmRpbmF0ZXNbdGhpcy5jb29yZGluYXRlcy5sZW5ndGggLSAxXVswXSxcbiAgICB0aGlzLmNvb3JkaW5hdGVzW3RoaXMuY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV1bMV1cbiAgKTtcbiAgY3R4LmxpbmVUbyh0aGlzLngsIHRoaXMueSk7XG4gIGN0eC5zdHJva2VTdHlsZSA9XG4gICAgXCJoc2xhKFwiICtcbiAgICB0aGlzLmh1ZSArXG4gICAgXCIsIDEwMCUsIFwiICtcbiAgICB0aGlzLmJyaWdodG5lc3MgK1xuICAgIFwiJSwgXCIgK1xuICAgIHRoaXMuYWxwaGEgK1xuICAgIFwiKVwiO1xuICBjdHguc3Ryb2tlKCk7XG59O1xuXG4vLyBjcmVhdGUgcGFydGljbGUgZ3JvdXAvZXhwbG9zaW9uXG5mdW5jdGlvbiBjcmVhdGVQYXJ0aWNsZXMoeCwgeSkge1xuICAvLyBpbmNyZWFzZSB0aGUgcGFydGljbGUgY291bnQgZm9yIGEgYmlnZ2VyIGV4cGxvc2lvbiwgYmV3YXJlIG9mIHRoZSBjYW52YXMgcGVyZm9ybWFuY2UgaGl0IHdpdGggdGhlIGluY3JlYXNlZCBwYXJ0aWNsZXMgdGhvdWdoXG4gIHZhciBwYXJ0aWNsZUNvdW50ID0gMzA7XG4gIHdoaWxlIChwYXJ0aWNsZUNvdW50LS0pIHtcbiAgICBwYXJ0aWNsZXMucHVzaChuZXcgUGFydGljbGUoeCwgeSkpO1xuICB9XG59XG5cbi8vIG1haW4gZGVtbyBsb29wXG5mdW5jdGlvbiBsb29wKCkge1xuICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwgcnVuIGVuZGxlc3NseSB3aXRoIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICByZXF1ZXN0QW5pbUZyYW1lKGxvb3ApO1xuXG4gIC8vIGluY3JlYXNlIHRoZSBodWUgdG8gZ2V0IGRpZmZlcmVudCBjb2xvcmVkIGZpcmV3b3JrcyBvdmVyIHRpbWVcbiAgaHVlICs9IDAuNTtcblxuICAvLyBub3JtYWxseSwgY2xlYXJSZWN0KCkgd291bGQgYmUgdXNlZCB0byBjbGVhciB0aGUgY2FudmFzXG4gIC8vIHdlIHdhbnQgdG8gY3JlYXRlIGEgdHJhaWxpbmcgZWZmZWN0IHRob3VnaFxuICAvLyBzZXR0aW5nIHRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIHRvIGRlc3RpbmF0aW9uLW91dCB3aWxsIGFsbG93IHVzIHRvIGNsZWFyIHRoZSBjYW52YXMgYXQgYSBzcGVjaWZpYyBvcGFjaXR5LCByYXRoZXIgdGhhbiB3aXBpbmcgaXQgZW50aXJlbHlcbiAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3V0XCI7XG4gIC8vIGRlY3JlYXNlIHRoZSBhbHBoYSBwcm9wZXJ0eSB0byBjcmVhdGUgbW9yZSBwcm9taW5lbnQgdHJhaWxzXG4gIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwgMCwgMCwgMC41KVwiO1xuICBjdHguZmlsbFJlY3QoMCwgMCwgY3csIGNoKTtcbiAgLy8gY2hhbmdlIHRoZSBjb21wb3NpdGUgb3BlcmF0aW9uIGJhY2sgdG8gb3VyIG1haW4gbW9kZVxuICAvLyBsaWdodGVyIGNyZWF0ZXMgYnJpZ2h0IGhpZ2hsaWdodCBwb2ludHMgYXMgdGhlIGZpcmV3b3JrcyBhbmQgcGFydGljbGVzIG92ZXJsYXAgZWFjaCBvdGhlclxuICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJsaWdodGVyXCI7XG5cbiAgLy8gbG9vcCBvdmVyIGVhY2ggZmlyZXdvcmssIGRyYXcgaXQsIHVwZGF0ZSBpdFxuICB2YXIgaSA9IGZpcmV3b3Jrcy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBmaXJld29ya3NbaV0uZHJhdygpO1xuICAgIGZpcmV3b3Jrc1tpXS51cGRhdGUoaSk7XG4gIH1cblxuICAvLyBsb29wIG92ZXIgZWFjaCBwYXJ0aWNsZSwgZHJhdyBpdCwgdXBkYXRlIGl0XG4gIHZhciBpID0gcGFydGljbGVzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIHBhcnRpY2xlc1tpXS5kcmF3KCk7XG4gICAgcGFydGljbGVzW2ldLnVwZGF0ZShpKTtcbiAgfVxuXG4gIC8vIGxhdW5jaCBmaXJld29ya3MgYXV0b21hdGljYWxseSB0byByYW5kb20gY29vcmRpbmF0ZXMsIHdoZW4gdGhlIG1vdXNlIGlzbid0IGRvd25cbiAgaWYgKHRpbWVyVGljayA+PSB0aW1lclRvdGFsKSB7XG4gICAgaWYgKCFtb3VzZWRvd24pIHtcbiAgICAgIC8vIHN0YXJ0IHRoZSBmaXJld29yayBhdCB0aGUgYm90dG9tIG1pZGRsZSBvZiB0aGUgc2NyZWVuLCB0aGVuIHNldCB0aGUgcmFuZG9tIHRhcmdldCBjb29yZGluYXRlcywgdGhlIHJhbmRvbSB5IGNvb3JkaW5hdGVzIHdpbGwgYmUgc2V0IHdpdGhpbiB0aGUgcmFuZ2Ugb2YgdGhlIHRvcCBoYWxmIG9mIHRoZSBzY3JlZW5cbiAgICAgIGZpcmV3b3Jrcy5wdXNoKFxuICAgICAgICBuZXcgRmlyZXdvcmsoY3cgLyAyLCBjaCwgcmFuZG9tKDAsIGN3KSwgcmFuZG9tKDAsIGNoIC8gMikpXG4gICAgICApO1xuICAgICAgdGltZXJUaWNrID0gMDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGltZXJUaWNrKys7XG4gIH1cblxuICAvLyBsaW1pdCB0aGUgcmF0ZSBhdCB3aGljaCBmaXJld29ya3MgZ2V0IGxhdW5jaGVkIHdoZW4gbW91c2UgaXMgZG93blxuICBpZiAobGltaXRlclRpY2sgPj0gbGltaXRlclRvdGFsKSB7XG4gICAgaWYgKG1vdXNlZG93bikge1xuICAgICAgLy8gc3RhcnQgdGhlIGZpcmV3b3JrIGF0IHRoZSBib3R0b20gbWlkZGxlIG9mIHRoZSBzY3JlZW4sIHRoZW4gc2V0IHRoZSBjdXJyZW50IG1vdXNlIGNvb3JkaW5hdGVzIGFzIHRoZSB0YXJnZXRcbiAgICAgIGZpcmV3b3Jrcy5wdXNoKG5ldyBGaXJld29yayhjdyAvIDIsIGNoLCBteCwgbXkpKTtcbiAgICAgIGxpbWl0ZXJUaWNrID0gMDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGltaXRlclRpY2srKztcbiAgfVxufVxuXG4vLyBtb3VzZSBldmVudCBiaW5kaW5nc1xuLy8gdXBkYXRlIHRoZSBtb3VzZSBjb29yZGluYXRlcyBvbiBtb3VzZW1vdmVcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gIG14ID0gZS5wYWdlWCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICBteSA9IGUucGFnZVkgLSBjYW52YXMub2Zmc2V0VG9wO1xufSk7XG5cbi8vIHRvZ2dsZSBtb3VzZWRvd24gc3RhdGUgYW5kIHByZXZlbnQgY2FudmFzIGZyb20gYmVpbmcgc2VsZWN0ZWRcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbW91c2Vkb3duID0gdHJ1ZTtcbn0pO1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBtb3VzZWRvd24gPSBmYWxzZTtcbn0pO1xuXG4vLyBvbmNlIHRoZSB3aW5kb3cgbG9hZHMsIHdlIGFyZSByZWFkeSBmb3Igc29tZSBmaXJld29ya3MhXG53aW5kb3cub25sb2FkID0gbG9vcDtcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9