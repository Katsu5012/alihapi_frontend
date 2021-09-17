import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import VueLocalStorage from "vue-localstorage";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css";
import InfiniteLoading from "vue-infinite-loading";
import VueCookies from "vue-cookies";
import VueLazyload from "vue-lazyload";
axios.defaults.baseURL='https://alihapi.herokuapp.com/'
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error;
  }
);
axios.interceptors.response;
Vue.component("v-icon", Icon);
Vue.use(VuejsDialog);
Vue.use(VueLocalStorage);
Vue.use(VueCookies);
Vue.use(InfiniteLoading);
Vue.use(VueLazyload, {});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
