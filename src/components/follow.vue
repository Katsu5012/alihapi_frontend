<template>
<div class="body">
<div class="sideBar">
          <div class="sideBarOption">
            <router-link :to="{ name: 'home' }" class="link"
              ><v-icon
                name="home"
                scale="1.5"
                class="icon"
              />ホーム</router-link
            >
          </div>

          <div class="sideBarOption">
            <router-link :to="{ name: 'search' }" class="link"
              ><v-icon
                name="search"
                scale="1.5"
                class="icon"
              />検索</router-link
            >
          </div>
          <div class="sideBarOption">
            <router-link :to="{ name: 'settings' }" class="link"
              ><v-icon name="cog" scale="1.5" class="icon" />設定</router-link
            >
          </div>
          <div class="sideBarOption">
            <p>フォロー一覧</p>
            <hr>
            <router-link
              :to="{ name: 'top' }"
              class="link"
              @click.prevent="logOut"
              ><v-icon
                name="sign-out-alt"
                scale="1.5"
                class="icon"
@click="logOut"
              />ログアウト</router-link
            >
          </div>
          <div class="sideBarOption">
            <button class="sideComment">投稿できません</button>
          </div>


        </div>
  <div class="main">

    <hr>
    <div v-for="(follow, index) in follows" :key="index">
    <img :src=follow.followed_user.user_image class="user_image" />
      <p>{{follow.followed_user.user_name}}</p>
      <router-link :to="{ name: 'user', params: { user_id: follow.followed_user.user_id } }"
      >@{{follow.followed_user.user_id}}
      <p>{{follow.self_introduction}}</p>
      </router-link>
      <p>{{follow.followed_user.self_introduction}}</p>

      <hr />
    </div>
  </div>
  <div class="rightBar">

  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      follows: null,
    };
  },
  mounted: async function () {
    const Url =
      "follows/" +
      this.$route.params["user_id"] +
      "/follows";

    const getFollows = await axios.get(Url, { withCredentials: true },);
    this.follows = getFollows.data

   

   
  },
  methods:{
    async logOut() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");
      await axios.post(
        "logout",
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

this.$cookies.remove("access_token")
localstrage.removeItem('vuex')
      this.$router.push("/");
    },
  }
};
</script>
<style scoped>
.body {
  display:flex
}
.sideBar {
  flex: 1;
  min-width: 250px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.user_image{
   flex: 0.3;
  position: relative;
  border-radius: 50%;

  margin: 3px;
  padding: 3px;
  background-color: white;
  width: 50px;
  height: 50px;
}
</style>