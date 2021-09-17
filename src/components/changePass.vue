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
        <v-icon name="undo"></v-icon><span>設定へ戻る</span>
      </a>
      <h2>パスワードを変更する</h2>
      <p>{{ errMessage }}</p>
      <label for="password">登録しているパスワード</label>
      <input
        type="password"
        v-model="nowPassword"
        placeholder="登録しているパスワードを入力してください"
      />
      <label for="password">新規パスワード</label>
      <input
        type="password"
        v-model="newPassword"
        placeholder="新しく設定するパスワードを英数字で8文字以上16文字以下で入力してください"
      />
      <label for="password">確認用パスワード</label>
      <input
        type="password"
        v-model="comfirmedPassword"
        placeholder="新しく入力したパスワードをもう一度入力してください"
      />
      <div class="btn">
        <button @click="submit" class="passwordbtn">
          パスワードを変更する
        </button>
      </div>
      <div class="registerpass">
        <router-link :to="{ name: 'registerPass' }"
          >パスワードを未登録の方はこちら!</router-link
        >
      </div>
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
      nowPassword: "",
      newPassword: "",
      comfirmedPassword: "",
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
      this.$cookies.remove("access_token");
      localStorage.removeItem("vuex");

      this.$router.push("/");
    },
    async submit() {
      const regexp = /^([a-zA-Z0-9]{8,16})$/;
      let isCorrectPass = regexp.test(this.password);
      if (!isCorrectPass) {
        return (this.errMessage =
          "現在のパスワードが英数字8文字以上16文字以下で入力されていません");
      }
      let isCorrectNewPass = regexp.test(this.newPassword);
      if (!isCorrectNewPass) {
        return (this.errMessage =
          "新規パスワードが英数字8文字以上16文字以下で入力されていません");
      }

      if (this.newPassword !== this.comfirmedPassword) {
        return (this.errMessage =
          "新規パスワードと確認用パスワードが一致しません");
      }

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");
      const response = await axios.put(
        "users/me/change_password",
        {
          nowPassword: this.nowPassword,
          newPassword: this.newPassword,
          comfirmedPassword: this.comfirmedPassword,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        router.push("/Home");
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
  min-width: 250px;
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
  cursor: pointer;
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
.registerpass {
  text-align: center;
}
.registerpass a {
  text-decoration: none;
}
</style>