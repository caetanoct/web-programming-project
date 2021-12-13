const password = document.getElementById("pass1");
const confpassword = document.getElementById("pass2");
const button = document.querySelector("button");
// button.onclick(printCheckedRadio());
button.addEventListener("click",registerFormButtonPressed);
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