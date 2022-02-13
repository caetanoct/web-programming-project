// ################## FETCHING ELEMENTS ##################
const button = document.querySelector("#send_button");
const pet_name = document.getElementById("pet_name");
const markup_date_picker = document.getElementById("markup_date_picker");
const time_picker = document.getElementById("time");
const service_type_select = document.querySelector("#service_type_select");
const radio_group = document.getElementsByName('radio_group');
// ################## EVENTS ##################
// button.onclick(getCheckedRadio());
button.addEventListener("click",printAppointment);
pet_name.addEventListener("input",verifyPetName);
markup_date_picker.addEventListener("blur",verifyDate);
time_picker.addEventListener("focus",printHelp);
time_picker.addEventListener("blur",removeHelp);
service_type_select.addEventListener("change",verifySelectedOption);
// add listener for all radio group items
for (i = 0; i < radio_group.length; i++) {
    radio_group[i].addEventListener("change",getCheckedRadio);
}
// ################## ATTRIBUTES AND FLAGS ##################
var petnameHelpTextAdded = false;
var petnameValid = false;
var dateValid = false;
var timeValid = false;
var serviceValid = false;

// ################## FUNCTIONS ##################
function printHelp() {
    var tag = document.createElement("small");  
    var text = document.createTextNode("Digite o tempo no formato HH:MM AM/PM");    
    tag.appendChild(text);
    var help = document.querySelector("#time-col");
    help.appendChild(tag);
}
function removeHelp() {
    verifyTime();
    var help = document.querySelector("#time-col");
    help.removeChild(help.lastChild);
}
function getDate () {
    return markup_date_picker.value;
}
function getTime () {
    return time_picker.value;
}
function getSelectedOption() {
    return service_type_select.options[service_type_select.selectedIndex].text;;  
}
function printAppointment() {
    if (petnameValid && dateValid && timeValid && serviceValid) {
        window.alert(`
        NOME DO PET: ${getPetName()}\n
        DATA: ${getDate()}\n
        HORÁRIO: ${getTime()}\n
        SERVIÇO: ${getSelectedOption()}\n
        `);
    } else {
        window.alert('Preencha os campos corretamente!');
    }
}
function getPetName () {
    let name = pet_name.value;
    return name;
    //console.log(name);
}
function getCheckedRadio () {
    let collection = radio_group;
    for(i = 0; i < collection.length; i++) {
        if(collection[i].checked) {
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

function verifyPetName () {
    if (pet_name.value.length == 0) return;
    // define prev_value as empty string
    let prev_value = "";
    // if pet_name value has more than 1 char (it will if a nan char is typed)
    if (pet_name.value.length > 1) {
        // the prev_value of the pet_name will be a string from 0 to length-1;
        prev_value = pet_name.value.substring(0,pet_name.value.length-1);
    }
    // if last character typed was not a letter
    if (!pet_name.value[pet_name.value.length-1].match(/[a-z]/i)){
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

function verifyDate () {
    if (getDate().length == 10) {
        dateValid = true;
    } else {
        dateValid = false;
    }
}

function verifyTime () {
    if (getTime().length == 5) {
        timeValid = true;
    } else {
        timeValid = false;
    }
}

function verifySelectedOption () {
    if (getSelectedOption().value == 0) {
        serviceValid = false;
    } else {
        serviceValid = true;
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