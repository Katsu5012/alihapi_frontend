import Vue from "vue";
import Router from "vue-router";
import Top from "./components/Top.vue";
import logIn from "./components/logIn.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import User from "./components/User.vue";

import CommentDatail from "./components/commentDatail.vue";
import Follows from "./components/follow";
import Followers from "./components/followers.vue";
import Search from "./components/Search.vue";
import UserInfo from "./components/changeUserInfo.vue";
import ChangePass from "./components/changePass.vue";
import RegisterPass from './components/registerPass.vue'
import Settings from "./components/settings.vue"
import DeleteUser from "./components/deleteUser.vue"
import ReturnPost from './components/ReturnPost.vue'
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: Top, name: "top" },
    {
      path: "/login",
      component: logIn,
      name: "login",
    },
    {
      path: "/register",
      component: Register,
      name: "register",
    },
    {
      path: "/Home",
      component: Home,
      name: "home",
    },
    {
      path: "/:user_id",
      component: User,
      name: "user",
    },
  
    {
      path: "/:comment_id/datail",
      component: CommentDatail,
      name: "CommentDatail",
    },
    {
      path: "/:user_id/follows",
      component: Follows,
      name: "follows",
    },
    {
      path: "/:user_id/followers",
      component: Followers,
      name: "followers",
    },
    {path:"/:comment_id/return",component:ReturnPost ,name:"ReturnPost"},
    { path: "/i/search", component: Search, name: "search" },
    {path:"/i/settings/userInfo",component:UserInfo, name:"userInfo"},
    { path:"/i/settings/change_password",component:ChangePass,name:"changePass"},
    {path:"/i/settings/register_Pass",component:RegisterPass,name:"registerPass"},
    {path:"/i/settings",component:Settings,name:"settings"},
    {path:"/i/settings/delete_user",component:DeleteUser,name:"deleteUser"}
  ],
});
