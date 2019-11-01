import router from './router/index'

router.beforeEach((to, from, next) => {
   let user = sessionStorage.getItem('USER');
   if(!user){
     if(to.name === 'login'){
       next()
     }else{
       next({path:'/login'})
     }
   }else{
     if(to.name === 'login'){
       next({path:'/'})
     }else{
       next()
     }
   }
})
