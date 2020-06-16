const express = require('express'); 
const mustache = require('mustache-express');
//console.log('mustache '+mustache);
//Routes 
/* const router = express.Router(); 
router.get('/',(req, resp)=>{
    resp.send('Hello World. I am here'); 
}) ;*/

const router = require('./routes/index.js'); 
const helpers = require('./helpers.js'); 
const errorHandler = require('./handlers/errorHandler.js');
//Settings 
const app = express();
app.use((req,res,next)=>{
    res.locals.h = helpers; 
    res.locals.test = 'Hi Eugenio - You are going very good  - Near to get a good salary - Believe you can'; 
    next(); 
});

//json-> Permite acessar os dados 
//enviados via post. Esta informações
//estão em formato json. 
app.use(express.json());
app.use('/',router);
app.use(errorHandler.notFound); 
/*app.use((req,res,next)=>
{
    res.send('Page nof found'); 
});*/
//app.engine('mst',mustache());
app.engine('mst',mustache(__dirname +'/views/partials','.mst')); 
app.set('view engine','mst'); 
app.set('views',__dirname + '/views'); 


module.exports = app; 
