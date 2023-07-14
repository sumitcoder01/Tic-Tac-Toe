console.log("Welcome To MyTicTacToe");
//initilization--
let music = new Audio('music.mp3');
let gameover = new Audio('gameover.mp3');
let audioturn = new Audio('ting.mp3');
let infotext = document.getElementById('infotext');
let btn = document.querySelector('.btn');
let gif = document.querySelector('#gif img');
let isgameover = false;
let line = document.getElementById('line');
let turn = "X";
let n = 1;
let game = Array.from(document.getElementsByClassName('block'));
//Game Start
music.loop = true;
music.play();
//change Turn
const changeTurn = () => {
    if (turn == "X") {
        turn = "O";
    }
    else {
        turn = "X";
    }
    infotext.innerText = `Turn for ${turn}`;
    audioturn.play();
}

//check win--win Logic( b0 b1 b2 Top Left Rotation))
const checkwin = () => {
    let arr = [[0, 1, 2, 16, 15, 0], [3, 4, 5, 50, 15, 0], [6, 7, 8, 83, 15, 0], [0, 3, 6, 49, -18, 90], [1, 4, 7, 49, 15, 90], [2, 5, 8, 49, 48.5, 90], [0, 4, 8, 52, 17, 37], [2, 4, 6, 52, 12, -37]];
    arr.forEach(e => {
        if ((game[e[0]].innerText == game[e[1]].innerText) && (game[e[1]].innerText == game[e[2]].innerText) && (game[e[0]].innerText != "")) {
            isgameover = true;
            gif.style.opacity = "1";
            if (turn == "X") {
                infotext.innerText = "Player 1  Won The Game";
            }
            else {
                infotext.innerText = "Player 2  Won The Game";
            }
            line.style.opacity = "1";
            line.style.top = `${e[3]}%`;
            line.style.left = `${e[4]}%`;
            line.style.transform = `rotate(${e[5]}deg)`;
            music.pause();
            gameover.play();
            console.log("Game over....");
        }
    });
};
//Add  Click Event IN Grid-Elements
game.forEach(e => {
    e.addEventListener("click", () => {
        if (isgameover == true) {
            alert("please  Reset The Game...");
        }
        else if (e.innerText != "") {
            console.log('Invalid Move');
        }
        else {
            e.innerText = turn;
            checkwin();
            n += 1;
            if (isgameover == false) {
                changeTurn();
                if (n == 10) {
                    console.log('Draw');
                    infotext.innerText = "Draw Game";
                    isgameover = true;
                }
                else {
                    console.log('Next Turn....');
                }
            }
        }
    });
});

//Reset The Game---

function makeAllEmpty() {
    game.forEach(e => {
        e.innerText = "";
    });
}
btn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
    }
    turn = "X";
    infotext.innerText = `Turn for ${turn}`;
    gif.style.opacity = "0";
    n = 1;
    isgameover = false;
    line.style.opacity = "0";
    makeAllEmpty();
    console.log("New Game");
});
