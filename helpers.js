exports.standardTitle = "Titulo padrao da pagina"; 
exports.menu = [
    {name:'home',slug:'/',guest:true,logged:true},
    {name:'login',slug:'/users/login',guest:true,logged:false},
    {name:'New Post',slug:'/post/new',guest:false,logged:true}, 
    {name:'Register',slug:'/users/register',guest:true,logged:true},
    {name:'Logout',slug:'/users/logout',guest:false,logged:true}
];