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
    const postFilter = (typeof responseData.tag != 'undefined')?{tags:responseData.tag}:{};
    
    
    const postsPromise = await Post.find(postFilter);
    const tagsPromise = await Post.getTagList();
    //const result = await Promise.all([postsPromise,tagsPromise]); 
    const [posts,tags] = await Promise.all([postsPromise,tagsPromise]);

    //const posts = result[0];
    //const tags = result[1]; 
    responseData.posts = posts;
   
    for (i in tags){
        if (tags[i]._id === responseData.tag){
            tags[i].class = 'selected'; 
        }
    }
     responseData.tags = tags;     
     res.render('home',responseData);
}