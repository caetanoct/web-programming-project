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
// ############### VALIDATION FUNCTIONS ###############
// validate CPF, param: cpf in this format 00000000000
function validate_cpf(cpf) {
    let sum = 0;
    let module = 0;
    let str_cpf = cpf.substring(0, 3) + cpf.substring(4, 7) + cpf.substring(8, 11) + cpf.substring(12);

    if (str_cpf == "00000000000") return false;
    // sum 9 first digits multiplied by the reverse positioning index
    // example first digit is multiplied by 10, second multiblied by 9...
    for (i = 1; i <= 9; i++) {
        sum = sum + parseInt(str_cpf.substring(i - 1, i)) * (11 - i);
    }
    // multiply the sum obtained by 10 and divide by 11, the module value will be used to verify the first verifying digit
    module = (sum * 10) % 11;
    // if the value is 10 or 11 the value will be considered as 0
    if ((module == 10) || (module == 11)) {
        module = 0;
    }
    // if the module doesnt match first verifyng digit then return false, else continue to verify second digit
    if (module != parseInt(str_cpf.substring(9, 10))) {
        return false;
    }
    // redefine the sum value
    sum = 0;
    for (i = 1; i <= 10; i++) {
        sum = sum + parseInt(str_cpf.substring(i - 1, i)) * (12 - i);
    }
    module = (sum * 10) % 11;
    if ((module == 10) || (module == 11)) {
        module = 0;
    }
    // if the module doesnt matches neither the first nor the second, than return false.
    if (module != parseInt(str_cpf.substring(10, 11))) {
        return false;
    }
    // if it passed the tests, then it means it's a valid cpf
    return true;
}
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
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        if (req.body.data.length == 10) {
            const updatedService = await Service.updateOne(
                {_id: req.params.id}, 
                {$set: {data: req.body.data}});
            res.json(updatedService);
        } else {
            res.send("Unvalid data!");
        }
    } else {
        res.send("Invalid ID");   
    }    
});
// deleta o agendamento de servico
app.delete("/service/:id", async(req,res)=>{
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        const removedService = await Service.remove({_id: req.params.id});
        res.json(removedService);
    } else {
        res.send("Invalid ID");
    } 
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
    var cpfValid = validate_cpf(req.body.cpf);
    var nameValid = /^[a-zA-Z ]+$/.test(req.body.nome);
    var surnameValid = /^[a-zA-Z ]+$/.test(req.body.sobrenome);
    var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email);
    var passwordValid = true;
    var register_valid = cpfValid && nameValid && surnameValid && emailValid && passwordValid;
    console.log(req.body)
    // criando objeto a partir do esquema
    if (register_valid) {
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
    } else {
        res.send("Something is wrong! Register is not valid!");
    }  
});

const port = 3000;
app.listen(port);