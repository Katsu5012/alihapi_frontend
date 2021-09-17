<template>
  <div>
    <h1>ログイン画面</h1>
    <hr />
    <p v-if="isError">{{ message }}</p>
    <label for="user_id"> ユーザーID </label>
    <input
      type="text"
      v-model="user_id"
      autocomplete="on"
      placeholder="ユーザーID"
    />

    <label for="password"> パスワード </label>
    <input type="password" v-model="password" placeholder="パスワード" />

    <hr />
    <button class="loginbtn" @click="logIn">ログイン</button>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      user_id: "",
      password: "",
      message: "",
      isError: false,
    };
  },

  methods: {
    async logIn() {
      const response = await axios.post(
        "login",
        {
          user_id: this.user_id,
          password: this.password,
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

      if (response.status === 404) {
        this.message = "登録されていないユーザーです";
        this.isError = true;
      }
      if (response.status === 400) {
        this.message = "パスワードに誤りがあります";
        this.isError = true;
      } else {
              this.$store.commit("setId", response.data.user.id);
        this.$store.commit("setUserId", response.data.user.user_id);
        this.$store.commit("setUserName", response.data.user.user_name);
        this.$store.commit("setUserUuid", response.data.user.user_uuid);
        this.$store.commit("setSelfIntroduction", response.data.user.self_introduction);
this.$cookies.set("access_token",response.data.access_token)
        router.push("/Home");
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Full-width input fields */
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

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.loginbtn {
  background-color: #50b7f5;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.loginbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: white;
}

/* Set a grey background color and center the text of the "sign in" section */
</style>

