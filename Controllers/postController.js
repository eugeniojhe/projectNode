const mongoose = require('mongoose'); 
const Post = mongoose.model('Post'); 
exports.new = (req,res) =>{
    res.render('postnew');
}

exports.newAction = async (req,res) => {
   //res.json(req.body); 
   const post = new Post(req.body);
   await post.save();
   req.flash('success','Post save success'); 
   res.redirect('/'); 
}