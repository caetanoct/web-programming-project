// ################## FETCHING ELEMENTS ##################
const email = document.getElementById("mail");
const password = document.getElementById("password");
const button = document.querySelector("#login_button");
// ################## EVENTS ##################
email.addEventListener("blur",verifyEmail);
password.addEventListener("blur",verifyPassword);
button.addEventListener("click",alertData);
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

function verifyPassword () {
    if (password.value.length > 0) {
        passwordValid = true;
    } else {
        passwordValid = false;
    }
}

function addWarning (field, fieldName, message) {
    // hightlight the background in red        
    field.style.background = "Salmon";
    // add new html element with help tips if it was not already added
    var tag = document.createElement("small");
    var text = document.createTextNode(message);
    tag.appendChild(text);
    var element = document.querySelector("#"+fieldName+"-div-row");
    element.appendChild(tag);
}

function alertData () {
    if (emailValid && passwordValid) {
        window.alert(`
        EMAIL: ${email.value}\n
        PASSWORD: ${password.value}\n
        `);
    } else {
        window.alert('Preencha os campos corretamente!');
    }
}