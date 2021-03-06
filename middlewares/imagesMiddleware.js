const multer = require('multer'); //Forms multpart  
const jimp = require('jimp'); //Resizes images 
const uuid = require('uuid'); //Validate mime images

const multerOptions =  {
    storage:multer.memoryStorage(),
    fileFilter:(req,file,next)=>{
        const allowed = ['image/jpeg','image/png','image/jpg'];
        if (allowed.includes(file.mimetype)){
            next(null,true); 
        }else{
            next({message:"Invalid file extension"},false); 
        }
    },
};
exports.upload = multer(multerOptions).single('photo');
exports.resizePhoto = async (req,res,next) =>{
    if(!req.file){
        next();
        return; 
    }
    const ext = req.file.mimetype.split('/')[1];
    let fileName = `${uuid.v4()}.${ext}`;
    req.body.photo = fileName; 
    const photo =  await jimp.read(req.file.buffer);        
   try{
    await photo.resize(800,jimp.AUTO);
    await photo.writeAsync(`./public/assets/media/${fileName}`);    
    next(); 
    return; 
   }catch(error){
     req.flash('error'+error.message); 
    next();
    return;  
   }
   ;      
    next();
    return; 
}; 