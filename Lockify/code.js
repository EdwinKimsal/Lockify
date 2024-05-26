// HTML ID Variables
const pas = document.getElementById('password');
const pasVal = getComputedStyle(pas);
const range = document.getElementById('range');
const cap = document.getElementById('cap');
const low = document.getElementById('low');
const num = document.getElementById('num');
const sym = document.getElementById('sym');
const hide = document.getElementById('hide');
const sim = document.getElementById('sim');
const inc = document.getElementById("inc");
const exc = document.getElementById("exc");

// Array Variables
var matchArr = [];
const capArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const lowArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const numArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const symArr = ['!', '"', '#', '$', '%', '&', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~']
var choices = [];
var pasArr = [];
var simChar = ['I', 'i', 'l', 'L', '1', '|', '0', 'o', 'O'];
var include = [];
var exclude = [];

// Change Text Color
function colorChange(){
    var char = pas.className.split("");
    var colors = ["#8FCAFF", "#FC8FFF", "#FFC48F", "#92FF8F", "white", "#FF7276"];
    var spans = [];

    for(var i = 0; i < char.length; i++){
        // Check for Cap
        if(capArr.includes(char[i]) == true){
            var color = colors[0]
            var span = "<span style='color: " + color + "; font-size: 1rem" + ";'>" + char[i] + "</span>"
        }

        // Check for Low
        else if(lowArr.includes(char[i]) == true){
            var color = colors[1]
            var span = "<span style='color: " + color + "; font-size: 1rem" + ";'>" + char[i] + "</span>"
        }

        // Check for Num
        else if(numArr.includes(char[i]) == true){
            var color = colors[2]
            var span = "<span style='color: " + color + "; font-size: 1rem" + ";'>" + char[i] + "</span>"
        }

        // Check for Sym
        else if(symArr.includes(char[i]) == true){
            var color = colors[3]
            var span = "<span style='color: " + color + "; font-size: 1rem" + ";'>" + char[i] + "</span>"
        }

        // Check for others
        else{
            var color = colors[4]
            var span = "<span style='color: " + color + "; font-size: 1rem" + ";'>" + char[i] + "</span>"
        }

        // Check for Hidden Box
        if (hide.checked == true){
            var color = colors[5]
            var span = "<span style='color: " + color + "; font-size: 1rem" + ";'> * </span>"
        }


        // Push Results
        spans.push(span);
    }

    // Setting Colored Spans As A Paragraph
    pas.innerHTML = spans.join(" ");
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

    if (sim.checked === true){
        for(var i = 0; i < simChar.length; i++){
            if (choices.includes(simChar[i]) === true){
                var index = choices.indexOf(simChar[i]);
                choices.splice(index, 1)
            }
        }
    }

    // Add to the Include and Exclude Arrays by splitting elements by ' =+= '
    include = inc.value.split(" =+= ");
    exclude = exc.value.split(" =+= ");

    // Add Include Array Into Choices Array
    choices = choices.concat(include);

    // Remove Each Include Element Into Array
    for (var i = 0; i < exclude.length; i++){
        // If exclude element is in the choices array...
        if (choices.includes(exclude[i])){
            // Set index and remove the element
            var index = choices.indexOf(exclude[i]);
            choices.splice(index, 1);
        }
    }

    // Randomize array in-place using Durstenfeld Shuffle Algorithm
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

    // Save Password
    pas.className = pasStr;

    // Change Color
    colorChange()

    // Reset
    choices = []
    pasArr = []
}

// Slider Update
function slider(){
    // Changing Length Value
    document.getElementById('slider').innerHTML = 'Length: ' + document.getElementById('range').value;

    // Generate
    generate()
}

// Copy Password To Clipboard
function copy(){
    // Setting text variable
    text = pas.className

    // Copy the text inside the text field
    navigator.clipboard.writeText(text)
}