const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 
mongoose.Promise = global.Promise; 

const userSchema = new mongoose.Schema({
    name:String,
    email:String   
}); 