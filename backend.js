const express = require('express');
const cors = require('cors');

const app = express();
// colocar o express pra usar cors
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/',(request,response)=> {
    response.send('EAEEEEE');
});

const port = 3000;
app.listen(port);