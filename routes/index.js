const express = require('express');
  

//Routes 
/* const router = express.Router(); 
router.get('/',(req, resp)=>{
    resp.send('Hello World. I am here, again'); 
});

 router.get('/object',(req,res)=>{
    let name = req.query.name; 
    let lastName = req.query.lastname;
    //Get: req.query
    //Post: req.body 

    res.json(req.query);      
    });
   

router.get('/sobre',(req,resp)=>{
    resp.send('Pagina Sobre o sistema => '+req.query.system); 
});

router.get('/post/:id',(req,res)=>{
    let id = req.params.id;
    res.send('You selected post '+id); 
});

router.get('/post/:slug',(req,res)=>{
    let slug = req.params.slug;
    res.send('You selected post '+slug); 
}); */

const router  = express.Router();
router.get('/',(req,res)=>{
    res.render('home',{
        'name':'Eugenio',
        'job':'Development',
        'salary':'$5,000,00'
    }); 
});
module.exports = router; 