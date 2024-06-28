"use strict";

// import Vector2 from "../geom/Vector2.js";
// import Canvas2D from "../Canvas2D.js";
// import Game from "../Game.js"
// import Mouse from "../input/Mouse.js"
// import MyJoyStick from "../input/MyJoyStick.js"
// import RayCaster from "../game_objects/RayCaster.js"
// import Keys from "../system/Keys.js";
// import Keyboard from "../input/Keyboard.js"

// import { sprites, sounds } from "../Assets.js";

// import {
//     LOG,
//     BALL_SIZE,
//     BORDER_SIZE,
//     HOLE_RADIUS,
//     DELTA,
//     DISPLAY,
//     SOUND_ON,
//     GAME_STOPPED,
//     KEYBOARD_INPUT_ON,
//     TRAIN_ITER,
//     AI_ON,
//     AI_PLAYER_NUM,
//     DISPLAY_TRAINING,
// } from "../Global.js"


const joyStick = new MyJoyStick();

function Stick(position){
    this.position = position;
    this.origin = new Vector2(970,11);
    this.shotOrigin = new Vector2(950,11);
    this.shooting = false;
    this.visible = true;
    this.rotation = 0 + (0 * (Math.PI / 180));
    this.power = 0;
    this.trackMouse = true;
    this.useJoystick = false;
    this.caster = new RayCaster(this.position, this.rotation)
}

Stick.prototype.chooseControl = function() {
  if(this.useJoystick) {
    joyStick.addListeners();
  }
}

Stick.prototype.stickUp = function() {
    if(this.power < 75){
        this.origin.x+=2;
        this.power+=1.2;
    }
}

Stick.prototype.stickDown = function() {
    if(this.power>0){
        this.origin.x-=2;
        this.power-=1.2;
    }
}


Stick.prototype.handleStrike = function() {
    if(Game.isTurn()) {
        if(Game.playerNumber == 1) {
            // console.log(this.power, Mouse.left.down, Keyboard.down(Keys.space));
        }
        if(this.power>0 && Mouse.left.down || this.power>0 && Keyboard.down(Keys.space)){
            this.stickStrike();
        }
    }
    else {
        if(this.useJoystick) {
            this.power = Game.packetData.mobilePower;

            if(this.power > 0) {
                console.log("gotten mobile power", this.power);
                this.stickStrike()
                Game.packetData.mobilePower = 0;
            };
        }
        else if(Game.packetData.power>0 && Game.packetData.leftDown || Game.packetData.power>0 && Game.packetData.space){
            this.stickStrike();
        }
    }

    Game.socket.emit('stick_strike', Game.roomID, this.power, Mouse.left.down, Keyboard.down(Keys.space))
}

Stick.prototype.stickStrike = function() {
    var strike = sounds.strike.cloneNode(true);
    strike.volume = (this.power/(10))<1?(this.power/(10)):1;
    strike.play();
    Game.policy.turnPlayed = true;
    this.shooting = true;
    this.origin = this.shotOrigin.copy();

    Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
    var stick = this;
    setTimeout(function(){stick.visible = false;}, 500);
}

Stick.prototype.stickRotateMain = function() {
    if(Game.isTurn()) {
        var opposite = Mouse.position.y - this.position.y;
        var adjacent = Mouse.position.x - this.position.x;
        this.rotation = Math.atan2(opposite, adjacent);

        Game.socket.emit('stick_rotate', Game.roomID, this.rotation)
    }
    else {
        this.rotation = Game.packetData.rotation;
        // Game.socket.on('stick_rotate', (rotation) => {
        //     this.rotation = rotation;
        // })
    }
}

Stick.prototype.stickRotateMobile = function() {
    // console.log("running rotate, is it my turn", Game.isTurn());
    if(Game.isTurn()) {
        this.rotation = joyStick.deg;
        Game.socket.emit('stick_rotate', Game.roomID, this.rotation)
        // console.log("emitting rotate", this.rotation);
    }
    else {
        // console.log("getting mobile rotation data");
        // this.rotation = Game.packetData.rotation;
    }
}

Stick.prototype.handleMovementInput = function(w, s, keyInput) {
    // console.log("move input");

    if(this.useJoystick) {
        this.origin.x = Game.packetData.originX;
    }
    else {
        if(w && keyInput) {
            this.stickUp();
        }
        else if(s && keyInput) {
            this.stickDown();
        }
    }
}

Stick.prototype.movementInput = function() {
    if(Game.isTurn()) {
        if(Keyboard.down(Keys.W) && KEYBOARD_INPUT_ON){
          this.stickUp();
        }
        else if(Keyboard.down(Keys.S) && KEYBOARD_INPUT_ON){
          this.stickDown();
        }

        Game.socket.emit('movement_input', Game.roomID, Keyboard.down(Keys.W), Keyboard.down(Keys.S), KEYBOARD_INPUT_ON);
    }
    else {
        this.handleMovementInput(Game.packetData.w, Game.packetData.s, Game.packetData.keyInput);
        // Game.socket.on('movement_input', this.handleMovementInput.bind(this));
    }
}

Stick.prototype.mainInput = function() {
    if(this.trackMouse){
        this.stickRotateMain();
    }
    else if(this.useJoystick /* && joyStick.active */) {
        this.stickRotateMobile();
    }
}

Stick.prototype.handleInput = function (delta) {
    if(AI_ON && Game.policy.turn === AI_PLAYER_NUM) return;

    if(Game.policy.turnPlayed) return;

    this.movementInput();

    this.handleStrike();
    
    this.mainInput();

    // const trackMouse = this.trackMouse;
    // if(trackMouse) {
    //     var opposite = Mouse.position.y - this.position.y;
    //     var adjacent = Mouse.position.x - this.position.x;
    //     const rotation = Math.atan2(opposite, adjacent);
    
    //     const w = Keyboard.down(Keys.W);
    //     const s = Keyboard.down(Keys.S);
    //     const space = Keyboard.down(Keys.space);
    //     Game.socket.emit('joystick_update', Game.roomID, w, s, space, Mouse.left.down, Mouse.position.y, Mouse.position.x);
    // }
    // else if(this.useJoystick && joyStick.active) {
    //     // Game.socket.emit('joystick_mobile_update', Game.roomID, w, s, space, Mouse.left.down, rotation)
    // }


    // if(AI_ON && Game.policy.turn === AI_PLAYER_NUM)
    //   return;

    // if(Game.policy.turnPlayed)
    //   return;

    // if(Keyboard.down(Keys.W) && KEYBOARD_INPUT_ON){
    //   if(this.power < 75){
    //     this.origin.x+=2;
    //     this.power+=1.2;
    //   }
    // }

    // if(Keyboard.down(Keys.S) && KEYBOARD_INPUT_ON){
    //   if(this.power>0){
    //     this.origin.x-=2;
    //     this.power-=1.2;
    //   }
    // }

    // else if (this.power>0 && Mouse.left.down || this.power>0 && Keyboard.down(Keys.space)){
    //   // console.log("strike");
    //   var strike = sounds.strike.cloneNode(true);
    //   strike.volume = (this.power/(10))<1?(this.power/(10)):1;
    //   strike.play();
    //   Game.policy.turnPlayed = true;
    //   this.shooting = true;
    //   this.origin = this.shotOrigin.copy();

    //   Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
    //   var stick = this;
    //   setTimeout(function(){stick.visible = false;}, 500);
    // }
    // else if(this.trackMouse){
    //   var opposite = Mouse.position.y - this.position.y;
    //   var adjacent = Mouse.position.x - this.position.x;
    //   this.rotation = Math.atan2(opposite, adjacent);
    // }
    // else if(this.useJoystick && joyStick.active) {
    //   // joyStick.update(Game.gameWorld.whiteBall);

    //   this.rotation = joyStick.deg;

    //   // console.log(joyStick.deg);
    //   // const a = joyStick.x - this.origin.x
    //   // const b = joyStick.y - this.origin.y

    //   // const dist = Math.hypot(a, b)

    //   // console.log(dist);
    //   // console.log(joyStick.deg, this.position);
    //   // if(joyStick.deg > 0) {
    //   //   this.rotation += 0.01
    //   // }
    //   // else if(joyStick.deg < 0) {
    //   //   this.rotation -= 0.01;
    //   // }
    //   // else {
    //   //   joyStick.deg > 0 ? this.rotation += 0.01 : 
    //   // }
    // }
};

Stick.prototype.shoot = function(power, rotation){
  // if(Game.policy.firstPlay) Game.policy.firstPlay = false;
  this.power = power;
  this.rotation = rotation;

  if(Game.sound && SOUND_ON){
    var strike = sounds.strike.cloneNode(true);
    strike.volume = (this.power/(10))<1?(this.power/(10)):1;
    strike.play();
  }
  Game.policy.turnPlayed = true;
  this.shooting = true;
  this.origin = this.shotOrigin.copy();

  Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
  var stick = this;
  setTimeout(function(){stick.visible = false;}, 500);
}

Stick.prototype.update = function(){
    // console.log("updating joystick");
    // console.log(this.useJoystick, Game.isTurn());
    if(this.useJoystick && !Game.isTurn()) {
        // console.log("setting rotation", Game.packetData.rotation);
        this.rotation = Game.packetData.rotation;
    }
  if(this.shooting && !Game.gameWorld.whiteBall.moving)
    this.reset();
};

Stick.prototype.reset = function(){
  this.position.x = Game.gameWorld.whiteBall.position.x;
  this.position.y = Game.gameWorld.whiteBall.position.y;
	this.origin = new Vector2(970,11);
    Game.packetData.originX = 970;
  this.shooting = false;
  this.visible = true;
	this.power = 0;
};

Stick.prototype.draw = function () {
  if(!this.visible) return;
  
  this.caster.update(this.position, this.rotation);

  Canvas2D.drawImage(sprites.stick, this.position,this.rotation, 1, this.origin);

  this.caster.draw();
  // Canvas2D._canvasContext.fillStyle = "#cbcbcb"
  // Canvas2D.drawRect(1500, 5, this.position, this.rotation, 1, new Vector2(0, 3));

  // Canvas2D._canvasContext.save()
  // // Canvas2D._canvasContext.rotate(this.rotation)
  // const ballPosX = Game.gameWorld.whiteBall.position.x;
  // const ballPosY = Game.gameWorld.whiteBall.position.y;

  // console.log(ballPosX, ballPosY);
  // Canvas2D._canvasContext.fillRect(ballPosX, ballPosY, sprites.ball.width, sprites.ball.height);
  // Canvas2D._canvasContext.restore()
};

// export default Stick;
window.Stick = Stick;