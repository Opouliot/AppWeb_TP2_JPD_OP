'use strict'

//I may have exaggerated with ternary operators in this TP... not may, I have.

let formInscription = document.getElementById("formInscription");

let txtUser = document.getElementById("txtUser");
let txtPW = document.getElementById("txtPW");
let txtPWConfirm = document.getElementById("txtPWConfirm");

let txtPrenom = document.getElementById("txtPrenom");
let txtNom = document.getElementById("txtNom");
let txtEmail = document.getElementById("txtEmail");
let txtDateNaissance = document.getElementById("txtDateNaissance");

let diluc = document.getElementById("diluc");
let childe = document.getElementById("childe");
let zhongli = document.getElementById("zhongli");
let kazuha = document.getElementById("kazuha");

formInscription.addEventListener("submit", e =>{
    if(!verification()) e.preventDefault();
});

function verification(){
    let result = true;
    result = showHideError("txtUser", checkUser) ? result : false;
    result = showHideError("txtPW", checkPW) ? result : false;
    result = showHideError("txtPWConfirm", checkPwConfirm) ? result : false;
    result = showHideError("txtPrenom", checkPrenom) ? result : false;
    result = showHideError("txtNom", checkNom) ? result : false;
    result = showHideError("txtEmail", checkEmail) ? result : false;
    result = showHideError("txtDateNaissance", checkDateNaissance) ? result : false;
    result = showHideError("choix", checkHusbandos) ? result : false;
    return result;
}

function showHideError(variable, funct){
    let result = true;
    let error = document.querySelector("#"+ variable + " + .error");
    if(funct()){
        error.classList.add('invisible');
    }else{
        error.classList.remove('invisible');
        result = false;
    }
    return result;
}

function checkUser(){
    return txtUser.value.length > 0;
}

function checkPW() {
    let result = true;
    let ans = countANS(txtPW.value);
    result = ans[0] > 1 && ans[1] > 0 && ans[2] > 0 ? result : false;
    return result;
}

function checkPwConfirm() {
    let result = true;
    result = txtPW.value == txtPWConfirm.value ? result : false;
    return result;
}

function checkPrenom(){
    return txtPrenom.value.length > 0;
}

function checkNom(){
    return txtNom.value.length > 0;
}

function checkEmail(){
    let result = true;
    let email = String(txtEmail.value)
    let iDot = email.indexOf(".");
    let iA = email.indexOf("@");

    result =  email.length > 0 ? result : false;
    result =  iA != 0 && iA != -1 && iA < (email.length - 1)? result : false;
    result =  iDot != -1 && iDot > iA && iDot < (email.length - 1) ? result : false;
    result = iDot - iA > 1 ? result : false;
    return result;
}

function checkDateNaissance(){
    let nbrs = "1234567890";
    let result = true;
    let bday = String(txtDateNaissance.value);
    if(bday.length == 10){
        if (!nbrs.includes(bday[0])) result = false;
        if (!nbrs.includes(bday[1])) result = false;
        if (!nbrs.includes(bday[2])) result = false;
        if (!nbrs.includes(bday[3])) result = false;
        if (!"-".includes(bday[4])) result = false;
        if (!nbrs.includes(bday[5])) result = false;
        if (!nbrs.includes(bday[6])) result = false;
        if (!"-".includes(bday[7])) result = false;
        if (!nbrs.includes(bday[8])) result = false;
        if (!nbrs.includes(bday[9])) result = false;
    }
    else result = false;

    let now = new Date();
    let today = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0")
    if(result){
        if (bday > today) result = false;
    }
    return result;
}

function checkHusbandos(){
    let count = 0;
    if(diluc.checked) count++;
    if(childe.checked) count++;
    if(zhongli.checked) count++;
    if(kazuha.checked) count++;
    return count > 0 && count < 3;
}

function countANS(text){
    let ans = [0,0,0];
    let characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let nbrs = "1234567890";
    let specials = "~!@#$%^&*()-_=+?<>.";
    text.split('').forEach(c => {
        if(characters.includes(c)) ans[0] = ans[0] + 1;
        if(nbrs.includes(c)) ans[1] = ans[1] + 1;
        if(specials.includes(c)) ans[2] = ans[2] + 1;
    });
    return ans;
}