"use strict";

const Petro_APIKey = "8awCTdcdf58HQdCSpwsvuBeb5uMA4cPNUGWZUFIV";
const Currency_APIKey = "Pwfp8RryQbAVlzmT4LgPg1Izds1GR3lD";

// EMM_EPM0_PTE_SNY_DPG New York
// EMM_EPM0_PTE_SCA_DPG California
// EMM_EPM0_PTE_SCO_DPG Colorado
// EMM_EPM0_PTE_SFL_DPG Florida
// EMM_EPM0_PTE_SMA_DPG Massachusetts
// EMM_EPM0_PTE_SMI_DPG Michigan
// EMM_EPM0_PTE_SPA_DPG Pennsylvania
// EMM_EPM0_PTE_STX_DPG Texas
// EMM_EPM0_PTE_SWA_DPG Washington


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
    })
    .then(data => {
        console.log(data);
    });
}

getPetro();