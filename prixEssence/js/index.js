"use strict";

//Si jamais une clé ne fonctionne plus(trop d'appel à l'API), nous avons une deuxième clé

const Petro_APIKey = "8awCTdcdf58HQdCSpwsvuBeb5uMA4cPNUGWZUFIV";
const JP_Currency_APIKey = "Pwfp8RryQbAVlzmT4LgPg1Izds1GR3lD";

const Oli_Currency_APIKey = "zlz2fZlvu0BkJc1IfiOtWr8VfaV9a2wF";
const currencyURL = "https://api.apilayer.com/exchangerates_data"

let currentCurrency = "USD";
const ctx = document.getElementById('myChart');

let headerOli = new Headers();
headerOli.append("apikey", "zlz2fZlvu0BkJc1IfiOtWr8VfaV9a2wF");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: headerOli
};


let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Prix de l'essence",
            data: []
        }]
    }
});

updateCurrencyList();

document.getElementById("submit").addEventListener("click", function(){
    updateChart();
});

function updateChart(){
    let frequency = document.getElementById("frequency").value;
    let series = document.getElementById("usState").value;
    let start = document.getElementById("dateStart").value;
    let end = document.getElementById("dateEnd").value;
    let currentCurrency = document.getElementById("moneyType").value;

    getRatio().then(ratio => {
        getPetro(frequency, series, start, end)
        .then(data => {
            chart.data.labels = data.map(element => element.period);
            chart.data.datasets[0].data = data.map(element => element.value * ratio);
            chart.options.scales.y.ticks.callback = function(value, index, values) { return value + " " + currentCurrency; };
            chart.update();
        });
    });
}


async function getPetro(frequency = "monthly", series = "EMM_EPM0_PTE_SNY_DPG", start = "1990", end = "2024"){
    return fetch(
        "https://api.eia.gov/v2/petroleum/pri/gnd/data/"+
        "?frequency="+ frequency +
        "&data[0]=value"+
        "&facets[series][]="+ series+
        "&sort[0][column]=period&sort[0][direction]=asc&"+
        "&start="+start+"&end="+ end +
        "&api_key=" + Petro_APIKey)
    .then(response => response.json())
    .then(data => {
        return data.response.data.map(element =>{
            return {period: element.period, value: element.value};
        });
    });
}

function updateCurrencyList(){
    let moneylist = document.getElementById("moneyType");

    getCurrencies().then(currencies => {

        currencies.forEach((currency,i) => {
            let option = document.createElement("option");
            option.text = currency[1];
            option.value = currency[0];
            moneylist.appendChild(option);
        });
    });
}

async function getCurrencies()
{
    return fetch(currencyURL + "/symbols", requestOptions)
    .then(response => response.json())
    .then(result => Object.entries(result.symbols))
    .then(data => {
        let currencies = [];
        data.forEach(currency => {
            currencies.push(currency);
        });
        return currencies;
    });
}

async function getRatio(){
    let convertTo = document.getElementById("moneyType").value;

    return fetch(currencyURL + "/convert?to=" + convertTo + "&from=USD&amount=1", requestOptions)
    .then(response => response.json())
    .then(result =>result.result);
}