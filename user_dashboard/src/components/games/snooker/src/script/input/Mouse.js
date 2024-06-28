"use strict";

// import Vector2 from "../geom/Vector2.js";
// import Canvas2D from "../Canvas2D.js";
// import Game from "../Game.js";
// import ButtonState from "../input/ButtonState.js"

function handleMouseMove(evt) {
    if(window.notStarted) return

    if(Game.policy.turn == Game.playerNumber) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if(isMobile) {
          var canvasScale = Canvas2D.scale;
          const widthToUse = Canvas2D._div.getBoundingClientRect().width;
          const heightToUse = Canvas2D._div.getBoundingClientRect().height;

          const cWidthToUse = Canvas2D._canvas.getBoundingClientRect().width;
          const cHeightToUse = Canvas2D._canvas.getBoundingClientRect().height;

          const parentX = (widthToUse / 2) - (cWidthToUse / 2);
          const parentY = (heightToUse / 2) - (cHeightToUse / 2);

        //   console.log(evt.pageX - parentX);
        //   console.log((evt.pageY - parentY));
      
          // console.log(parentX, parentY);
          // console.log(parentY);
          // console.log(Canvas2D._canvas.clientWidth);
          var canvasOffset = Canvas2D.offset;
          // var mx = ((evt.pageX - parentY) / canvasScale.x) - Canvas2D._canvas.clientHeight;
          // var my = (evt.pageY - parentX) / canvasScale.y;
          // var mx = (evt.pageY - parentX) / canvasScale.y;
          // var my = ((evt.pageX - parentY) / canvasScale.x) - Canvas2D._canvas.clientHeight;
          var mx = (evt.pageY - parentY) / canvasScale.y;
          var my = (((evt.pageX - parentX) - cWidthToUse) / canvasScale.x);
          Mouse._position = new Vector2(Math.abs(mx), Math.abs(my));

        //   console.log(mx, evt.pageX - parentX, canvasScale.x, canvasScale.y);
        //   console.log(mx, my);
        }
        else {
          var canvasScale = Canvas2D.scale;
          var canvasOffset = Canvas2D.offset;
          var mx = (evt.pageX - canvasOffset.x) / canvasScale.x;
          var my = (evt.pageY - canvasOffset.y) / canvasScale.y;
          Mouse._position = new Vector2(mx, my);
        }
    }
}

function handleMouseDown(evt) {
    if(window.notStarted) return

    if(Game.policy.turn == Game.playerNumber) {
        handleMouseMove(evt);
    
        if (evt.which === 1) {
            if (!Mouse._left.down)
                Mouse._left.pressed = true;
            Mouse._left.down = true;
        } else if (evt.which === 2) {
            if (!Mouse._middle.down)
                Mouse._middle.pressed = true;
            Mouse._middle.down = true;
        } else if (evt.which === 3) {
            if (!Mouse._right.down)
                Mouse._right.pressed = true;
            Mouse._right.down = true;
        }
    }
}

function handleMouseUp(evt) {
    if(window.notStarted) return
    
    if(Game.policy.turn == Game.playerNumber) {
        handleMouseMove(evt);
    
        if (evt.which === 1)
            Mouse._left.down = false;
        else if (evt.which === 2)
            Mouse._middle.down = false;
        else if (evt.which === 3)
            Mouse._right.down = false;
    }
}

function Mouse_Singleton() {
    this._position = Vector2.zero;
    this._left = new ButtonState();
    this._middle = new ButtonState();
    this._right = new ButtonState();
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
}

Object.defineProperty(Mouse_Singleton.prototype, "left",
    {
        get: function () {
            return this._left;
        }
    });

Object.defineProperty(Mouse_Singleton.prototype, "middle",
    {
        get: function () {
            return this._middle;
        }
    });

Object.defineProperty(Mouse_Singleton.prototype, "right",
    {
        get: function () {
            return this._right;
        }
    });

Object.defineProperty(Mouse_Singleton.prototype, "position",
    {
        get: function () {
            return this._position;
        }
    });

Mouse_Singleton.prototype.reset = function () {
    this._left.pressed = false;
    this._middle.pressed = false;
    this._right.pressed = false;
};

Mouse_Singleton.prototype.containsMouseDown = function (rect) {
    return this._left.down && rect.contains(this._position);
};

Mouse_Singleton.prototype.containsMousePress = function (rect) {
    return this._left.pressed && rect.contains(this._position);
};

var Mouse = new Mouse_Singleton();

// export default Mouse;
window.Mouse = Mouse;