module.exports.isLogged = (req,res,next) =>{
    if (!req.isAuthenticated()){
        req.flash('error','You are not loged please register or login'); 
        res.redirect('/users/login'); 
        return;
    }
    next(); 
};