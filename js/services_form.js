// Fetching elements
const button = document.querySelector("#send_button");
const service_type_select = document.querySelector("#service_type_select");
const pet_name = document.getElementById("pet_name");
const markup_date_picker = document.getElementById("markup_date_picker");
const time_picker = document.getElementById("time");
const radio_group = document.getElementsByName('radio_group');
// adding listeners
// button.onclick(getCheckedRadio());
button.addEventListener("click",printAppointment);
pet_name.addEventListener("blur",getPetName);
markup_date_picker.addEventListener("blur",getDate);
time_picker.addEventListener("focus",printHelp);
time_picker.addEventListener("blur",removeHelp);
service_type_select.addEventListener("change",getSelectedOption);
// add listener for all radio group items
for (i = 0; i < radio_group.length; i++) {
    radio_group[i].addEventListener("change",getCheckedRadio);
}
// FUNCTIONS
function printHelp() {
    var tag = document.createElement("small");  
    var text = document.createTextNode("Digite o tempo no formato HH:MM AM/PM");    
    tag.appendChild(text);
    var help = document.querySelector("#time-col");
    help.appendChild(tag);
}
function removeHelp() {
    var help = document.querySelector("#time-col");
    help.removeChild(help.lastChild);
}
function getDate () {
    return markup_date_picker.value;
}
function printAppointment() {
    let name = getPetName();
    let date = getDate();
    let option = getSelectedOption();
    let pet_size = getCheckedRadio();
    window.alert("name="+name+" date="+date+" option="+option+" petsize="+pet_size);
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

function getSelectedOption() {
    let element = service_type_select;
    if (element.value == 0) {
        window.alert("Por favor, selecione o tipo de serviço.");        
    } else {
        let selectedStr = element.options[element.selectedIndex].text;
        return selectedStr;
        //console.log(`A opção selecionada tem o indice [${element.value}] e o valor de "${selectedStr}"`);
    }    
}