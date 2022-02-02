const email_element = document.getElementById("mail");
email_element.addEventListener("blur",mail_blur_handler);
function mail_blur_handler() {
    validate_email(email_element.value) == true ? email_element.style.background = "White" : email_element.style.background = "Salmon";    
}
// receveis email as a string, and return true if the email passes the regex test.
function validate_email(email) {
    // match negated sets of not whitespace and not @ character with one or more plus a @ symbol and negated set . negated set.
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}