// ################## FETCHING ELEMENTS ##################
const cpf = document.getElementById("cpf");
const register_name = document.getElementById("name");
const surname = document.getElementById("surname");
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
// validate CPF, param: cpf in this format 00000000000
function validate_cpf(str_cpf) {
    let sum = 0;
    let module = 0;
    if (str_cpf == "00000000000") return false;
    // sum 9 first digits multiplied by the reverse positioning index
    // example first digit is multiplied by 10, second multiblied by 9...
    for (i = 1; i <= 9; i++) {
        sum = sum + parseInt(str_cpf.substring(i-1,i)) * (11 - i);        
    }
    // multiply the sum obtained by 10 and divide by 11, the module value will be used to verify the first verifying digit
    module = (sum * 10) % 11;
    // if the value is 10 or 11 the value will be considered as 0
    if ((module == 10) || (module == 11)) {
        module = 0;
    }
    // if the module doesnt match first verifyng digit then return false, else continue to verify second digit
    if (module != parseInt(str_cpf.substring(9, 10))) {
        return false;  
    }
    // redefine the sum value
    sum = 0;
    for (i = 1; i <= 10; i++) {
        sum = sum + parseInt(str_cpf.substring(i-1,i)) * (12-i);
    }
    module = (sum * 10) % 11;
    if ((module == 10) || (module == 11)) {
       module = 0; 
    }
    // if the module doesnt matches neither the first nor the second, than return false.
    if (module != parseInt(str_cpf.substring(10,11))) {
        return false;
    }
    // if it passed the tests, then it means it's a valid cpf
    return true;
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
            var element = document.querySelector("#cpf-div-row");
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
            var element = document.querySelector("#cpf-div-row");
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
    window.alert(`
    CPF: ${cpf.value}\n
    NOME: ${register_name.value}\n
    SOBRENOME: ${surname.value}\n
    EMAIL: ${email.value}\n
    PASSWORD: ${password.value}\n
    CONFPASSWORD: ${confpassword.value}\n
    `);
}

function validate_password () {
    if (confpassword.value !== password.value) {
        confpassword.style.background = "Salmon";
    } else {
        confpassword.style.background = "white";
    }
}