// ################## FETCHING ELEMENTS ##################
const button = document.querySelector("#send_button");
const pet_name = document.getElementById("pet_name");
const markup_date_picker = document.getElementById("markup_date_picker");
const time_picker = document.getElementById("time");
const service_type_select = document.querySelector("#service_type_select");
const radio_group = document.getElementsByName('radio_group');
const alertaErro = document.querySelector("#alerta_erro");
// ################## EVENTS ##################
// button.onclick(getCheckedRadio());
button.addEventListener("click", agendarServico);
pet_name.addEventListener("input", verifyPetName);
markup_date_picker.addEventListener("blur", verifyDate);
time_picker.addEventListener("focus", printHelp);
time_picker.addEventListener("blur", removeHelp);
service_type_select.addEventListener("change", verifySelectedOption);
// add listener for all radio group items
for (i = 0; i < radio_group.length; i++) {
    radio_group[i].addEventListener("change", getCheckedRadio);
}
// ################## ATTRIBUTES AND FLAGS ##################
var petnameHelpTextAdded = false;
var petnameValid = false;
var dateValid = false;
var timeValid = false;
var serviceValid = false;

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
      var response = XHR.responseText;
      alert( 'Yeah! Data sent and response loaded. Service ='+ response);
      var json = JSON.parse(response);
      console.log(json);
      console.log("id="+json._id);
    } );
  
    // Define what happens in case of error
    XHR.addEventListener( 'error', function(event) {
      alert( 'Oops! Something went wrong.' );
    } );
  
    // Set up our request
    XHR.open( 'POST', 'http://localhost:3000/post_service_form' );
  
    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  
    // Finally, send our data.
    XHR.send( urlEncodedData );
}
function printHelp() {
    var tag = document.createElement("small");
    var text = document.createTextNode("Você pode digitar o tempo, se preferir.");
    tag.appendChild(text);
    var help = document.querySelector("#time-col");
    help.appendChild(tag);
}

function removeHelp() {
    verifyTime();
    var help = document.querySelector("#time-col");
    help.removeChild(help.lastChild);
}

function getDate() {
    return markup_date_picker.value;
}

function getTime() {
    return time_picker.value;
}

function getSelectedOption() {
    return service_type_select.options[service_type_select.selectedIndex].text;
    ;
}


function getPetName() {
    let name = pet_name.value;
    return name;
    //console.log(name);
}

function getCheckedRadio() {
    let collection = radio_group;
    for (i = 0; i < collection.length; i++) {
        if (collection[i].checked) {
            switch (collection[i].value) {
                case "option1":
                    return "Grande";
                case "option2":
                    return "Médio";
                case "option3":
                    return "Pequeno";
            }
            // console.log(collection[i].value + " -- " + collection[i].id);             
        }
    }
}

function verifyPetName() {
    if (pet_name.value.length == 0) return;
    // define prev_value as empty string
    let prev_value = "";
    // if pet_name value has more than 1 char (it will if a nan char is typed)
    if (pet_name.value.length > 1) {
        // the prev_value of the pet_name will be a string from 0 to length-1;
        prev_value = pet_name.value.substring(0, pet_name.value.length - 1);
    }
    // if last character typed was not a letter
    if (!pet_name.value[pet_name.value.length - 1].match(/[a-z]/i)) {
        if (!petnameHelpTextAdded) {
            addWarning(pet_name, "pet_name", "Por favor, digite apenas letras.");
            petnameHelpTextAdded = true;
        }
        // restore the old pet_name value
        pet_name.value = prev_value;
        petnameValid = false;
        return;
    } else {
        // unhighlight the background
        pet_name.style.background = "white";
        // and if the HTML element was added, remove it
        if (petnameHelpTextAdded) {
            var element = document.querySelector("#pet_name-div-row");
            element.removeChild(element.lastChild);
            petnameHelpTextAdded = false;
        }
        if (pet_name.value.length > 1) {
            petnameValid = true;
        }
    }
}

function verifyDate() {
    if (getDate().length == 10) {
        dateValid = true;
    } else {
        dateValid = false;
    }
}

function verifyTime() {
    if (getTime().length == 5) {
        timeValid = true;
    } else {
        timeValid = false;
    }
}

function verifySelectedOption() {
    if (getSelectedOption().value == 0) {
        serviceValid = false;
    } else {
        serviceValid = true;
    }
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

function agendarServico() {
    const portePet = document.querySelector('input[name="porte_pet"]:checked')
    if (petnameValid && dateValid && timeValid && serviceValid && portePet) {
        var serviceForm = {
            "petName": getPetName(),
            "data": getDate(),
            "horario": getTime(),
            "servico": getSelectedOption(),
            "portePet": portePet.value,
        }        
        sendData(serviceForm);
    } else {
        alertaErro.removeAttribute("hidden");
    }
}

function removeErrorAlert(){
    alertaErro.setAttribute("hidden", "");
}