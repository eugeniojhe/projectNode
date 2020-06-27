const express = require('express');
const homeController = require('../controllers/homeController'); 
const userController = require('../controllers/userController'); 
const postController = require ('../controllers/postController'); 
const imagesMiddleware = require('../middlewares/imagesMiddleware');
const { route } = require('../app');

const router = express.Router(); 
router.get('/',homeController.index); 
router.get('/users/login',userController.login);
router.get('/post/new',postController.new); 
router.post('/post/new',
    imagesMiddleware.upload, 
    imagesMiddleware.resizePhoto, 
    postController.newAction);
router.get('/post/:slug/edit',postController.edit);  
router.post('/post/:slug/edit',postController.editAction); 

router.get('/post/:slug',postController.view);
module.exports = router; 