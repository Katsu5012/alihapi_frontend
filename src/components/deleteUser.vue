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
            @click="logOut"
          />ログアウト</router-link
        >
      </div>
      <div class="sideBarOption">
        <button class="sideComment">投稿できません</button>
      </div>


    </div>
    <div class="main">
      <a href="http://localhost:8080/i/settings">
      <v-icon name="undo" ></v-icon><span>設定へ戻る</span>
      </a>
      <h2>アカウントの削除</h2>
      <p>アカウントを削除しても本当によろしいですか？？</p>
      <h1 class="errorMessage">{{ errorMessage }}</h1>
      <button @click="onAlert" class="deletebtn">アカウントを削除する</button>
    </div>
    <div class="rightBar"></div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    onAlert: async function () {
      try {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        const response = await axios.delete("users/me", {
          withCredentials: true,
        });
        if (response.data.message === "delete user") {
          router.push("/Home");
        }
      } catch (e) {
        console.log(e);
        this.errorMessage =
          "アカウントの削除が実行できませんでした。再度お試しください";
      }
    },
    async deleteUser() {
      const response = await axios.delete("users/me");
      console.log(response);
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
</style>
<style>
.containts{
  display:flex
}

.rightBar{
  flex: 1;
}
.main {
  flex: 2;
}

.sideBar {
  flex: 1;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
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
.errorMessage {
  color:red;
}
.deletebtn{
   width:80%;
     background-color:red;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
}
</style>
