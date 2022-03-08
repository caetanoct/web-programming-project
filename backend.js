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
// registra no BD um servico
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
// faz update na data de um servico
app.patch("/service/:id", async(req,res)=>{
    const updatedService = await Se.updateOne(
        {_id: req.params.id}, 
        {$set: {data: req.body.data}});
    res.json(updatedService);
});
// deleta o agendamento de servico
app.delete("/service/:id", async(req,res)=>{
    const removedService = await Service.remove({_id: req.params.id});
    res.json(removedService);
});
// busca dados de registro a partir do email informado, retorna o registro caso a autenticação é valida, caso contrario retorna uma msg informando que falhou.
app.post('/auth_login', async function(req, res){
    const register = await Register.find({email: req.body.email});
    object = register[0];
    if (object === undefined) {
        console.log("email register not found.");
        res.send("username or password failed.");
    } else {
        if (object.password == req.body.password) {
            res.json(register);
        } else {
            console.log("passwords don't match.");
            res.send("username or password failed.");
        }
    }
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