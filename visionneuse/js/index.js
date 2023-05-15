const imagePath = "images/";
const imgType = ".jpg";

const statWarsApiUrl = "https://swapi.dev/api";
const starWarsAPIUrlBackup = "https://web.archive.org/web/20230208062215/https://swapi.dev/api"

let bigImage = document.getElementById("bigImage");
let moviesList = document.getElementById("moviesList");

let nextBtn = document.getElementById("btnNext");
let preBtn = document.getElementById("preBtn");
let btnStop = document.getElementById("btnStop");
let ddmSpeed = document.getElementById("speed");

let current = 0;
let speed = 1500;
let nextSpeed = 1500;
let timerActivated = true;

let planetsImage = []

let timer = setInterval(()=>{ next() }, speed);

setImgTo(current);

btnStop.addEventListener("click", btnStopClick)
nextBtn.addEventListener("click", btnNextClick)
preBtn.addEventListener("click", btnPreClick)
ddmSpeed.addEventListener("change", speedChange)

moviesList.addEventListener("change", (event) =>{
    if(event.target.value == 0){
        document.getElementById("viewer").classList.add("invisible");
        return;
    }
    let movieId = event.target.value;
    getPlanetFromFilm(movieId).then(planets => {
        planetsImage = [];
        current = 0;
        planets.forEach(planet => {
            planetsImage.push(planet.name.toLowerCase());
        });
        document.getElementById("viewer").classList.remove("invisible");
        bigImage.src = imagePath + planetsImage[0] + imgType;
    });
});

updateMoviesList();

function next(){
    setImgTo((current+1)%planetsImage.length);
}

function resetTimer(){
    clearInterval(timer);
    timer = setInterval(()=>{ next() }, speed);
}

function setImgTo(nbr){
    if(planetsImage.length > 0){
        bigImage.src = imagePath + planetsImage[nbr] + imgType;
        current = nbr;
        let planet = planetsImage[nbr].charAt(0).toUpperCase() + planetsImage[nbr].slice(1);
        document.getElementById("planetName").textContent = planet;
    }
    
}

function btnNextClick(e){
    setImgTo((current+1)%planetsImage.length);
    if(timerActivated) resetTimer();
}

function btnPreClick(e){
    let index = (current-1)%planetsImage.length;
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
    clearInterval(timer)
    timer = setInterval(()=>{ next() }, nextSpeed);
}

async function get(url){
    return fetch(url)
    .then(response => response.json());
}

async function getResults(url){
    return get(url)
    .then(data => data.results);
}

async function getFilms(){
    return getResults(statWarsApiUrl + "/films/");
}

async function getFilm(filmId){
    return get(statWarsApiUrl + "/films/" + filmId);
}

async function getPlanets(){
    return getResults(statWarsApiUrl + "/planets/")
}

async function getPlanet(planetId){
    return get(statWarsApiUrl + "/planets/" + planetId);
}

async function getFilmsTitle(){
    return getFilms().then(films => {
        let titles = [];
        for(let i = 0; i < films.length; i++){
            titles.push(films[i].title);
        }
        return titles;
    });
}

async function getPlanetsName(){
    return getPlanets().then(planets => {
        let names = [];
        for(let i = 0; i < planets.length; i++){
            names.push(planets[i].name);
        }
        return names;
    });
}

async function getPlanetFromFilm(filmId){
    return getFilm(filmId).then((film) => {
        let planetsPromise = [];
        for(let i = 0; i < film.planets.length; i++){
            planetsPromise.push(get(film.planets[i]));
        }
        return Promise.all(planetsPromise);
    });
}


function updateMoviesList()
{
    let moviesList = document.getElementById("moviesList");

    getFilmsTitle()
    .then(titles => {
        titles.forEach((title, i) => {
            let option = document.createElement("option");
            option.value = i+1;
            option.innerText = title;
            moviesList.appendChild(option);
        });
    });
}
