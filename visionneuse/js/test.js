"use strict";
const statWarsApiUrl = "https://swapi.dev/api";

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
let moviesList = document.getElementById("moviesList");

moviesList.addEventListener("change", (event) => {
    if(event.target.value == 0) return;
    let movieId = event.target.value;
    getPlanetFromFilm(movieId).then(planets => {
        planetsImage = [];
        planets.forEach(planet => {
            planetsImage.push(planet.name.toLowerCase());
        });
    });
});

updateMoviesList();