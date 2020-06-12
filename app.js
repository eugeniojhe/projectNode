const express = require('express'); 
const mustache = require('mustache-express');
//console.log('mustache '+mustache);
//Routes 
/* const router = express.Router(); 
router.get('/',(req, resp)=>{
    resp.send('Hello World. I am here'); 
}) ;*/

const router = require('./routes/index.js'); 

//Settings 
const app = express();
app.use('/',router);
//json-> Permite acessar os dados 
//enviados via post. Esta informações
//estão em formato json. 
app.use(express.json());
app.engine('mst',mustache());
app.set('view engine','mst'); 
app.set('views',__dirname + '/views'); 


module.exports = app; 
