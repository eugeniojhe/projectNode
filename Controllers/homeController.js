const mongoose = require('mongoose'); 
const Post = mongoose.model('Post'); 


exports.index = async (req,res)=>{
    let responseData = {
        pageTitle: 'Home Page',
        userInfo: req.userInfo,
        posts:[],
        tags:[],
        tag:'',

    }; 
    responseData.tag = req.query.t; 
    const posts = await Post.find();
    responseData.posts = posts;
    
    const tags = await Post.getTagList();
   
    for (i in tags){
        if (tags[i]._id === responseData.tag){
            tags[i].class = 'selected'; 
        }
    }
     responseData.tags = tags;     
     res.render('home',responseData);
}