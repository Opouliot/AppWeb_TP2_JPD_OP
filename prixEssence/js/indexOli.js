"use strict";

const Oli_Currency_APIKey = "zlz2fZlvu0BkJc1IfiOtWr8VfaV9a2wF";
const currencyURL = "https://api.apilayer.com/exchangerates_data"

let headerOli = new Headers();
headerOli.append("apikey", "zlz2fZlvu0BkJc1IfiOtWr8VfaV9a2wF");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: headerOli
};

// async function get(p_url, p_requestOptions){
//     return fetch(p_url, p_requestOptions)
//     .then(response => response.json());
// }

// async function getResults(p_url, p_requestOptions){
//     return get(p_url, p_requestOptions)
//     .then(data => data.results);
// }

// async function getCurencies(){
//     return getResults(currencyURL + "/symbols", requestOptions)
//     .then(data => console.log(data));
// }



function updateCurrencyList(){
    let moneylist = document.getElementById("moneyType");

    getCurrencies().then(currencies => {

        currencies.forEach((currency,i) => {
            //console.log(currency);
            let option = document.createElement("option");
            option.text = currency[1];
            option.value = currency[0];
            moneylist.appendChild(option);
            //i++;
        });
    });
}

// getCurencies();

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
        console.log(currencies);
        return currencies;
    });
}

async function convertCurrency( p_amount){
    let convertTo = document.getElementById("moneyType").value;

    return fetch(currencyURL + "/convert?to=" + convertTo + "&from=USD&amount=" + p_amount, requestOptions)
    .then(response => response.json())
    .then(result => result.result);
}

document.getElementById("moneyType").addEventListener("change", function(){
    convertCurrency(1).then(result => console.log(result));
});


updateCurrencyList();
