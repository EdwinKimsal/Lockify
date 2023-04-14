// Variables
const pas = document.getElementById('password');
const range = document.getElementById('range');
const cap = document.getElementById('cap');
const low = document.getElementById('low');
const num = document.getElementById('num');
const sym = document.getElementById('sym');

const capArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const lowArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const numArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const symArr = ['!', '@', '#', '$', '%', '^', '*', '-', '_', '+']
var choices = [];
var pasArr = [];


// Slider Update
function slider(){
    document.getElementById('slider').innerHTML = 'Length: ' + document.getElementById('range').value;
}


// Generate Button Press
function generate(){
    // Are boxes checked?
    if (cap.checked === true){
        choices = choices.concat(capArr);
    }

    if (low.checked === true){
        choices = choices.concat(lowArr);
    }

    if (num.checked === true){
        choices = choices.concat(numArr);
    }

    if (sym.checked === true){
        choices = choices.concat(symArr);
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    for (var i = choices.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = choices[i];
        choices[i] = choices[j];
        choices[j] = temp;
    }

    // Randomize Password
    for (var i = 0; i < range.value; i++){
        var j = Math.floor(Math.random() * choices.length);
        pasArr.push(choices[j]);
        var pasStr = pasArr.join("");
    }


    // Show Password
    pas.innerHTML = pasStr;

    // Reset
    choices = []
    pasArr = []
}