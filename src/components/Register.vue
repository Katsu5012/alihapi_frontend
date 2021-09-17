<template>
  <div class="register">
    <h1>新規登録画面</h1>
    <hr />

    <button class="userIdbtn" type="text">名前</button>

    <input
      type="text"
      v-model="user_name"
      placeholder="1文字以上20文字以下で入力してください"
    />

    <hr />

    <button class="registerbtn" @click="register">新規登録</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      user_name: "",
    };
  },
  methods: {
    async register() {
      try {

        const response = await axios.post(
          "users",
          {
            user_name: this.user_name,
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

        this.$store.commit("setId", response.data.user.id);
        this.$store.commit("setUserId", response.data.user.user_id);
        this.$store.commit("setUserName", response.data.user.user_name);
        this.$store.commit("setUserUuid", response.data.user.user_uuid);
        this.$store.commit("setSelfIntroduction", response.data.user.self_introduction);
this.$cookies.set("access_token",response.data.access_token)
        this.$router.push("/Home");
      } catch (e) {
        console.log(e);
        this.user_name = "";
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}


.container {
  padding: 16px;
}

.userIdbtn {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}


input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
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


hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}


.registerbtn {
  background-color: #50b7f5;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
.registerbtn:active {
  color: white;
  background-color: #10547e;
}

.registerbtn:hover {
  opacity: 1;
}


</style>

