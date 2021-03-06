const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'}); 
mongoose.set('useUnifiedTopology', true,'useFindAndModify', false);
mongoose.connect(process.env.DATABASE,{
       useNewUrlParser: true, 
       useFindAndModify: false,
       useCreateIndex: true});
mongoose.Promise = global.Promise; 
mongoose.connection.on('error',(error)=>{
    console.error(`Ocorreu o seguinte erro de conexão ${error.message}`); 
});

//getting models
require('./Models/Post');

const app = require('./app'); 

app.set('port',process.env.PORT || 7777); 
//app.set('port',7777);
const server = app.listen(app.get('port'),()=>{
    console.log('Hello Server running '+server.address().port); 
});