import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import People from "../views/People.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: People
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
