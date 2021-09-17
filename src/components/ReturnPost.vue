<template>
  <div class="body">
    <div class="sideBar">
      <div class="sideBarOption">
        <router-link :to="{ name: 'home' }" class="link"
          ><v-icon name="home" scale="1.5" class="icon" />ホーム</router-link
        >
      </div>

      <div class="sideBarOption">
        <router-link
          :to="{ name: 'search', query: { keywords: null } }"
          class="link"
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
    <hr />
    <div class="main">
      <div>
        <p>返信ページ</p>
        <div>
          <img :src="user_image" class="user_image" />
          <p>
            {{ user_name }}&nbsp;&nbsp;<span>@{{ user_id }}</span>
          </p>
        </div>
        <p class="postBody">{{ body }}</p>
        <div class="postFooter">
          <div class="reply">
            <v-icon name="reply" class="reply_icon"></v-icon>
          </div>
          <div class="heart">
            <v-icon
              name="heart"
              class="likesHeart"
              v-if="is_likes"
              @click="deleteFavorites"
            ></v-icon>
            <v-icon
              name="heart"
              class="notLikesHeart"
              v-else-if="!is_likes"
              @click="sendFavorites"
            ></v-icon
            ><span>{{ likes_count }}</span>
          </div>
          <div class="comment">
            <router-link
              :to="{
                name: 'CommentDatail',
                params: { comment_id: comments_id },
              }"
            >
              <v-icon name="comment-alt" class="comment-icon"></v-icon
              >
            </router-link><span>{{ reply_count }}</span>
          </div>
          <hr />
        </div>
      </div>
      <div>
        <form action="">
          <textarea
            type="text"
            v-model="comment"
            max-length="100"
            minlength="1"
            placeholder="返信"
          />
          <div class="submit">

          <button @click.prevent="submit" class="submitbtn">返信する</button>
          </div>
        </form>
      </div>
    </div>
    <div class="leftBar"><p></p></div>
  </div>
</template>>
<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      comments_id: null,
      url: null,
      id: null,
      user_name: null,
      user_id: null,
      likes_count: null,
      background_image: null,
      user_image: null,
      reply_count: null,
      replies: null,
      body: null,
      comment: null,
      is_likes: null,
    };
  },
  methods: {
    async submit() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");
      const response = await axios.post(
        this.url,
        { body: this.comment },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      console.log(response);
      router.push("/Home");
    },
    async sendFavorites() {
      try {
        this.likes_count++;
        this.is_likes = !this.is_likes;

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        await axios.post(
          "likes/" + this.$route.params["comment_id"],
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
        const url =
          "likes/" + this.$route.params["comment_id"];
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
  },
  mounted: async function () {
    this.url =
      "posts/" + this.$route.params["comment_id"];

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$cookies.get("access_token");
    const response = await axios.get(this.url, { withCredentials: true });


    this.comments_id = response.data.posts_id;
    this.id = response.data.user.id;
    this.user_name = response.data.user.user_name;
    this.user_id = response.data.user.user_id;
    this.user_image = response.data.user.user_image;
    this.likes_count = response.data.likes_count;
    this.body = response.data.body;
    this.reply_count = response.data.reply_count;
    this.is_likes = response.data.is_likes;
  },
};
</script> 
<style scoped>
.body {
  max-width: 1300px;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
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
.main {
  flex: 2;

}
.leftBar {
  flex: 1;
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
.postFooter {
  display: flex;
}
.reply {
  flex: 1;
  margin-left: 10px;
}
.heart {
  flex: 1;
}
.comment {
  flex: 1;
}
.reply_icon {
  color: pink;
}
.likesHeart {
  color: red;
}
.notLikesHeart {
  color: pink;
}
.comment-icon {
  color: pink;
}
.submitbtn {
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
.submit{
  text-align: right;
  margin-right:20px
}
.user_image{
   flex: 0.3;
  position: relative;
  border-radius: 50%;
  margin: 3px;
  padding: 3px;
  background-color: white;
  width: 90px;
  height: 90px;
}
</style>