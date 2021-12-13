const button = document.querySelector("button");
// button.onclick(printCheckedRadio());
button.addEventListener("click",printCheckedRadio);
function printCheckedRadio () {
    var ele = document.getElementsByName('radio_group');
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked) {     
            console.log(ele[i].value + " -- " + ele[i].id);
        }
    }
}