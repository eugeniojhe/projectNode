const mongoose = require('mongoose'); 
const Post = mongoose.model('Post'); 


exports.index = async (req,res)=>{
    let responseData = {
        pageTitle: 'Home Page',
        userInfo: req.userInfo,
    }; 

    const posts = await Post.find();
    responseData.posts = posts; 
       
     res.render('home',responseData);
}