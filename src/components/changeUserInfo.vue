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
      <h2>プロフィールを設定する</h2>

      <label for="user_name">ユーザーネーム</label>
      <input type="text" v-model="user_name" id="user_name" />
      <label for="user_id">ユーザーID</label>
      <input type="text" v-model="user_id" id="user_id" />
      <label for="self_introduction">自己紹介</label>

      <textarea
        type="text"
        v-model="self_introduction"
        id="self_introduction"
      />
      <div class="btn">
        <button class="editbtn" @click="submit">編集</button>
      </div>
    </div>
    <div class="rightBar">
      <h2>アイコン、背景画像を設定する</h2>
      <p>アイコンを設定している場合先にアイコンの削除を実施してください</p>
      <input
        @change="fileSelect"
        type="file"
        name="file"
        class="files"
        tag="button"
        accept="image/*"
      />
      <button @click="upload" class="userImagebtn" type="submit">
        アイコンとして送信
      </button>
      <button
        @click="uploadBackground"
        class="backgroundImagebtn"
        type="submit"
      >
        背景画像として送信
      </button>
      <h2>アイコン、背景画像を削除する</h2>

      <button class="deleteImage" @click="deleteUserImage">
        アイコンを削除する
      </button>
      <button class="deleteImage" @click="deleteBackgroundImage">
        背景画像を削除する
      </button>
      <p></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      user_uuid: this.$store.state.user_uuid,
      user_name: this.$store.state.user_name,
      user_id: this.$store.state.user_id,
      self_introduction: this.$store.state.self_introduction,
      user_image: this.$store.state.user_image,
      background_image: this.$store.state.background_image,
      selected_file: null,
    };
  },
  methods: {
    async deleteUserImage() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");

      const response = await axios.delete("users/me/user_image");
      console.log(response);
    },
    async deleteBackgroundImage() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");

      const response = await axios.delete("users/me/background_image");
      console.log(response);
    },
    //ファイル選択時の処理
    fileSelect: function (e) {
      //選択したファイルの情報を取得しプロパティにいれる
      this.selected_file = e.target.files[0];
    },
    //送信処理
    upload: async function () {
      //formDataをnewする
      let formData = new FormData();
      //appendでデータを追加(第一引数は任意のキー)
      //他に送信したいデータがある場合にはその分appendする
      formData.append("file", this.selected_file);
      console.log(this.selected_file);
      console.log(formData.get("file"));

      let config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");

      await axios
        .post(
          "users/me/user_image",
          formData,
          { withCredentials: true },
          config
        )
        .then(function (response) {
          this.selected_file = null;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    uploadBackground: async function () {
      //formDataをnewする
      let formData = new FormData();
      //appendでデータを追加(第一引数は任意のキー)
      //他に送信したいデータがある場合にはその分appendする
      formData.append("file", this.selected_file);
      console.log(this.selected_file);
      console.log(formData.get("file"));

      let config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");

      await axios
        .post(
          "users/me/background_image",
          formData,
          { withCredentials: true },
          config
        )
        .then(function (response) {
          this.selected_file = null;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
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

      this.$cookies.remove("access_token");
      this.$cookies.remove("vuex");
      this.$router.push("/");
    },
    async submit() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");
      const response = await axios.put(
        "users/me",
        {
          user_id: this.user_id,
          user_name: this.user_name,
          self_introduction: this.self_introduction,
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
      if (response.message === "success") {
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
.rightBar h2 {
  top: 20px;
}
.rightBar {
  flex: 1.5;
  margin-left: 20px;
}
.main {
  flex: 2;
}
.deleteImage {
  width: 80%;
  background-color: red;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 50px;
  margin-top: 20px;
  cursor: pointer;
}

.userImagebtn {
  width: 80%;
  background-color: #50b7f5;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 50px;
  margin-top: 30px;
  cursor: pointer;
}
.backgroundImagebtn {
  width: 80%;
  background-color: #50b7f5;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 50px;
  margin-top: 30px;
  cursor: pointer;
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
  width: 100%;
  padding: 15px 0px 15px 3px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}
textarea[type="text"] {
  width: 100%;
  padding: 15px 0px 15px 3px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  resize: none;
}

textarea[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}
.btn {
  text-align: center;
}
.editbtn {
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
</style>