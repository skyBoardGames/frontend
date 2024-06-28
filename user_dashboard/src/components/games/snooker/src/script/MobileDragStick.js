// import Mouse from './input/Mouse.js';
// import Game from './Game.js';

const baseDiv = document.createElement("div");

baseDiv.id = "base";

const powerDiv = document.createElement("div");

powerDiv.id = "power";

baseDiv.appendChild(powerDiv);

document.body.appendChild(baseDiv);
// const powerDiv = document.querySelector("#power");

// powerDiv.style.width = "700px"
const maxMovePx = 500;
const maxPower = 75;
// const maxOriginX = 123;
const maxOriginX = 4;
let originalOriginX = 970;
let x, y, moveX, moveY, prevMoveX;
let power = 0;
let originX = 0;

window.powerHandleStart = function(e) {
  if(Game.policy.turn != Game.playerNumber) return
//   console.log(Game.policy.turn, Game.playerNumber);

  console.log("touch start");
  
  x = e.touches[0].pageX;
  y = e.touches[0].pageY;

  if(Game.policy.foul || Game.policy.firstPlay) {
    Mouse.left.down = true;
  }
}

window.powerHandleMove = function(e) {
  if(Game.policy.turn != Game.playerNumber) return

  prevMoveX = moveX;

  moveX = (x - e.touches[0].pageX);
  moveY = (y - e.touches[0].pageY);

  // x = e.touches[0].pageX;
  // y = e.touches[0].pageY;

  if(moveX > 0 && moveX <= maxMovePx) {
    // console.log(prevMoveX, moveX);
    // console.log(moveX);
    powerDiv.style.translate = `${moveX * -1}px 0`;

    if(prevMoveX > moveX) {
      // console.log("right");
      Game.gameWorld.stick.origin.x -= 2;
    }
    else {
      // console.log("left");
      Game.gameWorld.stick.origin.x += 2;
    }
    // console.log(originX);

    // Game.gameWorld.stick.origin.x += originX;
    // Game.gameWorld.stick.origin.x = originX;
  }
  else if(moveX <= 0) {
    moveX = 0;
    Game.gameWorld.stick.origin.x = originalOriginX
  }

  Game.socket.emit('mobile_movement_input', Game.roomID, Game.gameWorld.stick.origin.x);

  // console.log(moveX);


  // console.log(moveX);
}

window.powerHandleEnd = function(e) {
  // console.log(moveX);
  if(Game.policy.turn != Game.playerNumber) return

  if(moveX > 0) {
    power = moveX > maxMovePx ? maxPower : (moveX / maxMovePx) * maxPower;
    // originX = moveX > maxMovePx ? maxOriginX : (moveX / maxMovePx) * maxOriginX;

    Game.gameWorld.stick.power = power;
    // Game.gameWorld.stick.origin.x = originX;
    // handleMouseDown({which: 1})
    // handleMouseUp({which: 1})
    // console.log(Game.gameWorld.stick);
    // console.log(power, originX);
    var mousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window,
        which: 1
    });

    document.dispatchEvent(mousedownEvent);

    var mouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window,
        which: 1
    });

    setTimeout(() => {
      document.dispatchEvent(mouseupEvent);
    }, 1000)

    Game.socket.emit('mobile_stick_strike', Game.roomID, power)
  }

  x = 0;
  y = 0;

  powerDiv.style.translate = `${x}px 0`;
}

powerDiv.addEventListener("touchstart", (e) => {
  powerHandleStart(e);
})

powerDiv.addEventListener("touchmove", (e) => {
  powerHandleMove(e);
})

powerDiv.addEventListener("touchend", (e) => {
  powerHandleEnd(e);
})

// window.JoyStick = JoyStick;