// ################## FETCHING ELEMENTS ##################
const email = document.getElementById("mail");
const password = document.getElementById("password");
const button = document.querySelector("#login_button");
// ################## EVENTS ##################
email.addEventListener("blur", verifyEmail);
password.addEventListener("blur", verifyPassword);
button.addEventListener("click", login);
// ################## ATTRIBUTES AND FLAGS ##################
var emailHelpTextAdded = false;
var emailValid = false;
var passwordValid = false;

// ################## FUNCTIONS ##################

function verifyEmail() {
    // match negated sets of not whitespace and not @ character with one or more plus a @ symbol and negated set. negated set.
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
        if (!emailHelpTextAdded) {
            addWarning(email, "mail", "Por favor, preencha o email adequadamente.");
            emailHelpTextAdded = true;
        }
        emailValid = false;
    } else {
        // unhighlight the background
        email.style.background = "White";
        // and if the HTML element was added, remove it
        if (emailHelpTextAdded) {
            var element = document.querySelector("#mail-div-row");
            element.removeChild(element.lastChild);
            emailHelpTextAdded = false;
        }
        emailValid = true;
    }
}

function verifyPassword() {
    passwordValid = password.value.length > 0;
}

function addWarning(field, fieldName, message) {
    // hightlight the background in red        
    field.style.background = "Salmon";
    // add new html element with help tips if it was not already added
    var tag = document.createElement("small");
    var text = document.createTextNode(message);
    tag.appendChild(text);
    var element = document.querySelector("#" + fieldName + "-div-row");
    element.appendChild(tag);
}

function login() {
    if (emailValid && passwordValid) {
        var login = {
            "email": email.value,
            "password": password.value
        }
        console.log(login)
    } else {
        window.alert('Preencha os campos corretamente!');
    }
}