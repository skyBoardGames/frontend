// import Canvas2D from "../Canvas2D.js";
// import Mouse from "../input/Mouse.js"

function Button(sprite, position, callback, hoverSprite){

    this.sprite = sprite;
    this.hoverSprite = hoverSprite ? hoverSprite : sprite;
    this.position = position;
    this.callback = callback;
}

Button.prototype.draw = function(){

    if(this.mouseInsideBorders()){
        Canvas2D.drawImage(this.hoverSprite, this.position, 0, 1);
        Canvas2D._canvas.style.cursor = "pointer";
    }
    else{
        Canvas2D.drawImage(this.sprite, this.position, 0, 0.98);
    }
}

Button.prototype.handleInput = function(){
    if(Mouse.left.pressed) {
        // console.log("mouse", this.position.x, this.position.y);
    }
    if(Mouse.left.pressed && this.mouseInsideBorders()){
        this.callback();
    }
}

Button.prototype.mouseInsideBorders = function(){

  let mousePos = Mouse.position;

  const offsetX = 1743 * 0.8 / 2;
  const offsetY = 825 * 0.8 / 2;

  // console.log(offsetX);

  // console.log(mousePos.x);
  // console.log(mousePos.x, mousePos.y);

  // console.log(mousePos.x + offsetX);
  
  // console.log(mousePos.x + offsetY, mousePos.y + offsetX);
  // console.log(Math.abs(mousePos.x), Math.abs(mousePos.y));
  // console.log(mousePos.x, mousePos.y);
  // console.log(this.position);

    if(Math.abs(mousePos.x) > this.position.x 
        &&
        Math.abs(mousePos.x) < this.position.x + this.sprite.width
        &&
        Math.abs(mousePos.y) > this.position.y
        &&
        Math.abs(mousePos.y) < this.position.y + this.sprite.height
    ){
        return true;
    }

    return false;
}

// export default Button;
window.Button = Button;