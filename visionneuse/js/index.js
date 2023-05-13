const imagePath = "images/";
const imgType = ".jpg";

const statWarsApiUrl = "https://swapi.dev/api";

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

let planetsImage = ["alderaan", "coruscant", "dagobah", "endor", "hoth", "tatooine", "yavin4", "naboo"]

let timer = setInterval(()=>{ next() }, speed);

setImgTo(current);

btnStop.addEventListener("click", btnStopClick)
nextBtn.addEventListener("click", btnNextClick)
preBtn.addEventListener("click", btnPreClick)
ddmSpeed.addEventListener("change", speedChange)

moviesList.addEventListener("change", (event) =>{
    if(event.target.value == 0) return;
    let movieId = event.target.value;
    getPlanetFromFilm(movieId).then(planets => {
        planetsImage = [];
        planets.forEach(planet => {
            console.log(planet.name.toLowerCase());
            planetsImage.push(planet.name.toLowerCase());
        });
        console.log(planetsImage);
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
    bigImage.src = imagePath + planetsImage[nbr] + imgType;
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
    moviesList.innerHTML = "";

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

//getFilm(1).then(films => console.log(films));
// getFilms().then(films => console.log(films));
// getFilmsTitle().then(titles => console.log(titles));
// getPlanets().then(planets => console.log(planets));
// getPlanetsName().then(names => console.log(names));

// getPlanetFromFilm(1).then(planets => console.log(planets));

