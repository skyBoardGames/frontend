// import Canvas2D from "../Canvas2D.js";
// import Game from "../Game.js";

var MyJoyStick = function() {
  this.x = 0;
  this.y = 0;
  this.moveX = 0;
  this.moveY = 0;
  this.prevMoveX = 0;
  this.prevMoveY = 0;
  this.deg = 0;
  this.active = false;
};

MyJoyStick.prototype.handleStart = function(e) {
  if(!Game.isTurn()) return;

  console.log("touch start");
  
  this.x = e.touches[0].pageX;
  this.y = e.touches[0].pageY;
}

/**
 * @param {{ initPos,position, origin, velocity, color, moving, visible, inHole}} whiteBall
 */

MyJoyStick.prototype.handleMove = function(e, whiteBall) {
    if(!Game.isTurn()) return;
  var canvasScale = Canvas2D.scale;
  const widthToUse = Canvas2D._div.getBoundingClientRect().width;
  const heightToUse = Canvas2D._div.getBoundingClientRect().height;

  const cWidthToUse = Canvas2D._canvas.getBoundingClientRect().width;
  const cHeightToUse = Canvas2D._canvas.getBoundingClientRect().height;

  const parentX = (widthToUse / 2) - (cWidthToUse / 2);
  const parentY = (heightToUse / 2) - (cHeightToUse / 2);

  var mx = (e.touches[0].pageY - parentY) / canvasScale.y;
  var my = (((e.touches[0].pageX - parentX) - cWidthToUse) / canvasScale.x)

//   console.log(mx, my);

  const p1 = {
    x: Math.abs(whiteBall.position.x),
    y: Math.abs(whiteBall.position.y)
  }

  const p2 = {
    x: Math.abs(mx),
    y: Math.abs(my)
  }


  // const angleDEG = (Math.atan2(p2.y - p1.y, p2.x - p1.x)) * 180 / Math.PI;
  const angleRAD = (Math.atan2(p2.y - p1.y, p2.x - p1.x));

  // console.log(angleRAD);
  // console.log(angleDEG);

  this.deg = angleRAD;

  this.active = true

  // this.moveX = (this.x - e.touches[0].pageX);
  // this.moveY = (this.y - e.touches[0].pageY);

  // let rads = Math.atan2(this.moveY, this.moveX);
  
  // const deg = rads * 180 / Math.PI;
  
  // this.deg = deg;

  // console.log(Mouse._position.x, Mouse._position.y);
  // console.log(e.touches[0].pageX, e.touches[0].pageY);
  // console.log(Math.abs(mx), Math.abs(my));

  // console.log(moveX, moveY);
  // console.log("moving");

  // this.x = e.touches[0].pageX
  // this.y = e.touches[0].pageY
  this.x = e.touches[0].pageX
  this.y = e.touches[0].pageY
}

// /**
//  * @param {{ initPos,position, origin, velocity, color, moving, visible, inHole}} whiteBall
//  */

MyJoyStick.prototype.update = function(whiteBall) {

  // console.log(whiteBall.position.x, whiteBall.position.y, Mouse.position.x, Mouse.position.y);
  // this.active = true

  // console.log(this.moveX, this.prevMoveX);
  // if(this.moveX == this.prevMoveX) {
  //   this.deg = 0;
  // }

  
  // this.deg = deg;

  // this.x = e.touches[0].pageX
  // this.y = e.touches[0].pageY

  // this.prevMoveX = this.moveX;
  // this.prevMoveY = this.moveY;
}

MyJoyStick.prototype.addListeners = function() {
  const element = document.querySelector('canvas');

  // console.log("add listeners");
  document.body.addEventListener("contextmenu", (e) => e.preventDefault())

  window.addEventListener("contextmenu", (e) => e.preventDefault())

  element.addEventListener("touchstart", (e) => {
    if(!Game.isTurn()) return;
    e.stopPropagation();

    this.handleStart(e);
  }, false);
  element.addEventListener("touchmove", (e) => {
    if(!Game.isTurn()) return;
    e.stopPropagation();

    this.handleMove(e, Game.gameWorld.whiteBall);
  }, false);
  element.addEventListener("touchend", (e) => {
    if(!Game.isTurn()) return;
    this.active = false;
  }, false);
  

  // element.addEventListener("tou")
}

MyJoyStick.prototype.handleInput = function() {
  
}

// export default MyJoyStick;
window.MyJoyStick = MyJoyStick;