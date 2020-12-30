import Game from "./Game.js";
import GameView from "./GameView.js";

let i = null;
var x = null;
let game = null;
let gameView = null;

document.getElementById("mainHeader").innerHTML = `
<div class="headerHighScore">
    <select id="level" class="header_dropdown" >
        <option value="3">3X3</option>
        <option value="4">4X4</option>
        <option value="6">6X6</option>
    </select>
    <div class="header__highscore"></div>
</div>
`

document.getElementById("mainHeader").querySelector(".header_dropdown").addEventListener("change", () => {
    clearInterval(x);
    gameView.restartGame();
    initializeAndStart();
});

initializeAndStart();

// define functions
gameView.onTileClick = function(i) { OnTileClick(i); }

function OnTileClick(i) {
    gameView.update(game, i);
};

gameView.onRestartClick = OnRestartClick;

function OnRestartClick() {
    clearInterval(x);
    gameView.restartGame();
    initializeAndStart();
};

function initializeAndStart(){
    var e = document.getElementById("level").value;
    i = Math.floor(Math.random() * e * e);
    game = new Game(i, e*e);
    gameView = new GameView(document.getElementById("app"), i, e*e);
    

    startGame();

    gameView.onTileClick = function(i) { OnTileClick(i); }
    gameView.onRestartClick = OnRestartClick;
}

function startGame(){
    var seconds = 120;
    gameView.initializeGame(game);
    document.getElementById("app").querySelector(".header__timer").textContent = "Timer: " + seconds;
    seconds--;
    x = setInterval(() => {

        // Display the result in the element with id="demo"
        document.getElementById("app").querySelector(".header__timer").textContent = "Timer: " + seconds;
    
        // If the count down is finished, write some text
        if (seconds < 0) {
            gameView.stopGame();
            document.getElementById("app").querySelector(".header__timer").textContent = "Timer: " + 0;
            clearInterval(x);
            gameView.restartGame();
            initializeAndStart();

        }
        seconds--;
}, 1000);
}



//gameView.update(game);