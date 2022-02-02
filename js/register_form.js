// ################## FETCHING ELEMENTS ##################
const cpf = document.getElementById("cpf");
const password = document.getElementById("pass1");
const confpassword = document.getElementById("pass2");
const button = document.querySelector("#register_button");
const email = document.querySelector("#mail");
// ################## EVENTS ##################
// button.onclick(printCheckedRadio());
password.addEventListener('change',validate_password);
confpassword.addEventListener('change',validate_password);
button.addEventListener("click",register_form_button_pressed);
cpf.addEventListener("input", mask_CPF);
email.addEventListener("blur", mail_blur_handler);
// ################## FUNCTIONS ##################
cpf.setAttribute("maxlength","14");
var cpfHelpTextAdded = false;

function mail_blur_handler() {
    validate_email(email.value) == true ? email.style.background = "White" : email.style.background = "Salmon";    
}
// receveis email as a string, and return true if the email passes the regex test.
function validate_email(email) {
    // match negated sets of not whitespace and not @ character with one or more plus a @ symbol and negated set . negated set.
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mask_CPF () {
    console.log(cpf.value);
    // define prev_value as empty string
    let prev_value = "";
    // if cpf value has more than 1 char (it will if a nan char is typed)
    if (cpf.value.length > 1) {
        // the prev_value of the cpf will be a string from 0 to length-1;
        prev_value = cpf.value.substring(0,cpf.value.length-1);
    }
    // if last chracter typed was not a number
    if (isNaN(cpf.value[cpf.value.length-1])){
        // hightlight the background in red        
        cpf.style.background = "Salmon";
        // add new html element with help tips if it was not already added
        if (!cpfHelpTextAdded) {
            var tag = document.createElement("small");
            var text = document.createTextNode("Por favor, Digite números para o CPF.");
            tag.appendChild(text);
            var element = document.querySelector(".form-row");
            element.appendChild(tag);
            cpfHelpTextAdded = true;
        }
        // restore the old cpf value
        cpf.value = prev_value;
        // stop execution and dont mask
        return;
    } else {
        // if last character is a number; unhighlight the background
        cpf.style.background = "white";
        // and if the HTML element was added, remove it
        if (cpfHelpTextAdded) {
            var element = document.querySelector(".form-row");
            element.removeChild(element.lastChild);
            cpfHelpTextAdded = false;
        }
    }
    // mask the cpf
    if (cpf.value.length == 3) cpf.value += ".";
    if (cpf.value.length == 7) cpf.value += ".";
    if (cpf.value.length == 11) cpf.value += "-";
}

function register_form_button_pressed () {    
    validate_password();    
    console.log("the mail test result is = "+validate_email(email.value));
}

function validate_password () {
    if (confpassword.value !== password.value) {
        console.log("passwords don't match");
    } else {
        console.log("passwords match");
    }
}