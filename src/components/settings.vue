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
      <h2>設定</h2>

<div class="setting">

          <router-link :to="{ name: 'userInfo' }" class="setting_item"
            >ユーザー情報の編集</router-link
          >

          <router-link :to="{ name: 'changePass' }" class="setting_item"
            >パスワードの設定</router-link
          >

          <router-link :to="{ name: 'deleteUser' }" class="setting_item"
            >アカウントの削除</router-link
          >
</div>

    </div>
    <div class="rightBar">
        <p>右</p>
    </div>
  </div>
</template>
    <script>
    import axios from 'axios'
    export default{
      methods:{
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
    }
</script>
    <style scoped>
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
.setting_item:hover{
   background-color: #e6ecf0;
  border-radius: 30px;
  color: #50b7f5;
  transition: color 100ms ease-out;
}
.setting{
padding: 10px;
  align-items: center;
  cursor: pointer;
  padding: 10px;

}
.setting_item{
  display: flex;
   font-weight: 800;
  font-size: 20px;
  margin-right: 20px;

 width:50%;
 padding:10px;
}

</style>