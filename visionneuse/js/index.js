const imagePath = "images/";
const imgType = ".jpg";

let bigImage = document.getElementById("bigImage");

let nextBtn = document.getElementById("btnNext");
let preBtn = document.getElementById("preBtn");
let btnStop = document.getElementById("btnStop");
let ddmSpeed = document.getElementById("speed");

let current = 0;
let speed = 1500;
let nextSpeed = 1500;
let timerActivated = true;

let planets = ["alderaan", "coruscant", "dagobah", "endor", "hoth", "tatooine", "yavin4", "naboo"]

let timer = setInterval(()=>{ next() }, speed);

setImgTo(current);

btnStop.addEventListener("click", btnStopClick)
nextBtn.addEventListener("click", btnNextClick)
preBtn.addEventListener("click", btnPreClick)
ddmSpeed.addEventListener("change", speedChange)

function next(){
    setImgTo((current+1)%6);
}

function resetTimer(){
    clearInterval(timer);
    timer = setInterval(()=>{ next() }, speed);
}

function setImgTo(nbr){
    bigImage.src = imagePath + planets[nbr] + imgType;
    current = nbr;
}

function btnNextClick(e){
    setImgTo((current+1)%6);
    if(timerActivated) resetTimer();
}

function btnPreClick(e){
    let index = (current-1)%6;
    if(index == -1) index = 5;
    setImgTo(index);
    if(timerActivated) resetTimer();
}

function btnStopClick(e){
    if(timerActivated){
        e.target.textContent = "Activer";
        clearInterval(timer);
        timerActivated = false;
    } else {
        e.target.textContent = "Arrêter";
        speed = nextSpeed;
        timer = setInterval(()=>{ next() }, speed);
        timerActivated = true;
    }
}

function speedChange(e){
    nextSpeed = e.target.value;
}