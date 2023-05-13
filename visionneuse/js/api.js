"use strict";

const statWarsApiUrl = "https://swapi.dev/api";

async function getFilms()
{
    return fetch(statWarsApiUrl + "/films/")
    .then(response => response.json())
    //.then(data => console.log(data));
    //return data;
}
//console.log(getFilms());
async function getFilmsTitle()
{
    let films = [];
    getFilms().then(data => 
    {
        //console.log(data);
        for(let i = 0; i < 3; i++)
        {
            films.push(data.results[i].title);
        }
        //console.log(films);
        FillTitleList(films);
    });
    
    
    return films;
}


function FillTitleList(p_filmList)
{
    let titleList = document.getElementById("movieTitle");
    for(let i = 0; i < p_filmList.length; i++)
    {
        let option = document.createElement("option");
        option.value = [i];
        option.innerText = p_filmList[i];
        titleList.appendChild(option);
    }
}

async function getPlanetsName(p_filmId)
{

    
    getFilms().then(data =>
        {
            let addressPlanets = [];
            console.log(data);
            addressPlanets.push(data.results[p_filmId].planets);
            return addressPlanets;
        }).then(planets => fetch(planets[0][0]));
}
getPlanetsName(1);
getFilmsTitle();