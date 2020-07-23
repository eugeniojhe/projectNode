const { register } = require("../controllers/userController");

module.exports.isLogged = (req,res,next) =>{
    if (!req.isAuthenticated()){
        req.flash('error','You are not loged please register or login'); 
        res.redirect('/users/login'); 
        return;
    }
    next(); 
};

module.exports.changePassword = (req,res) =>{
    if (req.body.password.length < 6 ||  req.body.password_confirm < 6){
        req.flash('error','Invalid password'); 
        res.redirect('/profile'); 
        return; 
    };
    if (req.body.password != req.body.password_confirm){
        req.flash('error','Password are not the same');
        res.redirect('/profile');
        return; 
    }
    req.user.setPassword(req.body.password, async()=>{
        await req.user.save(); 
        req.flash('success','Password changed success'); 
        res.redirect('/'); 
    })     
}