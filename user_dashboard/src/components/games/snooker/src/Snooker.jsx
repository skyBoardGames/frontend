// import './App.css'
import { useEffect } from 'react';

import socket from './socket'

import './script/system/Keys.js';
import './script/system/Color.js';
import './script/geom/Vector2.js';
import './script/input/ButtonState.js';
import './script/input/Keyboard.js';
import './script/input/Mouse.js';
import './script/input/JoyStick.js';
import './script/input/MyJoyStick.js';
import './script/Global.js';
import './script/Canvas2D.js';
import './script/game_objects/Score.js';
import './script/game_objects/Ball.js';
import './script/game_objects/Stick.js';
import './script/game_objects/RayCaster.js';
import './script/menu/Label.js';
import './script/menu/Button.js';
import './script/menu/Menu.js';
import './script/menu/MainMenu.js';
import './script/AI/Opponent.js';
import './script/AI/AIPolicy.js';
import './script/AI/AITrainer.js';
import './script/game_objects/Player.js';
import './script/GamePolicy.js';
import './script/GameWorld.js';
import './script/Game.js';
import './script/MobileDragStick.js';
// import './script/Assets.js'

function Snooker() {

    // console.log(Game);
    // useScript('../src/components/games/snooker/script/lib/LAB.min.js');

    console.log("YH");

    // console.log($LAB);
    useEffect(() => {
        // const vpTag = document.querySelector('meta[name="viewport"]');

        // vpTag.remove();

        // // console.log(vpTag);

        // // document.removeChild(vpTag);

        const css = document.createElement('link');

        css.rel = "stylesheet"
        css.href = "/css/game-layout.css"

        document.head.appendChild(css);

        css.onload = () => {
            setTimeout(() => {
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                console.log(isMobile);
                if(isMobile) {
                    console.log("yh");
                    const _canvas = document.getElementById("screen");
                    const _div = document.getElementById("gameArea");
        
        
                    _div.style.rotate = "90deg";
        
                    _canvas.style.position = "relative";
                    _canvas.style.left = "50%";
                    _canvas.style.top = "50%";
                    _canvas.style.translate = "-50% -50%";
                    // _canvas.style.position = "relative"
                    // _canvas = document.getElementById(canvasName);
                    // _div = document.getElementById(divName);
        
                    // _div.style.rotate = "90deg";
        
                    // Game.start('gameArea','screen', window.innerWidth, 1000);
                    // Game.start('gameArea','screen', 1500 * 0.5, 825 * 0.5);
                    // Game.start('gameArea','screen', window.innerHeight + 300, window.innerWidth);
                    // Game.socket = socket;
                    Game.start('gameArea','screen', 1500, 825);
                }
                else {
                    Game.start('gameArea','screen', 1500, 825);
                }
        
                document.getElementById('gameArea').style.backgroundColor = "black";
            }, 500)
        }


        return () => {
            document.head.removeChild(css);
            socket.disconnect();
            window.notStarted = true;
            
            // const meta = document.createElement('meta');

            // // <meta name="viewport" content="width=device-width, initial-scale=1" />

            // meta.name = "viewport";
            // meta.content = "width=device-width, initial-scale=1";

            // document.head.appendChild(meta);
        }
    }, [])

    return (
        <>
            <div id="gameArea">
                <canvas id="screen" width="2000" height="1000" onContextMenu={() => false}></canvas>
            </div>  
        </>
    )
}

export default Snooker
