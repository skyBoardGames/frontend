"use strict";

// import Vector2 from "../geom/Vector2.js";
// import Canvas2D from "../Canvas2D.js";

function RayCaster(position, rotation){
    this.width = 1500;
    // this.height = 5;
    this.height = 1;
    this.position = position;
    // this.origin = new Vector2(0, 3);
    this.origin = new Vector2(0, 0);
    this.visible = true;
    this.rotation = rotation;
    this.collided = false;

    this.projection = {
      // width: 5,
      // height: 5,
      width: 1,
      height: 1,
      position: {
        x: 0,
        y: 0,
      },
      rotation: 0,
      origin: new Vector2(0, 0)
      // origin: new Vector2(20, 0)
    }

    this.result = {
      // width: 5,
      // height: 5,
      width: 1,
      height: 1,
      position: {
        x: 0,
        y: 0,
      },
      rotation: 0,
      origin: new Vector2(0, 0)
    }
}

RayCaster.prototype.draw = function() {
  Canvas2D._canvasContext.fillStyle = "#cbcbcb"
  // Canvas2D._canvasContext.fillStyle = "blue"
  Canvas2D.drawRect(this.width, this.height, this.position, this.rotation, 1, this.origin);

  Canvas2D._canvasContext.fillStyle = "red"
  Canvas2D.drawRect(this.projection.width, this.projection.height, this.projection.position, this.projection.rotation, 1, this.projection.origin);

  Canvas2D._canvasContext.fillStyle = "#cbcbcb"
  const newO = new Vector2(0, 0);
  // Canvas2D._canvasContext.fillStyle = "blue"
//   Canvas2D.drawRect(this.result.width, this.result.height, this.result.position, this.result.rotation, 1, this.origin);
  Canvas2D.drawRect(this.result.width, this.result.height, this.result.position, this.result.rotation, 1, newO);

  this.collided = false;
}

RayCaster.prototype.update = function(position, rotation) {
  this.position = position;
  this.rotation = rotation;
  if(this.collided == false) {
    this.width = 1500;
    this.projection.position.x = 0;
    this.projection.position.y = 0;
    this.result.position.x = 0;
    this.result.position.y = 0;
  }
}

// export default RayCaster;
window.RayCaster = RayCaster;