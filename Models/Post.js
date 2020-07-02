const mongoose = require('mongoose');
const slug = require('slug'); 
mongoose.Promise = global.Promise; 

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true, 
        required:'Post needs a title'
    },
    slug:String,
    body:{
        type:String,
        trim:true        
    },
    tags:[String],
    photo:String
});

postSchema.pre('save', async function(next){
    if (this.isModified('title')){
        this.slug = slug(this.title, {lower:true}); 
        const slugRregex = new Regexp(`^(${this.slug})((-[0-9]{1,}$)?)$`,'i');
        const postWithSlug = await this.contructor.find({slug:slugRegex});
        if (postWithSlug.length > 0){
            this.slug = `${this.slug}-${postWithSlug.length + 1}`;
        }
    };
    next(); 
    return; 
});
module.exports = mongoose.model('Post',postSchema); 