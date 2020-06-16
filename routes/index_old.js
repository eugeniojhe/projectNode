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
    let data = {
       // pageTitle:'Titulo da pagina', 
        name:req.query.name,
        job:'Development',
        'salary':'$5,000,00',
        cars:[
            {brand:'Ford',color:'green',price:'$10,000.00'},
            {brand:'VW',color:'red',price:'$5,000.00'},
            {brand:'hilux',color:'black',
             price:'$25,000.00'}
        ],
        interests:['tecnology','Cars','People'],
        test01:'<strong>Black text</strong>',
        test02:'<strong>Black text</strong>',
        show:true}
    res.render('home',data); 
});
module.exports = router; 