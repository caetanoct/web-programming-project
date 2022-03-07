const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Register = require('./Model/Register');
const Service = require('./Model/Service');

// pega variavel de ambiente em .env
require('dotenv/config');
mongoose.connect(process.env.DB_CONNECTION,()=>{console.log('Connected to DataBase successfully')})
// express app
const app = express();
// colocar o express pra usar cors
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get('/',(request,response)=> {
    response.send('EAEEEEE');
});
app.post('/post_service_form', async function(req, res){    
    console.log(req.body)
        // criando objeto a partir do esquema 
        const service = new Service({
            petName: req.body.petName,
            data: req.body.data,
            horario: req.body.horario,
            servico: req.body.servico,
            portePet: req.body.portePet
        });
        // metodo save retorna uma promise que devolve pro frontend as respostas.
        await service.save()
        .then(data=>{
            res.json(data);
        })
        .catch(err =>{
            res.json({message: err});
            console.log(err)
        }); 
});

app.post('/post_login_form', function(req, res){
    res.send(req.body);
});
// insere no banco de dados o registro do usuario
app.post('/post_register_form', async function(req, res){    
        console.log(req.body)
        // criando objeto a partir do esquema
        const register = new Register({
            cpf: req.body.cpf,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender
        });
        // metodo save retorna uma promise que devolve pro frontend as respostas.
        await register.save()
        .then(data=>{
            res.json(data);
        })
        .catch(err =>{
            res.json({message: err});
            console.log(err)
        });            
});

const port = 3000;
app.listen(port);