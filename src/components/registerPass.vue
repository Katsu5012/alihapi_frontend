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
      <a href="http://localhost:8080/i/settings">
        <v-icon name="undo"></v-icon><span>設定へ戻る</span>
      </a>
      <h2>初めてパスワードを登録する方</h2>
      <label for="password">パスワード</label>
      <input
        type="password"
        v-model="password"
        placeholder="8文字以上16文字以下で入力してください"
      />
      <label for="password">確認用パスワード</label>
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="先程入力したパスワードを入力してください"
      />
      <div class="btn">
        <p class="errMessage">{{ errMessage }}</p>

        <button @click="newPassword" class="passwordbtn">
          パスワードを登録する
        </button>
      </div>
      <div class="change">

      <router-link :to="{ name: 'changePass' }"
        >すでにパスワードを登録している方はこちらへ</router-link
      >
      </div>
    </div>
    <div class="rightBar">
      <p>右</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router.js";
export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      errMessage: "",
    };
  },
  methods: {
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
    async newPassword() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");

      const regexp = /^([a-zA-Z0-9]{8,16})$/;
      let isCorrectPass = regexp.test(this.password);

      let isCorrectConfirmedPass = regexp.test(this.confirmPassword);
      if (!isCorrectPass) {
        return (this.errMessage =
          "英数字8文字以上16文字以下で入力されていません");
      } else if (!isCorrectConfirmedPass) {
        return (this.errMessage =
          "英数字8文字以上16文字以下で入力されていません");
      } else if (this.password != this.confirmPassword) {
        return (this.errMessage = "パスワードと確認用パスワードが一致しません");
      } else {
        try {
          const response = await axios.put(
            "users/me/new_password",
            {
              password: this.password,
              confirmPassword: this.confirmPassword,
            },
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
          console.log(response);
          if (response.data.message === "success") {
            router.push("/Home");
          }
        } catch (e) {
          console.log(e.message);
          if (e.message === "Request failed with status code 400") {
            this.errMessage = "パスワードは登録済みです";
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.containts {
  display: flex;
}

.rightBar {
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
.btn {
  text-align: center;
}
.passwordbtn {
  width: 80%;
  background-color: #50b7f5;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px 0 15px 0;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}
.errMessage {
  color: red;
  font-size: 24px;
}
.change{
  text-align: center;
}
.change a{
  text-decoration :none;
}
</style>