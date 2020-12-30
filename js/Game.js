export default class Game {
    constructor(i, boxes){
        this.boxTurnedToGreen = i;
        this.score = 0;
        this.boxes = boxes;
        if(!localStorage.highScore){
            localStorage.highScore = 0;
        }
        this.highScore = localStorage.highScore;
    }

    updateScore(clickedIndex){
        console.log("green box " + this.boxTurnedToGreen);
        if(this.boxTurnedToGreen == clickedIndex){
            this.score++;
            if(this.score > localStorage.highScore)
                localStorage.highScore = this.score;
        }
        else{
            this.score--;
        }

        console.log("score " + this.score + " HS " + localStorage.highScore);
        return this.score;
    }

    nextBox(){
        this.boxTurnedToGreen = Math.floor(Math.random() * this.boxes);
        return this.boxTurnedToGreen;
    }
}