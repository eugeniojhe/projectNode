exports.userMiddleware = (req, res, next)=>
{
    let info = {name:"Eugenio",id:1010};
    req.userInfo = info; 
    next(); 
}

exports.index = (req,res)=>{
    let data = {
        pageTitle: 'Home Page',
        userInfo: req.userInfo,
    }; 

       
     res.render('home',data);
}