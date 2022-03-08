// ################## FETCHING ELEMENTS ##################
const email = document.getElementById("mail");
const password = document.getElementById("password");
const button = document.querySelector("#login_button");
const alertaErro = document.querySelector("#alerta_erro");
// ################## EVENTS ##################
email.addEventListener("blur", verifyEmail);
password.addEventListener("blur", verifyPassword);
button.addEventListener("click", login);
// ################## ATTRIBUTES AND FLAGS ##################
var emailHelpTextAdded = false;
var emailValid = false;
var passwordValid = false;

// ################## FUNCTIONS ##################
// function from tutorial https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
function sendData( data ) {
    console.log( 'Sending data' );
  
    const XHR = new XMLHttpRequest();
  
    let urlEncodedData = "",
        urlEncodedDataPairs = [],
        name;
  
    // Turn the data object into an array of URL-encoded key/value pairs.
    for( name in data ) {
      urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ) );
    }
  
    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behavior of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );
  
    // Define what happens on successful data submission
    XHR.addEventListener( 'load', function(event) {
      alert( 'Yeah! Data sent and response loaded.' );      
    } );
  
    // Define what happens in case of error
    XHR.addEventListener( 'error', function(event) {
      alert( 'Oops! Something went wrong.' );
    } );
  
    // Set up our request
    XHR.open( 'POST', 'http://localhost:3000/auth_login' );
  
    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
           
    // Finally, send our data.
    XHR.send( urlEncodedData );
}
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
        sendData(login);
    } else {
        alertaErro.removeAttribute("hidden");
    }
}

function removeErrorAlert(){
    alertaErro.setAttribute("hidden", "");
}