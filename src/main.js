import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
//To delete

Vue.config.productionTip = false;

let app = null;

//Wait for firebase auth to init befgore creating app
firebase.auth().onAuthStateChanged(() =>{
  //init app if not already created
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})


