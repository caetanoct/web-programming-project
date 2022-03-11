// ################## FETCHING ELEMENTS ##################
const button = document.querySelector("#send_button");
const delete_button = document.querySelector("#delete_button");
const markup_date_picker = document.getElementById("markup_date_picker");
const service_id = document.querySelector("#service_id");
// ################## EVENTS ##################
// button.onclick(getCheckedRadio());
button.addEventListener("click", change_service_date);
delete_button.addEventListener("click", delete_service);
markup_date_picker.addEventListener("blur", verifyDate);
// ################## ATTRIBUTES AND FLAGS ##################
var dateValid = false;
// ################## FUNCTIONS ##################
function delete_service() {
    console.log('deleting service');
    var data = {
        "_id": getID(),
    }    
    var url = "http://localhost:3000/service/"+getID();
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        let text = xhr.responseText;
        alert("The service was deleted, backend responde:"+text);
    }};
    let myjson = JSON.stringify(data);
    xhr.send(myjson);
}

function update_date(data) {
    console.log('Sending data');
    var url = "http://localhost:3000/service/"+getID();
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        let text = xhr.responseText;
        alert("The service was patched, backend responde:"+text);
    }};
    let myjson = JSON.stringify(data);
    xhr.send(myjson);
}

function getID() {
    return service_id.value;
}
function getDate() {
    return markup_date_picker.value;
}

function verifyDate() {
    if (getDate().length == 10) {
        dateValid = true;
    } else {
        dateValid = false;
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

function change_service_date() {
    console.log("fui clicado");
    if (dateValid) {
        var service_date = {
            "_id": getID(),
            "data": getDate(),
        }        
        update_date(service_date);
    } else {
        alert("date is unvalid.");
    }
}