"use strict";

// import Vector2 from "../geom/Vector2.js";
// import {
//     SOUND_ON,
    
// } from "../Global.js"
// import Color from "../system/Color.js"
// import Canvas2D from "../Canvas2D.js";
// import Game from "../Game.js"

// import { sprites, sounds } from "../Assets.js";

function Ball(initPos,color){
	this.initPos = initPos;
    this.position = initPos.copy();
    this.origin = new Vector2(25,25);
    this.velocity = Vector2.zero;
    this.color = color; 
    this.moving = false;
    this.visible = true;
    this.inHole = false;
}

Object.defineProperty(Ball.prototype, "color",
    {
    	get: function(){
    		if(this.sprite == sprites.redBall){
    			return Color.red;
    		}
    		else if(this.sprite == sprites.yellowBall){
    			return Color.yellow;
    		}
			  else if(this.sprite == sprites.blackBall){
    			return Color.black;
    		}
			  else if(this.sprite == sprites.ball0) {return Color["0"]}
			  else if(this.sprite == sprites.ball1) {return Color["1"]}
			  else if(this.sprite == sprites.ball2) {return Color["2"]}
			  else if(this.sprite == sprites.ball3) {return Color["3"]}
			  else if(this.sprite == sprites.ball4) {return Color["4"]}
			  else if(this.sprite == sprites.ball5) {return Color["5"]}
			  else if(this.sprite == sprites.ball7) {return Color["7"]}
			  else if(this.sprite == sprites.ball8) {return Color["8"]}
			  else if(this.sprite == sprites.ball9) {return Color["9"]}
			  else if(this.sprite == sprites.ball10) {return Color["10"]}
			  else if(this.sprite == sprites.ball11) {return Color["11"]}
			  else if(this.sprite == sprites.ball12) {return Color["12"]}
			  else if(this.sprite == sprites.ball13) {return Color["13"]}
			  else if(this.sprite == sprites.ball14) {return Color["14"]}
			  // else if(this.sprite == sprites.ball15) {return Color["15"]}
    		else{
    			return Color.white;
    		}
    	},
        set: function (value) {
            if (value === Color.red){
                this.sprite = sprites.redBall;
            }
            else if(value == Color.yellow){
            	this.sprite = sprites.yellowBall;
            }
            else if(value == Color["0"]) {
              this.sprite = sprites.ball0;
            }
            else if(value == Color["2"]) this.sprite = sprites.ball2;
            else if(value == Color["4"]) this.sprite = sprites.ball4;
            else if(value == Color["8"]) this.sprite = sprites.ball8;
            else if(value == Color["10"]) this.sprite = sprites.ball10;
            else if(value == Color["12"]) this.sprite = sprites.ball12;
            else if(value == Color["14"]) this.sprite = sprites.ball14;

			      else if(value == Color.black){
            	this.sprite = sprites.blackBall;
            }
            else if(value == Color["1"]) this.sprite = sprites.ball1;
            else if(value == Color["3"]) this.sprite = sprites.ball3;
            else if(value == Color["5"]) this.sprite = sprites.ball5;
            else if(value == Color["7"]) this.sprite = sprites.ball7;
            else if(value == Color["9"]) this.sprite = sprites.ball9;
            else if(value == Color["11"]) this.sprite = sprites.ball11;
            else if(value == Color["13"]) this.sprite = sprites.ball13;
            else{
            	this.sprite = sprites.ball;
            }
        }
    });

Ball.prototype.shoot = function(power, angle){
    if(power <= 0)
        return;

    this.moving = true;

    this.velocity = calculateBallVelocity(power,angle);
}

var calculateBallVelocity = function(power, angle){

    return new Vector2(100*Math.cos(angle)*power,100*Math.sin(angle)*power);
}

Ball.prototype.update = function(delta){

    this.updatePosition(delta);

    this.velocity.multiplyWith(0.98);

	if(this.moving && Math.abs(this.velocity.x) < 1 && Math.abs(this.velocity.y) < 1){
        this.stop();
    }
}

Ball.prototype.updatePosition = function(delta){

    if(!this.moving || this.inHole)
        return;
    var ball = this;
    var newPos = this.position.add(this.velocity.multiply(delta));


	if(Game.policy.isInsideHole(newPos)){
    // console.log("in hole");
        if(Game.sound && SOUND_ON){
            var holeSound = sounds.hole.cloneNode(true);
            holeSound.volume = 0.5;
            holeSound.play();
        }
		this.position = newPos;
        this.inHole = true;
        setTimeout(function(){ball.visible=false;ball.velocity = Vector2.zero;}, 100);
        Game.policy.handleBallInHole(this);
		return;
	}

    var collision = this.handleCollision(newPos);

    if(collision){
		this.velocity.multiplyWith(0.95);
    }else{
    	this.position = newPos;
    }
}

Ball.prototype.handleCollision = function(newPos){

	var collision = false;

	if(Game.policy.isXOutsideLeftBorder(newPos, this.origin)){
        this.velocity.x = -this.velocity.x;
        this.position.x = Game.policy.leftBorderX + this.origin.x;
        collision = true;
    }
    else if(Game.policy.isXOutsideRightBorder(newPos, this.origin)){
        this.velocity.x = -this.velocity.x;
        this.position.x = Game.policy.rightBorderX - this.origin.x;
        collision = true;
    }

    if(Game.policy.isYOutsideTopBorder(newPos, this.origin)){
        this.velocity.y = -this.velocity.y;
        this.position.y = Game.policy.topBorderY + this.origin.y;
        collision = true;
    }
    else if(Game.policy.isYOutsideBottomBorder(newPos, this.origin)){
        this.velocity.y = -this.velocity.y;
        this.position.y = Game.policy.bottomBorderY - this.origin.y;
        collision = true;
    }

    return collision;
}

Ball.prototype.stop = function(){

    this.moving = false;
    this.velocity = Vector2.zero;
}

Ball.prototype.reset = function(){
	this.inHole = false;
	this.moving = false;
	this.velocity = Vector2.zero;
	this.position = this.initPos;
	this.visible = true;
}

Ball.prototype.out = function(){

	this.position = new Vector2(0, 900);
	this.visible = false;
	this.inHole = true;

}

Ball.prototype.draw = function () {
    if(!this.visible) return;

    if(!isNaN(this.color)) {
      // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new Vector2(20, 20));
      Canvas2D.drawImage(this.sprite, this.position, 0, 1, new Vector2(20, 20));

      Canvas2D._canvasContext.fillStyle = "blue";
      Canvas2D.drawRect(2, 2, this.position, 0, 1, new Vector2(1, 1));
    }
    else {
      // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new Vector2(25, 25));
      Canvas2D.drawImage(this.sprite, this.position, 0, 1, new Vector2(25, 25));
    }

        // Canvas2D._canvasContext.fillStyle = "red";
  // Canvas2D.drawRect(this.sprite.width, this.sprite.height, this.position, 0, 1, new Vector2(25, 25))
  // Canvas2D._canvasContext.save();
  // Canvas2D._canvasContext.scale(0.6533333333333333, 0.6533333333333333);
  // Canvas2D._canvasContext.translate(this.position.x, this.position.y);
  // Canvas2D._canvasContext.rotate(0);
  // Canvas2D._canvasContext.fillRect(-25, -25, this.sprite.width, this.sprite.height);
  // // Canvas2D._canvasContext.drawImage(sprite, 0, 0,
  // //     sprite.width, sprite.height,
  // //     -origin.x * scale, -origin.y * scale,
  // //     sprite.width * scale, sprite.height * scale);
  // Canvas2D._canvasContext.restore();
};

// export default Ball;
window.Ball = Ball;