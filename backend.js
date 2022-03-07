const express = require('express');
const cors = require('cors');

const app = express();
// colocar o express pra usar cors
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/',(request,response)=> {
    response.send('EAEEEEE');
});

app.post('/post_service_form', function(req, res){    
    res.send(req.body);
    // insere no banco de dados
});

app.post('/post_login_form', function(req, res){
    res.send(req.body);
});

app.post('/post_register_form', function(req, res){
    res.send(req.body);
});

const port = 3000;
app.listen(port);