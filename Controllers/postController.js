const mongoose = require('mongoose'); 
const Post = mongoose.model('Post'); 
exports.new = (req,res) =>{
    res.render('postnew');
}

exports.newAction = async (req,res) => {
   //res.json(req.body); 
   const post = new Post(req.body);
   try {
        await post.save();     
   } catch (error) {
        req.flash('error','Error: '+error.message); 
        res.redirect('/post/new');
   }
  
   req.flash('success','Post save success'); 
   res.redirect('/'); 
};

exports.edit =  async (req,res) =>{
     const post = await Post.findOne({slug:req.params.slug});
     res.render('postEdit',{post}); 
}

exports.editAction = async (req,res) =>
{
     const post = await Post.findOneAndUpdate({slug:req.params.slug},
          req.body,
          {
               new:true,
               runValidators:true, 
          });
          req.flash('success',"Post atualizado com sucesso"); 
          res.redirect('/'); 
};