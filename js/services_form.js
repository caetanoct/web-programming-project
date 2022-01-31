// Fetching elements
const button = document.querySelector("#send_button");
const service_type_select = document.querySelector("#service_type_select");
const pet_name = document.getElementById("pet_name");
const markup_date_picker = document.getElementById("markup_date_picker");
const radio_group = document.getElementsByName('radio_group');
// adding listeners
// button.onclick(printCheckedRadio());
service_type_select.addEventListener("change",printSelectedOption);
button.addEventListener("click",printAppointment);
pet_name.addEventListener("blur",printPetName);
markup_date_picker.addEventListener("blur",printDate);
// add listener for all radio group items
for (i = 0; i < radio_group.length; i++) {
    radio_group[i].addEventListener("change",printCheckedRadio);
}
// FUNCTIONS
function printDate () {
    console.log(markup_date_picker.value)
}
function printAppointment() {
    printPetName();
    printDate();
    printSelectedOption();
    printCheckedRadio();
}
function printPetName () {
    let name = pet_name.value;
    console.log(name);
}
function printCheckedRadio () {
    let collection = radio_group;
    for(i = 0; i < collection.length; i++) {
        if(collection[i].checked) {     
            console.log(collection[i].value + " -- " + collection[i].id);
        }
    }
}

function printSelectedOption() {
    let element = service_type_select;
    if (element.value == 0) {
        console.log("Por favor, selecione o tipo de serviço.");
    } else {
        let selectedStr = element.options[element.selectedIndex].text;
        console.log(`A opção selecionada tem o indice [${element.value}] e o valor de "${selectedStr}"`);
    }    
}