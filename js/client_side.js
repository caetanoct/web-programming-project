const ajax = new XMLHttpRequest();

ajax.open('GET','http://localhost:3000');

ajax.onreadystatechange = function () {
    received_text = ajax.responseText;
    window.alert(received_text);
}

// envia requisicao para o servidor
ajax.send();