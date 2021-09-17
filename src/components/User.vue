<template>
  <div class="user_containts">
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

    <div class="user_main_containts">
      <img :src="background_image" class="background_image" />
      <img :src="user_image" class="user_image" />
      <div class="user">
        <div class="userLeft">
          <h2 class="user_name">{{ user_name }}</h2>
          <p class="user_id">@{{ this.$route.params["user_id"] }}</p>
        </div>
        <div class="userRight">
          <div v-if="!isMe">
            <button class="followbtn" @click="follow" v-if="!is_followed">
              フォローする
            </button>
            <button
              class="deletefollowbtn"
              @click="deleteFollow"
              v-if="is_followed"
            >
              フォローを解除する
            </button>
          </div>

          <router-link
            class="editme"
            :to="{ name: 'userInfo' }"
            v-if="isMe"
            tag="button"
            >編集する</router-link
          >
        </div>
      </div>
      <div class="selfIntroduction">
        <p>{{ self_introduction }}</p>
      </div>

      <div class="userButtom">
        <router-link
          class="followCount"
          :to="{ name: 'follows', params: { user_id: user_id } }"
          >フォロー数{{ follow_count }}</router-link
        >
        <router-link
          class="followerCount"
          :to="{ name: 'followers', params: { user_id: user_id } }"
          >フォロワー数{{ follower_count }}</router-link
        >
      </div>

      <hr class="border" />
      <div v-for="(comment, index) in comments" :key="index">
        <div class="commentTop">
          <img v-lazy="user_image" class="timeLineUserImage" />
          <v-icon
            name="trash"
            class="trash"
            @click="deletePost(index)"
            v-if="isMe"
          ></v-icon>
        </div>
        <p>{{ comment.user.user_name }}</p>
        <p>@{{ comment.user.user_id }}</p>
        <p>{{ comment.body }}</p>

        <p>{{ postTimes[index] }}</p>
        <hr />
        <div class="postFooter">
          <div class="reply">
            <router-link
              :to="{
                name: 'ReturnPost',
                params: { comment_id: comment.posts_id },
              }"
            >
              <v-icon name="reply" class="reply_icon"></v-icon>
            </router-link>
          </div>
          <div class="heart">
            <v-icon
              name="heart"
              class="likesHeart"
              v-if="comment.is_likes"
              @click="deleteFavorites(index)"
            ></v-icon>
            <v-icon
              name="heart"
              class="notLikesHeart"
              v-else-if="!comment.is_likes"
              @click="sendFavorites(index)"
            ></v-icon
            ><span>{{ comment.likes_count }}</span>
          </div>
          <div class="comment">
            <router-link
              :to="{
                name: 'CommentDatail',
                params: { comment_id: comment.posts_id },
              }"
            >
              <v-icon
                name="comment-alt"
                class="comment-icon"
              ></v-icon> </router-link
            ><span>{{ comment.reply_count }}</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div class="rightBar">
      <p>aa</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      id: null,
      background_image: null,
      user_image: null,
      user_id: null,
      user_name: null,
      user_uuid: null,
      userComments: null,
      isMe: false,
      url: "http://localhost:3000/posts/",
      comments: null,
      postTimes: [],
      Open: false,
      self_introduction: "",
      follow_count: null,
      follower_count: null,
      followUser: null,
      is_followed: false,
    };
  },
  methods: {
    async deletePost(index) {
      try {
        console.log(this.comments[0]);
        console.log(index);
        const url = "posts/" + this.comments[index].posts_id;
        console.log(url);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        const response = await axios.delete(url, { withCredentials: true });
        if (response.data.message === "success") {
          this.comments.splice(index, 1);
          this.postTimes.splice(index, 1);

          this.comments.push();
          this.postTimes.push();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async sendFavorites(index) {
      try {
        this.comments[index].likes_count++;
        this.comments[index].is_likes = !this.comments[index].is_likes;
        this.comments.push();
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        await axios.post(
          "likes/" + this.comments[index].posts_id,
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
        this.comments[index].likes_count--;
        this.comments[index].is_likes = !this.comments[index].is_likes;
        this.comments.push();
        console.log(error);
      }
    },
    async deleteFavorites(index) {
      try {
        this.comments[index].likes_count--;
        this.comments[index].is_likes = !this.comments[index].is_likes;
        this.comments.push();
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        const url = "likes/" + this.comments[index].posts_id;
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
        this.comments[index].likes_count++;
        this.comments[index].is_likes = !this.comments[index].is_likes;
        this.comments.push();

        console.log(e);
      }
    },

    async follow() {
      try {
        this.is_followed = !this.is_followed;
        this.follower_count++;
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        const Url = "follows/" + this.id;
        this.followUser = await axios.post(
          Url,
          {
            user_uuid: this.$store.state.user_uuid,
            target_uuid: this.user_uuid,
          },
          { withCredentials: true }
        );
      } catch (e) {
        this.is_followed = !this.is_followed;
        this.follower_count--;
        console.log(e.message);
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
    async deleteFollow() {
      try {
        this.is_followed = !this.is_followed;
        this.follower_count--;
        const Url = "follows/" + this.id;
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        await axios.delete(
          Url,
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (e) {
        this.is_folllowed = !this.is_followed;
        this.follower_count++;
        console.log(e);
      }
    },
  },
  mounted: async function () {
    try {
      const url = "users/" + (await this.$route.params["user_id"]);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");
      const user = await axios.get(url, {
        withCredentials: true,
      });

      this.id = user.data.id;
      this.user_id = user.data.user_id;
      this.user_uuid = user.data.user_uuid;
      this.user_name = user.data.user_name;
      this.background_image = user.data.background_image;
      this.user_image = user.data.user_image;
      this.self_introduction = user.data.self_introduction;
      this.follow_count = user.data.follow_count;
      this.follower_count = user.data.follower_count;
      this.comments = user.data.posts.reverse();
      this.is_followed = user.data.is_followed;

      if (this.user_uuid === this.$store.state.user_uuid) {
        this.isMe = true;
      }

      for (let i = 0; i < user.data.posts.length; i++) {
        let time = new Date(user.data.posts[i].created_at);
        const postTime =
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
        this.postTimes.push(postTime);
      }
    } catch (e) {
      console.log(e);
      router.push("home");
    }
  },
};
</script>

<style scoped>
.user_containts {
  display: flex;
}
.sideBar {
  flex: 1;
}
.user_main_containts {
  flex: 2;
}
.rightBar {
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
li {
  list-style-type: none;
  margin: 5px 50px 5px 20px;
  display: inline-block;
  text-align: center;
}
.menu {
  max-width: 300px;
  margin: 0 auto;
  padding: 0;
}

.menu a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #000000;
  line-height: 1;
}
.menu label {
  display: block;
  position: relative;
  margin: 0 0 2px 0;
  padding: 12px;
  line-height: 1;
  color: #ffffff;
  background: #1b2538;
  cursor: pointer;
}
.menu label::before {
  position: absolute;
  content: "▼";
  color: #ffffff;
  right: 0.5em;
  top: 25%;
}
.menu input {
  display: none;
}
.menu ul {
  margin: 0;
  padding: 0;
  background: #f4f4f4;
  list-style: none;
}
.menu li {
  overflow-y: hidden;
  max-height: 0;
  transition: all 0.5s;
}
#menu_bar1:checked ~ #link1 li,
#menu_bar2:checked ~ #link2 li {
  max-height: 46px;
  opacity: 1;
}
.user_image {
  position: relative;
  border-radius: 50%;
  margin: 3px;
  padding: 3px;
  background-color: white;
  width: 90px;
  height: 90px;
  top: -50px;
}
.background_image {
  width: 98%;
  height: 250px;
}
.user {
  position: relative;
  top: -70px;
  display: flex;
}
.userRight {
  flex: 1;
}
.userLeft {
  flex: 2;
}
.user_name {
  margin-bottom: 0;
}
.editme {
  left: px;
  width: 100%;
  background-color: #50b7f5;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 40px;
  margin-top: 10px;
  cursor: pointer;
}
.followbtn {
  width: 100%;
  background-color: #50b7f5;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 40px;
  margin-top: 10px;
  cursor: pointer;
}
.deletefollowbtn {
  width: 100%;
  background-color: red;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 40px;
  margin-top: 10px;
  cursor: pointer;
}
.userButtom {
  display: flex;
  position: relative;
  top: -80px;
}
.userButtom a {
  text-decoration: none;
}
.followCount {
  margin-right: 10px;
}
.followCount {
  margin-left: 10px;
}
followCount a {
  text-decoration: none;
}

.count a {
  text-decoration: none;
}

.selfIntroduction {
  position: relative;
  top: -80px;
}
.border {
  position: relative;
  top: -30px;
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
.timeLineUserImage {
  position: relative;
  border-radius: 50%;
  margin: 3px;
  padding: 3px;
  background-color: white;
  width: 50px;
  height: 50px;
}
.commentTop {
  display: flex;
}

.trash {
  position: relative;
  margin-left: 415px;
  margin-top: 20px;
  color: red;
  cursor: pointer;
}
</style>