const cpf = document.getElementById("cpf");
cpf.setAttribute("maxlength","14");
const password = document.getElementById("pass1");
const confpassword = document.getElementById("pass2");
const button = document.querySelector("button");
// button.onclick(printCheckedRadio());
button.addEventListener("click",registerFormButtonPressed);
cpf.addEventListener("input", maskCPF);
cpf.addEventListener("keypress", highlightOnNaN);
function highlightOnNaN () {
    if (isNaN(cpf.value[cpf.value.length-1])){        
        cpf.style.background = "red";
        cpf.value = prev_value;
        return;
    } else {
        cpf.style.background = "white";
    }
}
var cpfHelpTextAdded = false;
function maskCPF () {
    console.log(cpf.value);
    let prev_value = "";
    if (cpf.value.length > 1) {
        prev_value = cpf.value.substring(0,cpf.value.length-1);
    }
    if (isNaN(cpf.value[cpf.value.length-1])){        
        cpf.style.background = "Salmon";
        if (!cpfHelpTextAdded) {
            var tag = document.createElement("small");
            var text = document.createTextNode("Por favor, Digite números para o CPF.");
            tag.appendChild(text);
            var element = document.querySelector(".form-row");
            element.appendChild(tag);
            cpfHelpTextAdded = true;
        }
        cpf.value = prev_value;
        return;
    } else {
        cpf.style.background = "white";
        if (cpfHelpTextAdded) {
            var element = document.querySelector(".form-row");
            element.removeChild(element.lastChild);
            cpfHelpTextAdded = false;
        }
    }
    if (cpf.value.length == 3) cpf.value += ".";
    if (cpf.value.length == 7) cpf.value += ".";
    if (cpf.value.length == 11) cpf.value += "-";
}
function registerFormButtonPressed () {
    validatePassword();
}
confpassword.addEventListener('change',validatePassword);
function validatePassword () {
    if (confpassword.value !== password.value) {
        console.log("passwords don't match");
    } else {
        console.log("passwords match");
    }
}