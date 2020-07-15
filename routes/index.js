const express = require('express');
const homeController = require('../controllers/homeController'); 
const userController = require('../controllers/userController'); 
const postController = require ('../controllers/postController'); 
const imagesMiddleware = require('../middlewares/imagesMiddleware');
const authMiddleware = require('../middlewares/authMiddleware'); 
//const { route } = require('../app');

const router = express.Router(); 
router.get('/',homeController.index); 
router.get('/users/login',userController.login);
router.post('/users/login',userController.loginAction); 
router.get('/users/register',userController.register); 
router.post('/users/register',userController.registerAction); 
router.get('/users/logout',userController.logout); 
router.get('/post/new',authMiddleware.isLogged,postController.new); 
router.post('/post/new',
    authMiddleware.isLogged,
    imagesMiddleware.upload, 
    imagesMiddleware.resizePhoto, 
    postController.newAction);
router.get('/post/:slug/edit',
    authMiddleware.isLogged, 
    imagesMiddleware.upload, 
    imagesMiddleware.resizePhoto,
    postController.edit);  
router.post('/post/:slug/edit',authMiddleware.isLogged,postController.editAction); 

router.get('/post/:slug',postController.view);
module.exports = router; 
console.log('Last line of index.js'); 