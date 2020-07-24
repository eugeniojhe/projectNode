const User = require('../Models/User'); 
const { render } = require('../app');
const crypto = require('crypto'); 

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

exports.profile = (req,res) =>{
   res.render('profile');
}

exports.profileAction = async (req,res) => {

    try {
        const user = await User.findOneAndUpdate(
            {_id:req.user._id},
            { name:req.body.name, email:req.body.email},
            {new:true,runValidatores:true}
        ) 
    } catch (error) {
        req.flash('error','Error saving profile'+error.message); 
        res.redirect('/profile');
        return; 
    }
    req.flash('success','Success saving user profile'); 
    res.redirect('/profile'); 
}
exports.forgot = (req,res) => {
    res.render('forgot'); 
}

exports.forgotAction = async (req,res) =>{
    /*  try{
        const user = await User.findOne({email:req.body.email}).exec();
        console.log(user); 
    }catch(error){
        req.flash('error','trying to retrieve user');
        res.redirect( '/users/login');
        return;
     }
     */
     const user = await User.findOne({email:req.body.email}).exec();
     if (!user){
        req.flash('error',' email was send to user email');
        res.redirect('/users/login'); 
        return; 
    }
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    const dateNow = Date.now();  
    user.expirateDateToken = dateNow + 3600000;
    user.dateCreateToken = dateNow;  
    await user.save(); 

    const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`; 
    req.flash('success','We sent you an instruction  e-email '+resetLink); 
    res.redirect('/users/login');      
}

exports.forgotToken = async (req,res) =>{
    const user = await User.findOne({
        resetPasswordToken:req.params.token, 
        expirateDateToken:{ $gt:Date.now() } 
    }).exec();
    if (!user){
        req.flash('error','Invalid token, please redefine again your password'); 
        res.redirect('/users/forgot');
        return; 
    }
    res.render('redefine');  
    return; 
}
exports.forgotTokenAction = async (req,res) => {
    const user = await User.findOne({
        resetPasswordToken:req.params.token, 
        expirateDateToken:{ $gt:Date.now() } 
    }).exec();
    if (!user){
        req.flash('error','Invalid token, please redefine again your password'); 
        res.redirect('/users/forgot');
        
    }

    if (req.body.password.length < 6 ||  req.body.password_confirm < 6){
        req.flash('error','Invalid password'); 
        res.redirect('back');        
    };
    if (req.body.password != req.body.password_confirm){
        req.flash('error','Password are not the same');
        res.redirect('back');      
    }
    user.setPassword(req.body.password, async()=>{
        await user.save(); 
        req.flash('success','Password changed success'); 
        res.redirect('/users/login'); 
    })
    
}