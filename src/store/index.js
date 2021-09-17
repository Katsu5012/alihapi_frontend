import Vue from "vue";
import Vuex from "vuex";

import InfiniteLoading from 'vue-infinite-loading';
import createPersistedState from 'vuex-persistedstate'
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

Vue.use(InfiniteLoading);

export default new Vuex.Store({
state:{
    id:null,
    user_id:null,
    user_uuid:null,
    user_name:null,
    self_introduction:null,
    user_image:null,
    background_image:null,
    token:null
    // token:this.cookies.get("access_token")
},
mutations:{
    setId(state,id){
        state.id=id
    },
    setUserId(state,userId){
state.user_id=userId
    },
    setUserUuid(state,uuid){
        state.user_uuid=uuid
    },
    setUserName(state,userName){
        state.user_name=userName
    },
    setSelfIntroduction(state,selfIntroduction){
        state.self_introduction=selfIntroduction
    },
    setUserImage(state,userImage){
        state.user_image=userImage
    },
    setBackgroundImage(state,backgroundImage){
        state.background_image=backgroundImage
    },
    setToken(state,token){
        state.token=token
    }
 
    },
    actions:{
        async logOut(){
            axios.defaults.headers.common["Authorization"] =
            "Bearer " + this.$cookies.get("access_token");
            const response=await axios.post('http://localhost:3000/logout',
            {withCredentials:true},
            {
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(),
              }
            )
            if(response.message==="success"){
                router.push('/Home')
            }
    }
},
plugins:[createPersistedState({strage:window.localStorage})]
 
});
