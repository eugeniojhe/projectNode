const User = require('../Models/User'); 

exports.login = (req,res)=>{
    res.render('login'); 
}

exports.loginAction = (req,res) =>{
    const auth = User.authenticate(); 
   
    auth(req.body.email, req.body.password, (error,result)=>{
        if (!result){
            req.flash('error','Email or Password invalid '+error);
            res.redirect('/users/login'); 
            return; 
        }

        req.login(result, ()=>{}); 
         req.flash('success','Now you are loged'); 
        res.redirect('/'); 
        return; 
    });
};

exports.register = (req,res) => {
    res.render('register'); 
}

exports.registerAction = (req,res) => {
   // res.json(req.body);
   const newUser = new User(req.body);  
   User.register(newUser,req.body.password,(error)=>{
       if (error){
           req.flash('error',+error+' please try later '); 
           res.redirect('/users/register'); 
           return; 
       }
       req.flash('success','Registration succesfully complete'); 
       res.redirect('/users/login');
       return;  
   }); 

};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
    return; 
}; 