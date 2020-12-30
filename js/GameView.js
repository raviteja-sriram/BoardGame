
var self1 = null;

export default class GameView {
    constructor(root, i) {
        this.root = root;
        self1 = this;
        self1.lastIndex = i;
        self1.timer = null;
        this.score = 0;
        this.root.innerHTML = `
            <div class="header">
                <div class="header__score"></div>
                <div class="header__timer"></div>
                <button type="button" class="header__restart">
                    <i class="material-icons">refresh</i>
                </button>
            </div>
            <div class="board" id="board">
                
            </div>
        `;

        this.changeGridRowsColumns();

        document.getElementsByClassName("board")[0].children[i].style.backgroundColor = "green";

        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        this.root.querySelectorAll(".board__tile").forEach(tile => {
            tile.addEventListener("click", () => {
                if (this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                }
            });
        });

        this.root.querySelector(".header__restart").addEventListener("click", () => {
            if (this.onRestartClick) {
                this.onRestartClick();
            }
        });
    }

    changeGridRowsColumns(){
        let myNode = document.getElementById("board");
        myNode.innerHTML = '';
        var e = document.getElementById("level").value;
        myNode.style.gridTemplateRows = `repeat(${e}, 1fr)`;
        myNode.style.gridTemplateColumns = `repeat(${e}, 1fr)`;
        //console.log(e);
        for(let i=0;i<e*e;i++){
            let d = document.createElement("div");
            d.setAttribute("class", "board__tile");
            d.setAttribute("data-index", i)
            myNode.appendChild(d);
        }
    }

    initializeGame(game){
        document.getElementById("app").querySelector(".header__score").textContent = "Score: " + this.score;
        document.getElementById("mainHeader").querySelector(".header__highscore").textContent = "High Score: " + localStorage.highScore;
        clearInterval(self1.timer);
        self1.updateNextBox(game);
        self1.timer = setInterval(self1.updateNextBox.bind(window, game), 1000);
    }

    update(game, index) {
        this.score = game.updateScore(index);
        document.getElementById("app").querySelector(".header__score").textContent = "Score: " + this.score;
        document.getElementById("mainHeader").querySelector(".header__highscore").textContent = "High Score: " + localStorage.highScore;
        clearInterval(self1.timer);
        self1.updateNextBox(game);
        self1.timer = setInterval(self1.updateNextBox.bind(window, game), 1000);
    }

    updateNextBox(game){
        var i = game.nextBox();
        if(document.getElementsByClassName("board")[0].children[self1.lastIndex]){
            document.getElementsByClassName("board")[0].children[self1.lastIndex].style.backgroundColor = "";
            document.getElementsByClassName("board")[0].children[i].style.backgroundColor = "green";
        }
        self1.lastIndex = i;
    };

    stopGame(){
        clearInterval(self1.timer);
        alert("Game Over!");
    }

    restartGame(){
        clearInterval(self1.timer);
    }
}