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
button.addEventListener("click",register_form_button_pressed);
cpf.addEventListener("input", mask_CPF);
cpf.addEventListener("blur", verify_cpf);
register_name.addEventListener("input", verifyName);
surname.addEventListener("input", verifySurname);
email.addEventListener("blur", verifyEmail);
password.addEventListener("input", verifyPassword);
password.addEventListener("input",validate_password);
confpassword.addEventListener("input",validate_password);
// ################## ATTRIBUTES AND FLAGS ##################
cpf.setAttribute("maxlength","14");
var cpfHelpTextAdded = false;
var nameHelpTextAdded = false;
var surnameHelpTextAdded = false;
var emailHelpTextAdded = false;
var passwordHelpTextAdded = false;
var confpasswordHelpTextAdded = false;
var cpfValid = false;
var nameValid = false;
var surnameValid = false;
var emailValid = false;
var passwordValid = false;

// ################## FUNCTIONS ##################

// validate CPF, param: cpf in this format 00000000000
function validate_cpf () {
    let sum = 0;
    let module = 0;
    let str_cpf = cpf.value.substring(0,3) + cpf.value.substring(4,7) + cpf.value.substring(8,11) + cpf.value.substring(12);

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

// checks if the cpf is valid in terms of size and format
function verify_cpf () {
    let str_cpf = cpf.value;

    // if the cpf is incomplete, trigg a message
    if (str_cpf.length < 14) {
        cpf.style.background = "Salmon";
        if (!cpfHelpTextAdded) {
            addWarning(cpf, "cpf", "Por favor, digite um tamanho de CPF válido.");
            cpfHelpTextAdded = true;
        }
        cpfValid = false;
        return;
    }

    if (!validate_cpf()) {
        cpf.style.background = "Salmon";
        if (!cpfHelpTextAdded) {
            addWarning(cpf, "cpf", "Por favor, digite um CPF válido.");
            cpfHelpTextAdded = true;
        }
        cpfValid = false;
        return;
    }
    cpfValid = true;
}

// set a mask for cpf field
function mask_CPF () {
    // define prev_value as empty string
    let prev_value = "";
    // if cpf value has more than 1 char (it will if a nan char is typed)
    if (cpf.value.length > 1) {
        // the prev_value of the cpf will be a string from 0 to length-1;
        prev_value = cpf.value.substring(0,cpf.value.length-1);
    }
    // if last character typed was not a number
    if (isNaN(cpf.value[cpf.value.length-1])){
        if (!cpfHelpTextAdded) {
            addWarning(cpf, "cpf", "Por favor, digite apenas números para o CPF.");
            cpfHelpTextAdded = true;
        }
        // restore the old cpf value
        cpf.value = prev_value;
        // stop execution and dont mask
        return;
    } else {
        // unhighlight the background
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

// checks if the name is valid in terms of size and format
function verifyName () {
    if (register_name.value.length == 0) return;
    // define prev_value as empty string
    let prev_value = "";
    // if register_name value has more than 1 char (it will if a nan char is typed)
    if (register_name.value.length > 1) {
        // the prev_value of the register_name will be a string from 0 to length-1;
        prev_value = register_name.value.substring(0,register_name.value.length-1);
    }

    // if last character typed was not a letter
    if (!register_name.value[register_name.value.length-1].match(/[a-z]/i)){
        if (!nameHelpTextAdded) {
            addWarning(register_name, "name", "Por favor, digite apenas letras.");
            nameHelpTextAdded = true;
        }
        // restore the old register_name value
        register_name.value = prev_value;
        nameValid = false;
        return;
    } else {
        // unhighlight the background
        register_name.style.background = "white";
        // and if the HTML element was added, remove it
        if (nameHelpTextAdded) {
            var element = document.querySelector("#name-div-row");
            element.removeChild(element.lastChild);
            nameHelpTextAdded = false;
        }
        if (register_name.value.length > 1) {
            nameValid = true;
        }
    }
}

// checks if the surname is valid in terms of size and format
function verifySurname () {
    if (surname.value.length == 0) return;
    // define prev_value as empty string
    let prev_value = "";
    // if surname value has more than 1 char (it will if a nan char is typed)
    if (surname.value.length > 1) {
        // the prev_value of the surname will be a string from 0 to length-1;
        prev_value = surname.value.substring(0,surname.value.length-1);
    }
    // if last character typed was not a letter
    if (!surname.value[surname.value.length-1].match(/[a-z]/i)){
        if (!surnameHelpTextAdded) {
            addWarning(surname, "surname", "Por favor, digite apenas letras.");
            surnameHelpTextAdded = true;
        }
        // restore the old surname value
        surname.value = prev_value;
        return;
    } else {
        // unhighlight the background
        surname.style.background = "white";
        // and if the HTML element was added, remove it
        if (surnameHelpTextAdded) {
            var element = document.querySelector("#surname-div-row");
            element.removeChild(element.lastChild);
            surnameHelpTextAdded = false;
        }
        if (surname.value.length > 1) {
            surnameValid = true;
        }
    }
}

// checks if the email is valid in terms of format
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

// checks if the password is valid in terms of size and strength
function verifyPassword () {
    let strength = 0;
    let pass_str = password.value;
    // define how strong is the password
    if (/[a-z]/.test(pass_str)) strength++;
    if (/[A-Z]/.test(pass_str)) strength++;
    if (/[0-9]/.test(pass_str)) strength++;
    if (/[^A-Za-z0-9]/.test(pass_str)) strength++;

    // remove the element if it was added before
    password.style.background = "White";
    if (passwordHelpTextAdded) {
        var element = document.querySelector("#pass1-div-row");
        element.removeChild(element.lastChild);
        passwordHelpTextAdded = false;
    }

    // if the strength is 0, it means that there is no password
    if (strength == 0) return;
    
    // describes the intensity of the strength
    let strengthMsg = "";
    if (strength == 1) strengthMsg = "fraca"
    else if (strength == 2) strengthMsg = "média"
    else if (strength == 3) strengthMsg = "forte"
    else if (strength == 4) strengthMsg = "muito forte";

    let colors = ["LightCoral", "LightGoldenRodYellow", "PaleGreen", "LightGreen"];
    addWarning(password, "pass1", "Intensidade da senha: "+strengthMsg);
    password.style.background = colors[strength-1];
    passwordHelpTextAdded = true;
}

// checks if both passwords are equal
function validate_password () {
    if (confpassword.value !== password.value) {
        if (!confpasswordHelpTextAdded) {
            addWarning(confpassword, "pass2", "As senhas estão diferentes.");
            confpasswordHelpTextAdded = true;
            passwordValid = false;
        }
    } else {
        // unhighlight the background
        confpassword.style.background = "White";
        // and if the HTML element was added, remove it
        if (confpasswordHelpTextAdded) {
            var element = document.querySelector("#pass2-div-row");
            element.removeChild(element.lastChild);
            confpasswordHelpTextAdded = false;
        }
        if (confpassword.value.length > 1) {
            passwordValid = true;
        }
    }
}

// pattern for adding a warning
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

// alert only if all entries are valid
function register_form_button_pressed () {
    if (cpfValid && nameValid && surnameValid && emailValid && passwordValid) {
        window.alert(`
        CPF: ${cpf.value}\n
        NOME: ${register_name.value}\n
        SOBRENOME: ${surname.value}\n
        EMAIL: ${email.value}\n
        PASSWORD: ${password.value}\n
        CONFPASSWORD: ${confpassword.value}\n
        `);
    } else {
        window.alert('Preencha os campos corretamente!');
    }
    
}

