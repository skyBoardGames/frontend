"use strict";

// import Vector2 from "./geom/Vector2.js";
// import Canvas2D from "./Canvas2D.js";
// import Color from "./system/Color.js"
// import Mouse from "./input/Mouse.js"
// import Keyboard from "./input/Keyboard.js"
// import Ball from "./game_objects/Ball.js"

// import { sprites, sounds } from "./Assets.js";
// import Stick from "./game_objects/Stick.js";
// import Game from "./Game.js";

// import AI from "./AI/AITrainer.js"

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
// } from "./Global.js"

function GameWorld() {

    this.whiteBallStartingPosition = new Vector2(413,413);

    // const offsetX = 0.89830508474576271186440677966102;
    // const offsetY = 0.89830508474576271186440677966102;
    const offsetX = 1;
    const offsetY = 1;

    this.redBalls = [
    new Ball(new Vector2(1056 * offsetX, 433 * offsetY),Color["0"]),//3
    new Ball(new Vector2(1090 * offsetX, 374 * offsetY),Color["2"]),//4
    new Ball(new Vector2(1126 * offsetX, 393 * offsetY),Color["4"]),//8
    new Ball(new Vector2(1126 * offsetX, 472 * offsetY),Color["8"]),//10;
    new Ball(new Vector2(1162 * offsetX, 335 * offsetY),Color["10"]),//11
    new Ball(new Vector2(1162 * offsetX, 374 * offsetY),Color["12"]),//12
    new Ball(new Vector2(1162 * offsetX, 452 * offsetY),Color["14"])//14
    // new Ball(new Vector2(1056 * offsetX, 433 * offsetY),Color.red),//3
    // new Ball(new Vector2(1090 * offsetX, 374 * offsetY),Color.red),//4
    // new Ball(new Vector2(1126 * offsetX, 393 * offsetY),Color.red),//8
    // new Ball(new Vector2(1126 * offsetX, 472 * offsetY),Color.red),//10;
    // new Ball(new Vector2(1162 * offsetX, 335 * offsetY),Color.red),//11
    // new Ball(new Vector2(1162 * offsetX, 374 * offsetY),Color.red),//12
    // new Ball(new Vector2(1162 * offsetX, 452 * offsetY),Color.red)//14
    ]

    this.yellowBalls = [
    new Ball(new Vector2(1022 * offsetX, 413),Color["1"]),//1
    // new Ball(new Vector2(1022 * offsetX, 371),Color["1"]),//1
    new Ball(new Vector2(1056 * offsetX, 393 * offsetY),Color["3"]),//2
    new Ball(new Vector2(1090 * offsetX, 452 * offsetY),Color["5"]),//6
    new Ball(new Vector2(1126 * offsetX, 354 * offsetY),Color["7"]),//7
    new Ball(new Vector2(1126 * offsetX, 433 * offsetY),Color["9"]),//9
    new Ball(new Vector2(1162 * offsetX, 413 * offsetY),Color["11"]),//13
    new Ball(new Vector2(1162 * offsetX, 491 * offsetY),Color["13"])//15
    // new Ball(new Vector2(1022 * offsetX, 413),Color.yellow),//1
    // // new Ball(new Vector2(1022 * offsetX, 371),Color.yellow),//1
    // new Ball(new Vector2(1056 * offsetX, 393 * offsetY),Color.yellow),//2
    // new Ball(new Vector2(1090 * offsetX, 452 * offsetY),Color.yellow),//6
    // new Ball(new Vector2(1126 * offsetX, 354 * offsetY),Color.yellow),//7
    // new Ball(new Vector2(1126 * offsetX, 433 * offsetY),Color.yellow),//9
    // new Ball(new Vector2(1162 * offsetX, 413 * offsetY),Color.yellow),//13
    // new Ball(new Vector2(1162 * offsetX, 491 * offsetY),Color.yellow)//15
    ];

    this.whiteBall = new Ball(new Vector2(413, 413),Color.white);
    // this.whiteBall = new Ball(new Vector2(720, 513),Color.white);
    this.blackBall = new Ball(new Vector2(1090 * offsetX, 413 * offsetY),Color.black);
    // this.blackBall = new Ball(new Vector2(413 * offsetX, 1090 * offsetY),Color.black);

    this.balls = [
    this.yellowBalls[0],
    this.yellowBalls[1],
    this.redBalls[0],
    this.redBalls[1],
    this.blackBall,
    this.yellowBalls[2],
    this.yellowBalls[3],
    this.redBalls[2],
    this.yellowBalls[4],
    this.redBalls[3],
    this.redBalls[4],
    this.redBalls[5],
    this.yellowBalls[5],
    this.redBalls[6],
    this.yellowBalls[6],
    this.whiteBall]

    this.stick = new Stick({ x : 413, y : 413 });
    // this.stick = new Stick({ x : 720, y : 513 });

    this.gameOver = false;
}

GameWorld.prototype.getBallsSetByColor = function(color){
    if(color === Color.red || color == "even"){
        return this.redBalls;
    }
    if(color === Color.yellow || color == "odd"){
        return this.yellowBalls;
    }
    if(color === Color.white){
        return this.whiteBall;
    }
    if(color === Color.black){
        return this.blackBall;
    }
}

GameWorld.prototype.handleInput = function (delta) {
    // const isTurn = Game.policy.turn == Game.playerNumber;

    this.stick.handleInput(delta);
};

GameWorld.prototype.handleCaster = function (ball, delta) {
  // 1126 354
  
  const caster = this.stick.caster;

  const lineStart = {
    x: caster.position.x,
    y: caster.position.y,
  }

  const x2 = (lineStart.x + caster.width) * Math.cos(caster.rotation);
  const y2 = (lineStart.y + caster.height) * Math.sin(caster.rotation);
  
  const lineEnd = {
    x: x2,
    y: y2,
  }

  const p1 = {
    x: caster.position.x,
    y: caster.position.y,
  }
  // const p1 = {
  //   x: caster.position.x - caster.origin.x,
  //   y: caster.position.y - caster.origin.y,
  // }

  const p2 = {
    x: ball.position.x,
    y: ball.position.y,
  }

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  // 436
  const distance = Math.hypot(dx, dy);

  if(distance > caster.width) return;
 
  const cosAngle = Math.cos(caster.rotation);
  const sinAngle = Math.sin(caster.rotation);

  const testX = distance * cosAngle;
  const testY = distance * sinAngle;

  const rayCastX = caster.position.x + testX;
  const rayCastY = caster.position.y + testY;

  const circlePointDx = rayCastX - p2.x;
  const circlePointDy = rayCastY - p2.y;

  const circlePointMag = Math.sqrt(Math.pow(circlePointDx, 2) + Math.pow(circlePointDy, 2))

  if(circlePointMag < BALL_SIZE / 2) {
    if(!caster.collided) caster.collided = true;

    const newDx = p2.x - p1.x;
    const newDy = p2.y - p1.y;

    const newDistance = Math.hypot(newDx, newDy);

    const projectionX = newDistance * cosAngle;
    const projectionY = newDistance * sinAngle;

    const subFactorX = cosAngle * 45;
    const subFactorY = sinAngle * 45;

    const rayCastX = caster.position.x + (projectionX - subFactorX);
    const rayCastY = caster.position.y + (projectionY - subFactorY);

    // console.log(newDistance, distance);
    
    caster.projection.position.x = rayCastX;
    caster.projection.position.y = rayCastY;

    caster.width = distance;
    // caster.width = newDistance;

    // console.log(p2.x, caster.projection.position.x);

    /* const adjacent = p2.x - caster.projection.position.x;
    const opposite = p2.y - caster.projection.position.y; */
    const adjacent = p2.x - caster.projection.position.x;
    const opposite = p2.y - caster.projection.position.y;

    let ballRotation = Math.atan2(opposite, adjacent);

    // console.log(opposite, adjacent);

    // console.log(ballRotation * 180 / Math.PI);
    // console.log(ballRotation * 180 / Math.PI);

    // console.log(p2.x, p2.y);

    caster.result.position.x = p2.x;
    caster.result.position.y = p2.y;
  
    /* const radFactor = circlePointMag / (BALL_SIZE / 2);
    
    const ballProjectionX = Math.cos(radFactor * ballRotation);
    const ballProjectionY = Math.sin(radFactor * ballRotation);

    caster.result.position.x += 30 * ballProjectionX
    caster.result.position.y += 30 * ballProjectionY */
    
    caster.result.width = 30;
    // caster.result.rotation = Math.atan2(p2.y - caster.result.position.y, p2.x - caster.result.position.x);
    caster.result.rotation = ballRotation;
  }
  else {
    // caster.width = 1500;
    // console.log("not");
  }
}


GameWorld.prototype.update = function (delta) {
    this.stick.update(delta);

    for (var i = 0 ; i < this.balls.length; i++){
        for(var j = i + 1 ; j < this.balls.length ; j++){
            this.handleCollision(this.balls[i], this.balls[j], delta);
        }
    }

    for (var i = 0 ; i < this.balls.length; i++) {
        this.balls[i].update(delta);
        if(this.balls[i].color != Color.white) this.handleCaster(this.balls[i], delta);
    }

    if(!this.ballsMoving() && AI.finishedSession){
        Game.policy.updateTurnOutcome();   
        if(Game.policy.foul || Game.policy.firstPlay){
            this.ballInHand();
        }
    }

};

GameWorld.prototype.notDown = function() {
    if(Game.policy.firstPlay) {
        this.whiteBall.position.y = Mouse.position.y;
        if(Mouse.position.x <= 413 && Mouse.position.x >= 0) {
            this.whiteBall.position.x = Mouse.position.x;
        }
    }
    else {
        this.whiteBall.position = Mouse.position;
    }
}

GameWorld.prototype.isDown = function() {
    let ballsOverlap = this.whiteBallOverlapsBalls();

    if(!Game.policy.isOutsideBorder(Mouse.position,this.whiteBall.origin) &&
        !Game.policy.isInsideHole(Mouse.position) &&
        !ballsOverlap){
        KEYBOARD_INPUT_ON = true;
        Keyboard.reset();
        Mouse.reset();
        if(Game.policy.firstPlay) {
            Game.policy.firstPlay = false;
            this.whiteBall.position.y = Mouse.position.y;
        }
        else {
            this.whiteBall.position = Mouse.position;
        }
        this.whiteBall.inHole = false;
        Game.policy.foul = false;
        this.stick.position = this.whiteBall.position;
        this.stick.visible = true;
    }
}

GameWorld.prototype.ballInHand = function(){

    // const isTurn = Game.policy.turn == Game.playerNumber;
  // console.log("in hand");
  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if(AI_ON && Game.policy.turn === AI_PLAYER_NUM){
        return;
    }

    KEYBOARD_INPUT_ON = false;
    this.stick.visible = false;
    // console.log(Mouse.left.down);

    // console.log("is My Turn???", Game.isTurn(), Game.policy.turn, Game.playerNumber);

    if(Game.isTurn()) {
        if(!Mouse.left.down){
            this.notDown();
        }
        else{
            this.isDown();
        }

        const x = this.whiteBall.position.x
        const y = this.whiteBall.position.y

        Game.socket.emit('first_play', Game.roomID, x, y, Mouse.left.down);
    }
    else {
        Mouse.position.x = Game.packetData.mouseX;
        Mouse.position.y = Game.packetData.mouseY;
        Mouse.left.down = Game.packetData.mouseLeftDown;

        // console.log("receiving first play packet", Mouse.left.down);

        if(!Mouse.left.down){
            this.notDown();
        }
        else {
            this.isDown();
        }

        Mouse.left.down = false;
    }

}

GameWorld.prototype.whiteBallOverlapsBalls = function(){

    let ballsOverlap = false;
    for (var i = 0 ; i < this.balls.length; i++) {
        if(this.whiteBall !== this.balls[i]){
            if(this.whiteBall.position.distanceFrom(this.balls[i].position)<BALL_SIZE){
                ballsOverlap = true;
            }
        }
    }

    return ballsOverlap;
}

GameWorld.prototype.ballsMoving = function(){

    var ballsMoving = false;

    for (var i = 0 ; i < this.balls.length; i++) {
        if(this.balls[i].moving){
            ballsMoving = true;
        }
    }

    return ballsMoving;
}

GameWorld.prototype.handleCollision = function(ball1, ball2, delta){

    if(ball1.inHole || ball2.inHole)
        return;

    if(!ball1.moving && !ball2.moving)
        return;

    var ball1NewPos = ball1.position.add(ball1.velocity.multiply(delta));
    var ball2NewPos = ball2.position.add(ball2.velocity.multiply(delta));

    var dist = ball1NewPos.distanceFrom(ball2NewPos);

    if(dist<BALL_SIZE){
        Game.policy.checkColisionValidity(ball1, ball2);

        var power = (Math.abs(ball1.velocity.x) + Math.abs(ball1.velocity.y)) + 
                    (Math.abs(ball2.velocity.x) + Math.abs(ball2.velocity.y));
        power = power * 0.00482;

        if(Game.sound && SOUND_ON){
            var ballsCollide = sounds.ballsCollide.cloneNode(true);
            ballsCollide.volume = (power/(20))<1?(power/(20)):1;
            ballsCollide.play();
        }

        var opposite = ball1.position.y - ball2.position.y;
        var adjacent = ball1.position.x - ball2.position.x;
        var rotation = Math.atan2(opposite, adjacent);

        // console.log(rotation);
        // console.log(opposite, adjacent);

        // console.log(ball1.position.x, ball2.position.x, ball1.position.y, ball2.position.y);
        // console.log(this.stick.caster.projection.position.x, this.stick.caster.projection.position.y);
        // console.log(ball1.color);

        ball1.moving = true;
        ball2.moving = true;

        var velocity2 = new Vector2(90*Math.cos(rotation + Math.PI)*power,90*Math.sin(rotation + Math.PI)*power);
        ball2.velocity = ball2.velocity.addTo(velocity2);
        // console.log("velocity 2", velocity2);

        ball2.velocity.multiplyWith(0.97);

        var velocity1 = new Vector2(90*Math.cos(rotation)*power,90*Math.sin(rotation)*power);
        // console.log("ball 1 initial v", ball1.velocity);
        ball1.velocity = ball1.velocity.addTo(velocity1);

        // const vec = velocity1.copy();

        // vec.normalize();

        // console.log("velocity 1", vec.x, vec.y);

        ball1.velocity.multiplyWith(0.97);
    }
    else {
      // if no collision occurs
      Game.policy.firstCollision = false
    }

}

GameWorld.prototype.draw = function () {
    // Canvas2D.drawImage(sprites.background, new Vector2(1490, 0), undefined, 0.9, undefined);
    // console.log(Game.size);
    const newX = 76.271186440677966101694915254235;
    const newY = 41.949152542372881355932203389829;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let rotation = isMobile ? 90 * Math.PI / 180 : undefined;
    let scale = isMobile ? 1.2 : 1;

    // 1500 x 825

    // Canvas2D.drawImage(sprites.background, new Vector2((1500 / 2) + 500, newY), rotation, scale, new Vector2(0, 0));
    if(isMobile) {
      // Canvas2D.drawImage(sprites.background, new Vector2((Game.size.x / 2) + (sprites.background.height / 2), 0), rotation, 1, new Vector2(0, 0));
      Canvas2D.drawImage(sprites.background, undefined, undefined, 1, undefined);
    }
    else {
      Canvas2D.drawImage(sprites.background, undefined, undefined, 1, undefined);
    }
    Game.policy.drawScores();

    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].draw();
    }

    this.stick.draw();
};

GameWorld.prototype.reset = function () {
    this.gameOver = false;

    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].reset();
    }

    this.stick.reset();

    if(AI_ON && AI_PLAYER_NUM === 0){
        AI.startSession();
    }
};

GameWorld.prototype.initiateState = function(balls){
    
    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].position.x = balls[i].position.x;
        this.balls[i].position.y = balls[i].position.y;
        this.balls[i].visible = balls[i].visible;
        this.balls[i].inHole = balls[i].inHole;
    }

    this.stick.position = this.whiteBall.position;
}

// export default GameWorld;
window.GameWorld = GameWorld;