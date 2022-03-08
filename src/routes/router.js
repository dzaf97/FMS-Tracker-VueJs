import VueRouter from 'vue-router';
import routes from './routes';

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["login", "set-password", "forgot-password"];
  const authRequired = !publicPages.includes(to.path.split('/')[1]);
  // const loggedIn = $cookies.get("token");
  const loggedIn = sessionStorage.getItem('token');
  // console.log(`authRequired: ${authRequired}`)
  // console.log(`loggedIn: ${loggedIn}`)
  // console.log(authRequired && !loggedIn)

  if (authRequired && !loggedIn) {
    console.log("NOT AUTH");
    return next("/login");
  }

  next();
});


export default router;
