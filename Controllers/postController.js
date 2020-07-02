const mongoose = require('mongoose'); 
const Post = mongoose.model('Post'); 
const slug = require('slug'); 
exports.new = (req,res) =>{
    res.render('postnew');
}

exports.newAction = async (req,res) => {
   //res.json(req.body); 
   req.body.tags = req.body.tags.split(',').map(t=>t.trim());
   const post = new Post(req.body);
   try {
        await post.save();     
   } catch (error) {
        console.log(error.message); 
        req.flash('error','Error: '+error.message); 
        res.redirect('/post/new');
        return; 
   }  
   req.flash('success','Post save success'); 
   res.redirect('/');
   return;  
};

exports.edit =  async (req,res) =>{
     const post = await Post.findOne({slug:req.params.slug});
     res.render('postEdit',{post}); 
}

exports.editAction = async (req,res) =>
{
     console.log("req "+req.params); 
     //req.body.slug = slug(req.body.title, {lower:true});
     req.body.slug = slug(req.params.title, {lower:true});
     req.body.tags = req.body.tags.split(',').map(t=>t.trim());

     try{
          const post = await Post.findOneAndUpdate({slug:req.params.slug},
               req.body,
               {
                    new:true,
                    runValidators:true, 
               });
     }catch(error){
          req.flash('error','Post is not save'); 
          res.redirect('/post/'+req.params.slug+'edit'); 
     };
  
     req.flash('success',"Post atualizado com sucesso"); 
     res.redirect('/'); 
};

exports.view = async (req,res) =>{
     const post = await Post.findOne({slug:req.params.slug});
     res.render('view',{post});   
}
