const User = require('../Models/User'); 

exports.login = (req,res)=>{
    res.render('login'); 
}

exports.register = (req,res) => {
    res.render('register'); 
}

exports.registerAction = (req,res) => {
   // res.json(req.body);
   const newUser = new User(req.body);  
   User.register(newUser,reg.body.password,(error)=>{
       if (error){
           console.log('Error registering '+error); 
           res.redirect('/'); 
           return; 
       }
       res.redirect('/'); 
   }); 

};