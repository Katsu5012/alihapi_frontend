<template>
  <div class="all">
    <body>
      <div class="containts" v-if="isAuthenticated">
        <!-- 左側 -->
        <div class="sideBar">
          <div class="sideBarOption">
            <router-link :to="{ name: 'home' }" class="link"
              ><v-icon
                name="home"
                scale="1.5"
                class="icon"
              />ホーム</router-link
            >
          </div>

          <div class="sideBarOption">
            <router-link
              :to="{ name: 'search', query: { keywords: null } }"
              class="link"
              ><v-icon
                name="search"
                scale="1.5"
                class="icon"
              />検索</router-link
            >
          </div>
          <div class="sideBarOption">
            <router-link :to="{ name: 'settings' }" class="link"
              ><v-icon name="cog" scale="1.5" class="icon" />設定</router-link
            >
          </div>
          <div class="sideBarOption">
            <router-link
              :to="{ name: 'top' }"
              class="link"
              @click.prevent="logOut"
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
        <hr />

        <!-- 真ん中 -->
        <div class="main">
          <div class="commentsBox">
            <img src="user_image" alt="" />
            <form>
              <div class="comments">
                <input
                  v-model="comment"
                  maxlength="100"
                  minlength="1"
                  spellcheck="true"
                  type="text"
                  placeholder="投稿しましょう"
                />
                <button class="commentbtn" @click.prevent="newComment">投稿する</button>
              </div>
            </form>
          </div>

          <!-- フォローしている人がいる場合タイムラインを表示 -->
          <div>
            <div
              v-for="(timeLine, index) in timeLines"
              :key="index"
              class="timeLine"
            >
              <div class="timeLine_user_image">
                <!-- reloadの処理がかけたら外す -->
                <!-- <img v-bind:src=timeLine.user.user_image alt="user_image" /> -->
              </div>
              <div class="timeLineBody">
                <div class="timeLine_header">
                  <div class="timeLine_header_text">
                    <div class="timeLine_header_text_left">
                      <div>
                        <img
                          class="timeline_image"
                          v-lazy="timeLine.user.user_image"
                        />
                      </div>

                      <h3 class="userItem">
                        {{ timeLine.user.user_name }}&nbsp;&nbsp;<router-link
                          :to="{
                            name: 'user',
                            params: { user_id: timeLine.user.user_id },
                          }"
                          class="userId"
                          >@{{ timeLine.user.user_id }}</router-link
                        >
                      </h3>
                    </div>
                    <div class="timeLine_header_text_center">
                      <p class="postTime">{{ postTimes[index] }}</p>
                    </div>
                    <div class="timeLine_header_text_right">
                      <!-- <v-icon name="trash-alt"></v-icon> -->
                    </div>
                  </div>
                  <div class="timeLine_comment">
                    <p class="commentContaints">{{ timeLine.body }}</p>
                  </div>
                  <hr />
                  <div class="timeLine_footer">
                    <!-- icon押して返信のpop出す -->
                    <div class="timeLine_footer_left">
                      <router-link
                        :to="{
                          name: 'ReturnPost',
                          params: { comment_id: timeLines[index].posts_id },
                        }"
                      >
                        <v-icon name="reply" class="icon_comment"></v-icon>
                      </router-link>
                    </div>

                    <!-- いいね -->
                    <div class="timeLine_footer_center">
                      <v-icon
                        name="heart"
                        class="heart-icon_notfavorite"
                        @click="sendFavorites(index)"
                        v-if="!timeLine.is_likes"
                      ></v-icon>

                      <v-icon
                        name="heart"
                        class="heart-icon_favorite"
                        @click="deleteFavorites(index)"
                        v-else-if="timeLine.is_likes"
                      ></v-icon>
                      <span>
                        {{ timeLine.likes_count }}
                      </span>
                    </div>

                    <!-- 投稿の詳細 icon押して詳細を表示 -->
                    <div class="timeLine_footer_right">
                      <router-link
                        :to="{
                          name: 'CommentDatail',
                          params: { comment_id: timeLine.posts_id },
                        }"
                        class="datail_message"
                      >
                        <v-icon name="comment-alt"></v-icon></router-link
                      ><span>{{ timeLine.reply_count }}</span>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            <div class="infinite">
              <div v-for="(item, $index) in infiniteTimeLines" :key="$index">
                {{ item }}:{{ index }}
              </div>
              <infinite-loading @infinite="infiniteHandler">
                <span slot="no-more">----- 検索結果は以上です-----</span>
                <span slot="no-results">----- 検索結果はありません-----</span>
              </infinite-loading>
            </div>
          </div>
        </div>
        <hr />
        <div class="rightContaints">
          <img
            class="user_background_image"
            :src="background_image"
            v-if="background_image"
          />
          <img :src="user_image" class="user_image" v-if="user_image" />
          <div class="right_containts_header">
            <div class="user_name">
              <h3>{{ user_name }}&nbsp;&nbsp;@{{ user_id }}</h3>
            </div>
          </div>
          <div class="self_introduction">
            <p>{{ self_introduction }}</p>
          </div>
          <div class="user_page">
            <router-link
              :to="{ name: 'user', params: { user_id: user_id } }"
              tag="button"
              class="user_btn"
              >マイページ</router-link
            >
          </div>
        </div>
      </div>
      <div v-else>
        <div class="main-containt">
          <ul class="login">
            <h2>ログインしてください</h2>
            <li>
              <router-link :to="{ name: 'login' }"
                >ログインの方はこちら</router-link
              >
            </li>

            <li>
              <router-link :to="{ name: 'register' }"
                >初回登録の方はこちら</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </body>
  </div>
</template>
<script >
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";
import router from "../router";
export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      id: "",
      user_id: "",
      user_uuid: "",
      user_name: "",
      user_image: null,
      background_image: null,
      self_introduction: "",
      follow_count: "",
      follower_count: "",
      comment: "",
      postTimes: [],
      isAuthenticated: false,
      post: false,
      timeLines: null,
      return_id: null,
      isReturn: false,
      commentId: null,
      isFavorite: false,
      hasTimeLine: false,
      suggestFollows: null,
      isFollowed: false,
      token: null,
      infiniteTimeLines: [],
      url: null,
      canInfinite: true,
    };
  },

  mounted: async function () {
    try {
      console.log(this.$cookies.get("access_token"));
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");

      const response = await axios.get(
        "users/me",
        {
          withCredentials: true,
        },
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
          body: JSON.stringify(),
        }
      );

      if (response.status === 200) {
        this.isAuthenticated = true;
      }

      this.id = response.data.user.id;
      this.user_uuid = response.data.user.user_uuid;
      this.user_name = response.data.user.user_name;
      this.user_id = response.data.user.user_id;
      this.self_introduction = response.data.user.self_introduction;
      this.follow_count = response.data.user.follow_count;
      this.follower_count = response.data.user.follower_count;
      this.user_image = response.data.user.user_image;
      this.background_image = response.data.user.background_image;

      //ユーザー情報をVuexに保存
      this.$store.commit("setId", this.id);
      this.$store.commit("setUserId", this.user_id);
      this.$store.commit("setUserUuid", this.user_uuid);
      this.$store.commit("setUserName", this.user_name);
      this.$store.commit("setSelfIntroduction", this.self_introduction);
      this.$store.commit("setUserImage", this.user_image);
      this.$store.commit("setBackgroundImage", this.background_image);
      this.timeLines = response.data.timeLines;

      //○分前の部分を作成
      const time = [];
      for (let i = 0; i < this.timeLines.length; i++) {
        time.push(this.timeLines[i].created_at);
      }

      for (let i = 0; i < time.length; i++) {
        const now = new Date();
        let diff = now - new Date(time[i]);
        if (diff < 60 * 1000) {
          const b = Math.floor(diff / 1000);
          this.postTimes.push(`${b}秒経過`);
        } else if (diff < 60 * 60 * 1000) {
          const b = Math.floor(diff / (60 * 1000));
          this.postTimes.push(`${b}分経過`);
        } else if (diff < 24 * 60 * 60 * 1000) {
          const b = Math.floor(diff / (60 * 60 * 1000));
          this.postTimes.push(`${b}時間経過`);
        } else {
          const b = Math.floor(diff / (24 * 60 * 60 * 1000));
          this.postTimes.push(`${b}日経過`);
        }
      }
    } catch (e) {
      console.log(e);
      console.log(this.isAuthenticated);
      if (e === "Request failed with status code 403") {
        this.isAuthenticated = false;
      }
    }
  },
  methods: {
    //タイムラインの追加取得
    async infiniteHandler($state) {
      if (this.canInfinite === true) {
        this.getInfiniteTimeLine;
        // $state.loaded();
      } else {
        $state.complete();
      }
    },
    async getInfiniteTimeLine() {
      if (this.infiniteTimeLines.length === 0) {
        this.url =
          "me/timeLines/" + this.timeLines[this.timeLines.length - 1].posts_id;
      } else {
        this.url =
          "me/timeLines/" +
          this.infiniteTimeLines[this.infiniteTimeLines.length - 1].posts_id;
      }
      console.log(this.url);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$cookies.get("access_token");
      const response = await axios.get(this.url, { withCredentials: true });
      if (response.timeLines.length < 50) {
        this.canInfinite === true;
      }
      for (let i = 0; i < response.timeLines.length; i++) {
        this.infiniteTimeLines.push(response.timeLines[i]);
      }
      console.log(response);
    },
    //いいねを押した時
    async sendFavorites(index) {
      try {
        this.timeLines[index].likes_count++;
        this.timeLines[index].is_likes = !this.timeLines[index].is_likes;
        this.timeLines.push();
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        const url = "likes/" + this.timeLines[index].posts_id;
        let response = await axios.post(
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
      } catch (error) {
        this.timeLines[index].likes_count--;
        this.timeLines[index].is_likes = !this.timeLines[index].is_likes;
        this.timeLines.push();
        console.log(error);
      }
    },
    async deleteFavorites(index) {
      try {
        this.timeLines[index].likes_count--;
        this.timeLines[index].is_likes = !this.timeLines[index].is_likes;
        this.timeLines.push();
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        const url = "likes/" + this.timeLines[index].posts_id;
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
        this.timeLines[index].likes_count++;
        this.timeLines[index].is_likes = !this.timeLines[index].is_likes;
        this.timeLines.push();

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
      this.$cookies.remove("access_token");
      this.$cookies.remove("vuex");

      this.$router.push("/");
    },

    //新規投稿
    async newComment() {
      try {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$cookies.get("access_token");
        const response = await axios.post(
          "posts",
          {
            body: this.comment,
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
        if (response.status === 201) {
window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
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
  flex: 25%;
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
  flex: 50%;

  border-right: 1px solid #e6e6e6;
  min-width: fit-content;
  width: 100%;
  overflow-y: scroll;
}
.commentsBox {
  padding-bottom: 10px;
  border-bottom: 8px solid #e6e6e6;
  padding-right: 10px;
}
.commentsBox img {
  border-radius: 50%;
  height: 40px;
}
.commentsBox form {
  display: flex;
  flex-direction: column;
}
.comments {
  display: flex;
  padding: 20px;
}
.comments input {
  flex: 1;
  margin-left: 20px;
  font-size: 20px;
  border: none;
  outline: none;
}
.commentbtn {
  background-color: #50b7f5;
  border: none;
  color: white;
  font-weight: 900;
  border-radius: 20px;
  width: 80px;
  height: 40px;
  margin-top: 20px;
  margin-left: auto;
}
.rightContaints {
  flex: 25%;
  margin-top: 10px;
}
.timeLine_header_text {
  display: flex;
}
.timeLine_header_text_center {
  flex: 1;
  padding-top: 2px;
}
.timeLine_header_text_left {
  flex: 2;
}
.timeLine_header_text_right {
  padding-top: 15px;
  flex: 1;
}
.timeLine_footer {
  display: flex;
}
.icon_comment {
  flex: calc(100 / 3);
  color: pink;
  border-color: #50b7f5;
  margin-right: 5px;
}

.delete_favorite {
  flex: calc(100 / 3);
}
.datail_message {
  flex: calc(100 / 3);
  margin-left: 30px;
  margin-right: 5px;
}
.heart-icon_notfavorite {
  color: pink;
  flex: 1;
}
.heart-icon_favorite {
  color: red;
  flex: 1;
}
.timeLine_footer {
  display: flex;
}
.timeLine_footer_left {
  flex: 1;
  margin-left: 70px;
}
.timeLine_footer_center {
  flex: 1;
}
.timeLine_footer_right {
  flex: 1;
  margin-right: 0px;
}

.favorite_count {
  flex: 1;
}
.right_containts_header {
  display: flex;
}
.user_name {
  margin-left: 40px;
  flex: 1;
}
.user_id {
  flex: 1;
}
.self_introduction {
  text-align: center;
}
.user_page {
  text-align: center;
}
.user_btn {
  text-align: center;
  width: 50%;
  background-color: #50b7f5;
  color: #e6ecf0;
  border: none;
  font-weight: 900;
  border-radius: 30px;
  height: 40px;
  margin-top: 10px;
  cursor: pointer;
}
.datail_message {
  color: pink;
}
.commentContaints {
  font-size: 24px;
}
.user_background_image {
  margin-top: 10px;
  width: 100%;
  height: 50;
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
.timeline_image {
  position: relative;
  border-radius: 50%;
  margin: 3px;
  padding: 3px;
  background-color: white;
  width: 50px;
  height: 50px;
}
</style>