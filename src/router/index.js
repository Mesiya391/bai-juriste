import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home/Home";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import Cases from "../components/content/Cases";
import Add from "../components/content/Add";
import Tools from "../components/content/Tools";
import AddCase from "../components/forms/AddCase";
import AddPleading from "../components/forms/AddPleading";
import AddNote from "../components/forms/AddNote";
import AddTerm from "../components/forms/AddTerm";
import firebase from "firebase";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cases',
    name: 'Cases',
    component: Cases,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-case',
    name: 'AddCase',
    component: AddCase,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-pleading',
    name: 'AddPleading',
    component: AddPleading,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-note',
    name: 'AddNote',
    component: AddNote,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-term',
    name: 'AddTerm',
    component: AddTerm,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check auth state
    let user = firebase.auth().currentUser
    if(user){
      //user signed in proceed to route
      next()
    } else{
      //not signed in redirect to login
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router;
