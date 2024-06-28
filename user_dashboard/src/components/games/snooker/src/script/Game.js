"use strict";

import socket from "../socket";

// import Vector2 from "./geom/Vector2.js";
// import Canvas2D from "./Canvas2D.js";
// import Mouse from "./input/Mouse.js"
// import Keyboard from "./input/Keyboard.js"
// import Menu from "./menu/Menu.js"
// import GameWorld from "./GameWorld.js";
// import GamePolicy from "./GamePolicy.js";
// import AI from "./AI/AITrainer.js"
// import Keys from "./system/Keys.js";

// import { sprites, sounds } from "./Assets.js";

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

// import { generateMainMenuButtons, generateMainMenuLabels } from "./menu/MainMenu.js";

var sprites = {};
var sounds = {};

const stillLoading = document.createElement('div');

stillLoading.innerHTML = `
    <h2>Loading Assets</h2>
`;

stillLoading.style.position = "absolute"
stillLoading.style.width = "100vw";
stillLoading.style.height = "100vh";
stillLoading.style.backgroundColor = "white";
stillLoading.style.top = "0";
stillLoading.style.color = "black";
stillLoading.style.zIndex = "100";

var requestAnimationFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Game_Singleton() {
    this.size = undefined;
    this.spritesStillLoading = 0;
    this.gameWorld = undefined;
    this.sound = true;
    this.playerNumber = 0;
    this.mainMenu = new Menu();
    this.roomID = '';

    // this.dev = 'http://localhost:3000/snooker';
    // // this.dev = 'http://127.0.0.1:3000/snooker';
    // // this.dev = 'http://192.168.8.100:3000/snooker';
    // this.prod = 'https://new-server-ozkr.onrender.com/snooker';

    // this.url = this.dev
    // this.url = this.prod

    // this.socket = io(this.url, {
    //     autoConnect: false
    // })

    this.socket = socket

    this.packetData = {
        rotation: 0,
        w: false,
        s: false,
        keyInput: false,
        power: 0,
        leftDown: false,
        space: false,
        mouseX: 0,
        mouseY: 0,
        mouseLeftDown: false,
        originX: 970,
        mobilePower: 0
    }
}

Game_Singleton.prototype.start = function (divName, canvasName, x, y) {
    this.size = new Vector2(x,y);
    Canvas2D.initialize(divName, canvasName);
    document.body.appendChild(stillLoading);
    console.log("appended stillLoading");
    this.loadAssets();
    this.assetLoadingLoop();
    window.notStarted = false
};

Game_Singleton.prototype.initialize = function () {
    this.gameWorld = new GameWorld();
    this.policy = new GamePolicy();
    
    // this.initMenus();

    AI.init(this.gameWorld, this.policy);

    AI_ON = false;
    Game.mainMenu.active = false;
    GAME_STOPPED = false;
    setTimeout(Game.startNewGame,200);
    // sounds.fadeOut(Game.mainMenu.sound);
};

Game_Singleton.prototype.initMenus = function(inGame){

    let labels = generateMainMenuLabels("Classic 8-Ball");

    let buttons = generateMainMenuButtons(inGame);

    this.mainMenu.init
    (
        sprites.mainMenuBackground,
        labels,
        buttons,
        sounds.jazzTune
    );
}

Game_Singleton.prototype.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var image = new Image();
    image.src = imageName;
    image.onload = function () {
        console.log("image fully loaded", imageName);
        Game.spritesStillLoading -= 1;
    };
    this.spritesStillLoading += 1;
    return image;
};

Game_Singleton.prototype.assetLoadingLoop = function () {
    if (Game.spritesStillLoading > 0) {
        requestAnimationFrame(Game.assetLoadingLoop);
    }
    else {
        document.body.removeChild(stillLoading);
        console.log("remove stillLoading");
        Game.initialize();
        // requestAnimationFrame(this.mainMenu.load.bind(this.mainMenu));
    }
};

Game_Singleton.prototype.handleInput = function(){

    if(Keyboard.down(Keys.escape)){
        GAME_STOPPED = true;
        Game.initMenus(true);
        requestAnimationFrame(Game.mainMenu.load.bind(this.mainMenu));
    }
}

function getRoomID() {
    const url = new URL(window.location)

    const search = url.hash

    const searchParams = new URLSearchParams(search)

    const roomID = Array.from(searchParams.entries())[0][1]

    console.log(url, Array.from(searchParams.entries()));

    return roomID;
    // const url = window.location

    // const roomID = new URL(url).searchParams.get('id')

    // return roomID;
}

function joinGame(socket, roomID) {
    socket.emit('join_game', roomID)

    Game.roomID = roomID;
}

// Game_Singleton.prototype.setOpponent = function(){
    
// }

// Game_Singleton.prototype.multiplayer.playTurn = function(socket) {
// }

Game_Singleton.prototype.startNewGame = function(){
    Canvas2D._canvas.style.cursor = "auto";

    Game.gameWorld = new GameWorld();
    Game.policy = new GamePolicy();

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      Game.gameWorld.stick.trackMouse = false;
      Game.gameWorld.stick.useJoystick = true;

      Game.gameWorld.stick.chooseControl();

      document.querySelector('#power').style.display = "unset";
      document.querySelector('#base').style.display = "unset";
    }

    Canvas2D.clear();
    // Canvas2D.drawImage(
    //     sprites.controls, 
    //     new Vector2(Game.size.x/2,Game.size.y/2), 
    //     0, 
    //     1, 
    //     new Vector2(sprites.controls.width/2,sprites.controls.height/2)
    // );

    setTimeout(()=>{
        AI.init(Game.gameWorld, Game.policy);

        if(AI_ON && AI_PLAYER_NUM == 0){
            AI.startSession();
        }

        // const dev = 'http://localhost:3000/snooker';
        // const prod = '';

        // const socket = io(dev, {
        //     autoConnect: false
        // })

        // socket.connect();

        Game.socket.connect();

        const roomID = getRoomID();

        joinGame(Game.socket, roomID);

        Game.socket.once('joined_game', () => {
            console.log("you joined game");

            Game.playerNumber = 1;
        })

        Game.socket.once('start_game', () => {
            console.log("start game");
            Game.mainLoop();
            window.notStarted = false
        })

        Game.socket.on('stick_rotate', (rotation) => {
            Game.packetData.rotation = rotation;
        })

        Game.socket.on('movement_input', (w, s, keyInput) => {
            Game.packetData.w = w;
            Game.packetData.s = s;
            Game.packetData.keyInput = keyInput;
        });

        Game.socket.on('mobile_movement_input', (originX) => {
            Game.packetData.originX = originX;
        });

        Game.socket.on('mobile_stick_strike', (power) => {
            Game.packetData.mobilePower = power;
        });

        Game.socket.on('stick_strike', (power, leftDown, space) => {
            Game.packetData.power = power;
            Game.packetData.leftDown = leftDown;
            Game.packetData.space = space;
        });

        Game.socket.on('first_play', (x, y, down) => {
            Game.packetData.mouseX = x;
            Game.packetData.mouseY = y;

            Game.packetData.mouseLeftDown = down;
        })

        // Game.mainLoop();
    }, 0);

    // Game.gameWorld.handleCaster(Game.gameWorld.balls[0]);
}

Game_Singleton.prototype.continueGame = function(){
    Canvas2D._canvas.style.cursor = "auto";

    requestAnimationFrame(Game.mainLoop);
}

Game_Singleton.prototype.mainLoop = function () {
    // console.log(Game.playerNumber);
    

    if(DISPLAY && !GAME_STOPPED){
        Game.gameWorld.handleInput(DELTA);
        Game.gameWorld.update(DELTA);
        Canvas2D.clear();
        Game.gameWorld.draw();
        Mouse.reset();
        Game.handleInput();
        requestAnimationFrame(Game.mainLoop);
    }
};

Game_Singleton.prototype.isTurn = function () {
    return Game.policy.turn == Game.playerNumber
}

var Game = new Game_Singleton();

// export default Game;
window.Game = Game;

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("assets/sprites/" + sprite);
    };

     var loadSound = function (sound) {
        return new Audio("assets/sounds/" + sound);
    };

    sprites.ball0 = loadSprite("balls/0.png");
    sprites.ball1 = loadSprite("balls/1.png");
    sprites.ball2 = loadSprite("balls/2.png");
    sprites.ball3 = loadSprite("balls/3.png");
    sprites.ball4 = loadSprite("balls/4.png");
    sprites.ball5 = loadSprite("balls/5.png");
    sprites.ball7 = loadSprite("balls/7.png");
    sprites.ball8 = loadSprite("balls/8.png");
    sprites.ball9 = loadSprite("balls/9.png");
    sprites.ball10 = loadSprite("balls/10.png");
    sprites.ball11 = loadSprite("balls/11.png");
    sprites.ball12 = loadSprite("balls/12.png");
    sprites.ball13 = loadSprite("balls/13.png");
    sprites.ball14 = loadSprite("balls/14.png");

    sprites.mainMenuBackground = loadSprite("main_menu_background.png");
    sprites.background = loadSprite("spr_background4.png");
    sprites.ball = loadSprite("spr_ball2.png");
    sprites.redBall = loadSprite("spr_redBall2.png");
    sprites.yellowBall = loadSprite("spr_yellowBall2.png");
    sprites.blackBall = loadSprite("spr_blackBall2.png");
    sprites.stick = loadSprite("spr_stick.png");
    sprites.twoPlayersButton = loadSprite("2_players_button.png");
    sprites.twoPlayersButtonHover = loadSprite("2_players_button_hover.png");
    sprites.onePlayersButton = loadSprite("1_player_button.png");
    sprites.onePlayersButtonHover = loadSprite("1_player_button_hover.png");
    sprites.muteButton = loadSprite("mute_button.png");
    sprites.muteButtonHover = loadSprite("mute_button_hover.png");
    sprites.muteButtonPressed = loadSprite("mute_button_pressed.png");
    sprites.muteButtonPressedHover = loadSprite("mute_button_pressed_hover.png");
    sprites.easyButton = loadSprite("easy_button.png");
    sprites.easyButtonHover = loadSprite("easy_button_hover.png");
    sprites.mediumButton = loadSprite("medium_button.png");
    sprites.mediumButtonHover = loadSprite("medium_button_hover.png");
    sprites.hardButton = loadSprite("hard_button.png");
    sprites.hardButtonHover = loadSprite("hard_button_hover.png");
    sprites.backButton = loadSprite("back_button.png");
    sprites.backButtonHover = loadSprite("back_button_hover.png");
    sprites.continueButton = loadSprite("continue_button.png");
    sprites.continueButtonHover = loadSprite("continue_button_hover.png");
    sprites.insaneButton = loadSprite("insane_button.png");
    sprites.insaneButtonHover = loadSprite("insane_button_hover.png");
    sprites.aboutButton = loadSprite("about_button.png");
    sprites.aboutButtonHover = loadSprite("about_button_hover.png");
    sprites.controls = loadSprite("controls.png");

    sounds.side = loadSound("Side.wav");
    sounds.ballsCollide = loadSound("BallsCollide.wav");
    sounds.strike = loadSound("Strike.wav");
    sounds.hole = loadSound("Hole.wav");
    
    // Bossa Antigua Kevin MacLeod (incompetech.com)
    // Licensed under Creative Commons: By Attribution 3.0 License
    // http://creativecommons.org/licenses/by/3.0/
    sounds.jazzTune = loadSound("Bossa Antigua.mp3");
}

sounds.fadeOut = function(sound) {

    var fadeAudio = setInterval(function () {

        if(GAME_STOPPED)
            return;

        // Only fade if past the fade out point or not at zero already
        if ((sound.volume >= 0.05)) {
            sound.volume -= 0.05;
        }
        else{
            sound.pause();
            clearInterval(fadeAudio);
        }
    }, 400);
}

// export {sprites, sounds};
window.sprites = sprites;
window.sounds = sounds;