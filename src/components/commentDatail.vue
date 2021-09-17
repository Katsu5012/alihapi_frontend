<template>
  <div class="main">
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

    <div class="mainContaints">
      <div class="user_info">
        <img :src="user_image" class="user_image" />
        <h2 class="user_name">{{ user_name }}</h2>
        <p class="user_id">@{{ user_id }}</p>
      </div>
      <p class="body">{{ body }}</p>
      <p class="posttime">{{ postTime }}</p>
      <hr />
      <div class="user_buttom">
            <div class="reply">
        <router-link :to="{name:'ReturnPost', params:{comment_id:id}}">

            <v-icon name="reply" class="reply_icon"></v-icon>
        </router-link>
          </div>

          <div class="heart">
            <v-icon
              name="heart"
              class="heart-icon_notfavorite"
              @click="sendFavorites()"
              v-if="!is_likes"
            ></v-icon>

            <v-icon
              name="heart"
              class="heart-icon_favorite"
              @click="deleteFavorites()"
              v-else-if="is_likes"
            ></v-icon>
            <span>
              {{ likes_count }}
            </span>

        </div>
        <div class="comment">
       
            <v-icon
              name="comment-alt"
              class="comment-icon"
            ></v-icon> <span>{{ reply_count }}</span>
        </div>
      </div>
      <hr />
      <h2>返信内容</h2>
      <hr />
      <div v-for="(reply, index) in replies" :key="index">
        <p>{{ reply.user.user_name }}</p>
        <p>@{{ reply.user.user_id }}</p>
        <p>{{ reply.body }}</p>
        <p>{{ reply.postTime }}</p>
        <hr />
      </div>
    </div>
    <div class="leftBar">
      <p>左側</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
//パラメーターからcomment_idを受け取り、そのコメントを取得する
export default {
  data() {
    return {
      id: null,
      user_name: null,
      comment_id: null,
      user_id: null,
      postTime: null,
      user_image: null,
      body: null,
      replies: null,
      message: null,
      is_likes: null,
      likes_count: 0,
      reply_count:null
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
this.$cookies.remove("vuex")

      this.$router.push("/");
    },
    //いいねを押した時
    async sendFavorites() {
      try {
        this.likes_count++;
        this.is_likes = !this.is_likes;

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        await axios.post(
          "likes/" + this.id,
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
      } catch (error) {
        this.likes_count--;
        this.is_likes = !this.is_likes;

        console.log(error);
      }
    },
    async deleteFavorites() {
      try {
        this.likes_count--;
        this.is_likes = !this.is_likes;

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        const url = "likes/" + this.id;
        const response = await axios.delete(
          url,
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
      } catch (e) {
        this.likes_count++;
        this.is_likes = !this.is_likes;

        console.log(e);
      }
    },
  },
  mounted: async function () {
    this.comment_id = this.$route.params["comment_id"];
    const url = "posts/" + this.comment_id;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });
      this.id = response.data.posts_id;
      this.user_name = response.data.user.user_name;
      this.user_id = response.data.user.user_id;
      this.body = response.data.body;
      this.replies = response.data.replies;
      this.user_image = response.data.user.user_image;
      this.is_likes = response.data.is_likes;
      this.likes_count = response.data.likes_count;
      this.reply_count=response.data.reply_count;
      
      let time = new Date(response.data.created_at);
      this.postTime =
        time.getFullYear() +
        "年" +
        (time.getMonth() + 1) +
        "月" +
        time.getDate() +
        "日" +
        time.getHours() +
        "時" +
        time.getMinutes() +
        "分";
    } catch (e) {
      console.log("3");
      console.log(e);
      router.push("/home");
    }
  },
};
</script>
<style scoped>
.main {
  display: flex;
}
.mainContaints {
  flex: 2;
}
.leftBar {
  flex: 1;
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
.user_info {
  display: flex;
}
.user_image {
  flex: 0.3;
  position: relative;
  border-radius: 50%;
  margin: 3px;
  padding: 3px;
  background-color: white;
  width: 90px;
  height: 90px;
}
.user_name {
  flex: 1;
  margin: 20px;
}
.user_id {
  flex: 1;
  margin: 25px;
}
.body {
  font-size: 30px;
  margin-left: 10px;
}
.posttime {
  text-align: right;
}
.heart-icon_notfavorite {
  color: pink;

}
.heart-icon_favorite {
  color: red;

}
.heart {
  flex: 1;
}
.reply{
  flex:1
}
.reply_icon{
  color:pink
}
.comment {
  flex: 1;
  color:pink
}
.user_buttom{
  display:flex
}
</style>