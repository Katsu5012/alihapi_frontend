<template>
  <div class="containts">
    <div class="sideBar">
      <div class="sideBarOption">
        <router-link :to="{ name: 'home' }" class="link"
          ><v-icon name="home" scale="1.5" class="icon" />ホーム</router-link
        >
      </div>

      <div class="sideBarOption">
        <router-link :to="{ name: 'search' }" class="link"
          ><v-icon name="search" scale="1.5" class="icon" />検索</router-link
        >
      </div>
      <div class="sideBarOption">
        <router-link :to="{ name: 'settings' }" class="link"
          ><v-icon name="cog" scale="1.5" class="icon" />設定</router-link
        >
      </div>
      <div class="sideBarOption">
        <router-link :to="{ name: 'top' }" class="link" @click.prevent="logOut"
          ><v-icon
            name="sign-out-alt"
            scale="1.5"
            class="icon"
          />ログアウト</router-link
        >
      </div>
      <div class="sideBarOption">
        <button class="sideComment">投稿できません</button>
      </div>

    
    </div>
    <div class="main">
      <p>ユーザーを探す</p>

      <input type="text" v-model="search_word" placeholder="キーワードを入力" />
      <button @click="searchComment()" class="searchbtn">検索</button>
      <div class="searchResult" v-for="(user, index) in users" :key="index">
        <img :src=user.user_img alt="" />
        <router-link :to="{ name: 'user', params: { user_id: user.user_id } }">
          <h2>
            {{ user.user_name }}
            <span> @{{ user.user_id }} </span>
          </h2>
        </router-link>
        <p>{{ user.self_introduction }}</p>
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
      search_word: "",
      users: null,
    };
  },
  methods: {
    async searchComment() {
      try {
        const url = "/i/search?keywords=" + this.search_word;
        const response = await axios.get(
          "users/i/search?keywords=" + this.search_word,
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          }
        );
        this.users = response.data;

        this.$router.push(url);
      } catch (e) {
        console.log(e);
      }
    },
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
  },
};
</script>
<style scoped>
body {
  max-width: 1300px;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
}
.containts {
  display: flex;
}
.sideBar {
  flex: 1;
  min-width: 250px;
  margin-top: 20px;
  padding-left: 20px;
}
.sideBarOption {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
}
.link:hover {
  font-weight: 800;
  font-size: 20px;
  margin-right: 20px;
  color: #50b7f5;
  background-color: #e6ecf0;
}
.sideBarOption:hover {
  background-color: #e6ecf0;
  border-radius: 30px;
  color: #50b7f5;
  transition: color 100ms ease-out;
}
.sideBarOption:active {
  color: #e6ecf0;
  background: color #50b7f5;
}
.sideBarOption a {
  text-decoration: none;
}
.icon {
  padding-right: 20px;
}
.sideComment {
  width: 100%;
  background-color: #50b7f5;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 50px;
  margin-top: 10px;
}
input[type="text"] {
  width: 80%;
  padding: 15px 0 15px 0;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}
.searchbtn {
  width: 20%;
  background-color: #50b7f5;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 40px;
  margin-top: 10px;
  cursor: pointer;
}
.searchResult a{
text-decoration: none;
}
</style>