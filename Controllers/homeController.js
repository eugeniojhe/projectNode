exports.index = (req,res)=>{
    let data = {
        pageTitle: 'Home Page',
        userInfo: req.userInfo,
    }; 

       
     res.render('home',data);
}